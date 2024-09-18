import * as React from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import { Camera, Point, runAsync, useCameraDevice, useCameraFormat, useFrameProcessor, type Orientation } from 'react-native-vision-camera';
import { zxing, type Result } from 'vision-camera-zxing';
import { useSharedValue, Worklets } from 'react-native-worklets-core';
import { Polygon, Rect, Svg, Text as SVGText } from 'react-native-svg';
import { decode, TextResult } from 'vision-camera-dynamsoft-barcode-reader';
import * as DBR from 'vision-camera-dynamsoft-barcode-reader';
import { useBarcodeScanner } from "react-native-vision-camera-barcodes-scanner";
import { Barcode } from 'react-native-vision-camera-barcodes-scanner/lib/typescript/src/types';
import * as Templates from "../Templates";

interface props {
  engine: string;
  DBRTemplate: "Speed Mode"|"Read Rate Mode";
  onScanned?: (result:Result[]) => void;
}

const BarcodeScanner: React.FC<props> = (props: props) => {
  const regionEnabledShared = useSharedValue(false);
  const [regionEnabled, setRegionEnabled] = React.useState(false);
  const [torchEnabled, setTorchEnabled] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [viewBox, setViewBox] = React.useState("0 0 720 1280");
  const [barcodeResults, setBarcodeResults] = React.useState([] as Result[]);
  const engine = useSharedValue("ZXing");
  const device = useCameraDevice("back");
  const {scanBarcodes} = useBarcodeScanner();
  const cameraFormat = useCameraFormat(device, [
    { videoResolution: { width: 1280, height: 720 } },
    { fps: 60 }
  ])
  const rotatePoints = (result:Result,_frameWidth:number,frameHeight:number,orientation:Orientation) => {
    for (let index = 0; index < result.points.length; index++) {
      const point = result.points[index];
      if (point) {
        if (orientation === "landscape-right") {
          let x = point.x;
          point.x = frameHeight - point.y;
          point.y = x;
        }
      }
    }
  };

  const convertAndSetResults = (results:Record<string,object>,frameWidth:number,frameHeight:number,orientation:Orientation) => {
    const keys = Object.keys(results);
    const rotated = HasRotation(frameWidth,frameHeight);
    if (rotated) {
      setViewBox("0 0 "+frameHeight+" "+frameWidth);
    }else{
      setViewBox("0 0 "+frameWidth+" "+frameHeight);
    }
    const converted:Result[] = [];
    if (engine.value === "ZXing") {
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (key) {
          const result = results[key] as Result;
          if (rotated) {
            rotatePoints(result,frameWidth,frameHeight,orientation);
          }
          converted.push(result);
        }
      }
    }else if (engine.value === "MLKit") {
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (key) {
          const barcode = results[key] as Barcode;
          const points:Point[] = [];
          points.push({x:barcode.left,y:barcode.top});
          points.push({x:barcode.right,y:barcode.top});
          points.push({x:barcode.right,y:barcode.bottom});
          points.push({x:barcode.left,y:barcode.bottom});
          const result:Result = {
            barcodeText:barcode.rawValue,
            barcodeFormat:"",
            barcodeBytesBase64:"",
            points:points
          }
          converted.push(result);
        }
      }
    }else if (engine.value === "Dynamsoft") {
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (key) {
          const tr = results[key] as TextResult;
          const points:Point[] = [];
          points.push({x:tr.x1,y:tr.y1});
          points.push({x:tr.x2,y:tr.y2});
          points.push({x:tr.x3,y:tr.y3});
          points.push({x:tr.x4,y:tr.y4});
          const result:Result = {
            barcodeText:tr.barcodeText,
            barcodeFormat:tr.barcodeFormat,
            barcodeBytesBase64:tr.barcodeBytesBase64,
            points:points
          }
          converted.push(result);
        }
      }
    }
    
    setBarcodeResults(converted);
  }
  const convertAndSetResultsJS = Worklets.createRunOnJS(convertAndSetResults);
  
  React.useEffect(() => {
    engine.value = props.engine;
  },[props.engine])

  React.useEffect(() => {
    if (props.onScanned && barcodeResults.length>0) {
      props.onScanned(barcodeResults);
    }
  },[barcodeResults])

  const HasRotation = (frameWidth:number,frameHeight:number) => {
    let rotated = false;
    if (frameWidth>frameHeight){
      if (Dimensions.get('window').width<Dimensions.get('window').height) {
        console.log("Has rotation");
        rotated = true
      }
    }else if (frameWidth<frameHeight) {
      if (Dimensions.get('window').width>Dimensions.get('window').height) {
        console.log("Has rotation");
        rotated = true
      }
    }
    return rotated;
  }

  const frameProcessor = useFrameProcessor(frame => {
    'worklet'
    runAsync(frame, () => {
      'worklet'
      let results;
      if (engine.value === "ZXing") {
        results = zxing(frame,{multiple:true});
      }else if (engine.value === "Dynamsoft") {
        results = decode(frame,{rotateImage:false});
      }else{
        results = scanBarcodes(frame);
      }
      
      console.log(results);
      if (results) {
        convertAndSetResultsJS(results as Record<string,object>,frame.width,frame.height,frame.orientation);
      }
      
    })
  }, [])

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      setIsActive(true);
    })();
    return () => {
      //reset template
      if (props.DBRTemplate === "Speed Mode") {
        DBR.initRuntimeSettingsFromString(Templates.speed);
      }else{
        DBR.initRuntimeSettingsFromString(Templates.readRate);
      }
    }
  }, []);

  const getPointsData = (lr:Result) => {
    let points = lr.points;
    let pointsData = "";
    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      pointsData = pointsData + point?.x + "," + point?.y + " ";
    }
    return pointsData.trim();
  }

  const toggleScanRegion = async (newValue:boolean) => {
    if (newValue) {
      if (props.DBRTemplate === "Speed Mode") {
        await DBR.initRuntimeSettingsFromString(Templates.templateWithScanRegion(Templates.speed));
      }else{
        await DBR.initRuntimeSettingsFromString(Templates.templateWithScanRegion(Templates.readRate));
      }
    }else{
      if (props.DBRTemplate === "Speed Mode") {
        await DBR.initRuntimeSettingsFromString(Templates.speed);
      }else{
        await DBR.initRuntimeSettingsFromString(Templates.readRate);
      }
    }
    regionEnabledShared.value = newValue;
    setRegionEnabled(newValue);
  }

  const getFrameSize = () => {
    const width = parseInt(viewBox.split(" ")[2]);
    const height = parseInt(viewBox.split(" ")[3]);
    return [width,height];
  }
  
  return (
      <>
        {device &&
        hasPermission && (
        <>
            <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            format={cameraFormat}
            frameProcessor={frameProcessor}
            resizeMode='contain'
            pixelFormat="yuv"
            />
            <Svg style={StyleSheet.absoluteFill} 
              preserveAspectRatio="xMidYMid slice"
              viewBox={viewBox}>
              {regionEnabled &&
              <Rect 
                x={0.1*getFrameSize()[0]}
                y={0.2*getFrameSize()[1]}
                width={0.8*getFrameSize()[0]}
                height={0.45*getFrameSize()[1]}
                strokeWidth="2"
                stroke="red"
                fillOpacity={0.0}
              />}
              {barcodeResults.map((barcode, idx) => (
                <Polygon key={"poly-"+idx}
                  points={getPointsData(barcode)}
                  fill="lime"
                  stroke="green"
                  opacity="0.5"
                  strokeWidth="1"
                />
              ))}
              {barcodeResults.map((barcode, idx) => (
                <SVGText key={"text-"+idx}
                  fill="white"
                  stroke="purple"
                  fontSize={720/400*20}
                  fontWeight="bold"
                  x={barcode.points[0]?.x}
                  y={barcode.points[0]?.y}
                >
                  {barcode.barcodeText}
                </SVGText>
              ))}
            
            </Svg>
            <View style={styles.control}>
            <View style={{flex:0.8}}>
              {props.engine === "Dynamsoft" &&(
                <View style={styles.switchContainer}>
                  <Text style={{alignSelf: "center", color: "black"}}>Scan Region</Text>
                  <Switch
                    style={{alignSelf: "center"}}
                    trackColor={{ false: "#767577", true: "black" }}
                    thumbColor={regionEnabled ? "white" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(newValue) => {
                      toggleScanRegion(newValue);
                    }}
                    value={regionEnabled}
                  />
                </View>
              )}
              <View style={styles.switchContainer}>
                <Text style={{alignSelf: "center", color: "black"}}>Torch</Text>
                <Switch
                  style={{alignSelf: "center"}}
                  trackColor={{ false: "#767577", true: "black" }}
                  thumbColor={torchEnabled ? "white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(newValue) => {
                    setTorchEnabled(newValue);
                  }}
                  value={torchEnabled}
                />
              </View>
            </View>
          </View>
        </>)}
      </>
  );
}

export default BarcodeScanner;

const styles = StyleSheet.create({
  barcodeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  control:{
    flexDirection:"row",
    position: 'absolute',
    bottom: 0,
    height: "15%",
    width:"100%",
    alignSelf:"flex-start",
    borderColor: "white",
    borderWidth: 0.1,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: 'center',
  },
  switchContainer: {
    alignItems: 'flex-start',
    flexDirection: "row",
  },
});