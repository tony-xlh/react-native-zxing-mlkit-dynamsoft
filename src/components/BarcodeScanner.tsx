import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Camera, runAsync, useCameraDevice, useCameraFormat, useFrameProcessor, type Orientation } from 'react-native-vision-camera';
import { zxing, type Result } from 'vision-camera-zxing';
import { Worklets } from 'react-native-worklets-core';
import { Polygon, Svg, Text as SVGText } from 'react-native-svg';
interface props {
  onScanned?: (result:Result[]) => void;
}

const BarcodeScanner: React.FC<props> = (props: props) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [viewBox, setViewBox] = React.useState("0 0 720 1280");
  const [barcodeResults, setBarcodeResults] = React.useState([] as Result[]);
  const device = useCameraDevice("back");
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
    setBarcodeResults(converted);
  }
  const convertAndSetResultsJS = Worklets.createRunOnJS(convertAndSetResults);
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
      const results = zxing(frame,{multiple:true});
      console.log(results);
      convertAndSetResultsJS(results,frame.width,frame.height,frame.orientation);
    })
  }, [])

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      setIsActive(true);
    })();
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
});