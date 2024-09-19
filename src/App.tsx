import * as React from 'react';
import { Alert, Button, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import BarcodeScanner from './components/BarcodeScanner';
import { decodeBase64, type Result } from 'vision-camera-zxing';
import {launchImageLibrary, type ImageLibraryOptions} from 'react-native-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import * as DBR from 'vision-camera-dynamsoft-barcode-reader';
import { Point } from 'react-native-vision-camera';
import { ImageScanner } from "react-native-vision-camera-barcodes-scanner";
import { readRate, speed } from './Templates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

const Separator = () => (
  <View style={styles.separator} />
);

const radio_props = [
  {label: 'ZXing', value: 0 },
  {label: 'MLKit', value: 1 },
  {label: 'Dynamsoft', value: 2 }
];

const templates_radio_props = [
  {label: 'Speed Mode', value: 0 },
  {label: 'Read Rate Mode', value: 1 }
];

export default function App() {
  const initialValue = React.useRef(0);
  const initialTemplateValue = React.useRef(0);
  const [useCamera,setUseCamera] = React.useState(false);
  const [DBRTemplate,setDBRTemplate] = React.useState<"Speed Mode"|"Read Rate Mode">("Speed Mode");
  const [continuous, setContinuous] = React.useState(false);
  const [barcodeResults, setBarcodeResults] = React.useState([] as Result[]);
  const [selectedEngine, setSelectedEngine] = React.useState("ZXing");
  const toggleSwitch = () => setContinuous(previousState => !previousState);

  React.useEffect(() => {
    (async () => {
      const result = await DBR.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==");
      console.log(result);
      if (!result) {
        Alert.alert("","License for Dynamsoft Barcode Reader is invalid");
      }
      await DBR.initRuntimeSettingsFromString(speed);
    })();
  }, []);

  const updateEngine = (value:number) => {
    initialValue.current = value;
    if (value === 0) {
      setSelectedEngine("ZXing");
    }else if (value === 1) {
      setSelectedEngine("MLKit");
    }else{
      setSelectedEngine("Dynamsoft");
    }
  }

  const updateTemplate = (value:number) => {
    initialTemplateValue.current = value;
    if (value === 0) {
      setDBRTemplate("Speed Mode");
      DBR.initRuntimeSettingsFromString(speed);
    }else{
      setDBRTemplate("Read Rate Mode");
      DBR.initRuntimeSettingsFromString(readRate);
    }
  }

  const onScanned = (results:Result[]) => {
    setBarcodeResults(results);
    if (results.length>0 && !continuous) {
      setUseCamera(false);
    }
  }

  const decodeFromAlbum = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    }
    let response = await launchImageLibrary(options);
    if (response && response.assets) {
      if (selectedEngine != "MLKit") {
        if (response.assets[0]!.base64) {
          if (selectedEngine === "Dynamsoft") {
            let textResults = await DBR.decodeBase64(response.assets[0]!.base64);
            let results = [];
            for (let index = 0; index < textResults.length; index++) {
              const tr = textResults[index];
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
              results.push(result);
            }
            setBarcodeResults(results);
          }else{
            let results = await decodeBase64(response.assets[0]!.base64,{multiple:true});
            setBarcodeResults(results);
          }
        }
      }else{
        if (response && response.assets[0] && response.assets[0].uri) {
          const uri = response.assets[0].uri as string;
          let results = [];
          //@ts-ignore
          const barcodes = await ImageScanner(uri);
          for (let index = 0; index < barcodes.length; index++) {
            const barcode = barcodes[index];
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
            results.push(result);
          }
          setBarcodeResults(results);
        }
      }
    }
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {useCamera && (
          <>
            <BarcodeScanner onScanned={onScanned} engine={selectedEngine} DBRTemplate={DBRTemplate}></BarcodeScanner>
            <View
              style={{position: 'absolute', left:100, right: 100, bottom: 0, justifyContent: 'flex-end', alignItems: 'center'}}
            >
              <Button
                title="Close"
                onPress={() => setUseCamera(false)}
              />
            </View>
          </>
          
        )}
        {!useCamera &&(
            <View style={{alignItems:"center"}}>
              <Text style={styles.title}>
                ZXing, MLKit, Dynamsoft Demo
              </Text>
              <Button
                title="Read Barcodes from the Camera"
                onPress={() => setUseCamera(true)}
              />
              <Separator />
              <View style={styles.switchView}>
                <Text style={{alignSelf: 'center'}}>
                  Continues Scan
                </Text>
                <Switch 
                  style={{alignSelf: 'center'}}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={continuous ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={continuous}
                />
              </View>
              <Separator />
              <Button
                title="Read Barcodes from the Album"
                onPress={() => decodeFromAlbum()}
              />
              <Separator />
              <RadioForm
                radio_props={radio_props}
                initial={initialValue.current}
                formHorizontal={true}
                labelHorizontal={false}
                onPress={(value) => {updateEngine(value)}}
              />
              <Separator />
              {selectedEngine === "Dynamsoft" &&(
                <>
                  <RadioForm
                    radio_props={templates_radio_props}
                    initial={initialTemplateValue.current}
                    formHorizontal={true}
                    labelHorizontal={false}
                    onPress={(value) => {updateTemplate(value)}}
                  />
                  <Separator />
                </>
              )}
              <ScrollView style={styles.scrollView}>
              {barcodeResults.map((barcode, idx) => (
                <Text key={"barcode"+idx}>
                  {barcode.barcodeFormat + (barcode.barcodeFormat ? ": " : "") + barcode.barcodeText}
                </Text>
              ))}
              </ScrollView>
            </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 4,
  },
  switchView: {
    alignItems: 'center',
    flexDirection: "row",
  },
  scrollView: {
    width: '80%',
  },
  barcodeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});