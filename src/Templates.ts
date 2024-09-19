export const readRate = `
{
   "FormatSpecificationArray" : [
      {
         "AllModuleDeviation" : 0,
         "AustralianPostEncodingTable" : "C",
         "BarcodeAngleRangeArray" : null,
         "BarcodeBytesLengthRangeArray" : [
            {
               "MaxValue" : 2147483647,
               "MinValue" : 0
            }
         ],
         "BarcodeBytesRegExPattern" : "",
         "BarcodeComplementModes" : null,
         "BarcodeFormatIds" : [ "BF_ALL" ],
         "BarcodeFormatIds_2" : [
            "BF2_NONSTANDARD_BARCODE",
            "BF2_POSTALCODE",
            "BF2_DOTCODE",
            "BF2_PHARMACODE"
         ],
         "BarcodeHeightRangeArray" : null,
         "BarcodeTextLengthRangeArray" : [
            {
               "MaxValue" : 2147483647,
               "MinValue" : 0
            }
         ],
         "BarcodeTextRegExPattern" : "",
         "BarcodeWidthRangeArray" : null,
         "BarcodeZoneBarCountRangeArray" : null,
         "BarcodeZoneMinDistanceToImageBorders" : 0,
         "Code128Subset" : "",
         "DeblurLevel" : 9,
         "DeformationResistingModes" : null,
         "EnableDataMatrixECC000-140" : 0,
         "EnableQRCodeModel1" : 0,
         "FindUnevenModuleBarcode" : 1,
         "HeadModuleRatio" : "",
         "MSICodeCheckDigitCalculation" : "MSICCDC_MOD_10",
         "MinQuietZoneWidth" : 4,
         "MinRatioOfBarcodeZoneWidthToHeight" : 0,
         "MinResultConfidence" : 30,
         "MirrorMode" : "MM_BOTH",
         "ModuleSizeRangeArray" : null,
         "Name" : "defaultFormatParameterForAllBarcodeFormat",
         "PartitionModes" : [ "PM_WHOLE_BARCODE", "PM_ALIGNMENT_PARTITION" ],
         "PatchCodeSearchingMargins" : {
            "Bottom" : 20,
            "Left" : 20,
            "MeasuredByPercentage" : 1,
            "Right" : 20,
            "Top" : 20
         },
         "RequireStartStopChars" : 1,
         "ReturnPartialBarcodeValue" : 1,
         "StandardFormat" : "",
         "TailModuleRatio" : "",
         "VerifyCheckDigit" : 0
      }
   ],
   "ImageParameter" : {
      "BarcodeColourModes" : [
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "LightReflection" : 1,
            "Mode" : "BICM_DARK_ON_LIGHT"
         }
      ],
      "BarcodeComplementModes" : [
         {
            "Mode" : "BCM_SKIP"
         }
      ],
      "BarcodeFormatIds" : [ "BF_ALL" ],
      "BarcodeFormatIds_2" : [ "BF2_NULL" ],
      "BinarizationModes" : [
         {
            "BlockSizeX" : 0,
            "BlockSizeY" : 0,
            "EnableFillBinaryVacancy" : 0,
            "ImagePreprocessingModesIndex" : -1,
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "BM_LOCAL_BLOCK",
            "ThresholdCompensation" : 10
         }
      ],
      "ColourClusteringModes" : [
         {
            "Mode" : "CCM_SKIP"
         }
      ],
      "ColourConversionModes" : [
         {
            "BlueChannelWeight" : -1,
            "GreenChannelWeight" : -1,
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "CICM_GENERAL",
            "RedChannelWeight" : -1
         }
      ],
      "DPMCodeReadingModes" : [
         {
            "Mode" : "DPMCRM_SKIP"
         }
      ],
      "DeblurLevel" : 0,
      "DeblurModes" : null,
      "DeformationResistingModes": [
        {
          "Level": 5,
          "LibraryFileName": "",
          "LibraryParameters": "",
          "Mode": "DRM_GENERAL"
        },
        {
          "Level": 5,
          "LibraryFileName": "",
          "LibraryParameters": "",
          "Mode": "DRM_BROAD_WARP"
        },
        {
          "Level": 5,
          "LibraryFileName": "",
          "LibraryParameters": "",
          "Mode": "DRM_DEWRINKLE"
        }
      ],
      "Description" : "",
      "ExpectedBarcodesCount" : 0,
      "FormatSpecificationNameArray" : [ "defaultFormatParameterForAllBarcodeFormat" ],
      "GrayscaleTransformationModes" : [
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "GTM_ORIGINAL"
         },
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "GTM_INVERTED"
         }
      ],
      "ImagePreprocessingModes" : [
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "IPM_GENERAL"
         }
      ],
      "IntermediateResultSavingMode" : {
         "Mode" : "IRSM_MEMORY"
      },
      "IntermediateResultTypes" : [ "IRT_NO_RESULT" ],
      "LocalizationModes" : [
         {
            "IsOneDStacked" : 0,
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "LM_SCAN_DIRECTLY",
            "ScanDirection" : 1,
            "ScanStride" : 0
         },
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "LM_CONNECTED_BLOCKS"
         }
      ],
      "MaxAlgorithmThreadCount" : 4,
      "Name" : "Settings",
      "PDFRasterDPI" : 300,
      "PDFReadingMode" : {
         "Mode" : "PDFRM_AUTO"
      },
      "Pages" : "",
      "RegionDefinitionNameArray" : null,
      "RegionPredetectionModes" : [
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "RPM_GENERAL"
         }
      ],
      "ResultCoordinateType" : "RCT_PIXEL",
      "ReturnBarcodeZoneClarity" : 0,
      "ScaleDownThreshold" : 2300,
      "ScaleUpModes" : [
         {
            "Mode" : "SUM_AUTO"
         }
      ],
      "TerminatePhase" : "TP_BARCODE_RECOGNIZED",
      "TextAssistedCorrectionMode" : {
         "BottomTextPercentageSize" : 0,
         "LeftTextPercentageSize" : 0,
         "LibraryFileName" : "",
         "LibraryParameters" : "",
         "Mode" : "TACM_VERIFYING",
         "RightTextPercentageSize" : 0,
         "TopTextPercentageSize" : 0
      },
      "TextFilterModes" : [
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "MinImageDimension" : 65536,
            "Mode" : "TFM_GENERAL_CONTOUR",
            "Sensitivity" : 0
         }
      ],
      "TextResultOrderModes" : [
         {
            "Mode" : "TROM_CONFIDENCE"
         },
         {
            "Mode" : "TROM_POSITION"
         },
         {
            "Mode" : "TROM_FORMAT"
         }
      ],
      "TextureDetectionModes" : [
         {
            "LibraryFileName" : "",
            "LibraryParameters" : "",
            "Mode" : "TDM_GENERAL_WIDTH_CONCENTRATION",
            "Sensitivity" : 5
         }
      ],
      "Timeout" : 3000
   },
   "Version" : "3.0"
}
`

export const speed = `
{
  "ImageParameter": {
    "BarcodeComplementModes": [
      {
        "Mode": "BCM_GENERAL"
      }
    ],
    "BarcodeFormatIds": [
      "BF_ALL"
    ],
    "BarcodeFormatIds_2": [
      "BF2_NULL"
    ],
    "BinarizationModes": [
      {
        "BlockSizeX": 61,
        "BlockSizeY": 61,
        "EnableFillBinaryVacancy": 1,
        "ImagePreprocessingModesIndex": -1,
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "BM_LOCAL_BLOCK",
        "ThresholdCompensation": 10
      }
    ],
    "DPMCodeReadingModes": [
      {
        "Mode": "DPMCRM_SKIP"
      }
    ],
    "DeformationResistingModes": [
      {
        "Mode": "DRM_SKIP"
      }
    ],
    "ExpectedBarcodesCount": 0,
    "FormatSpecificationNameArray": [
      "default"
    ],
    "GrayscaleTransformationModes": [
      {
        "Mode": "GTM_ORIGINAL"
      },
      {
        "Mode": "GTM_INVERTED"
      }
    ],
    "ImagePreprocessingModes": [
      {
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "IPM_GENERAL"
      }
    ],
    "LocalizationModes": [
      {
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "LM_CONNECTED_BLOCKS"
      }
    ],
    "Name": "Settings",
    "TextureDetectionModes": [
      {
        "Mode": "TDM_GENERAL_WIDTH_CONCENTRATION"
      }
    ],
    "Timeout": 3000
  },
  "Version": "3.0",
  "FormatSpecification": {
    "Name": "default"
  }
}
`

export const templateWithScanRegion = (content:string) => {
  let settings = JSON.parse(content);
  let left = 20;
  let right = 65;
  let top = 10;
  let bottom = 90;
  settings["ImageParameter"]["RegionDefinitionNameArray"] = ["Settings"];
  settings["RegionDefinition"] = {
                                  "Left": left,
                                  "Right": right,
                                  "Top": top,
                                  "Bottom": bottom,
                                  "MeasuredByPercentage": 1,
                                  "Name": "Settings",
                                };
  return JSON.stringify(settings);
}