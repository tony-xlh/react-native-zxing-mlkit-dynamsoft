export const readRate = `
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
        "BlockSizeX": 0,
        "BlockSizeY": 0,
        "EnableFillBinaryVacancy": 1,
        "ImagePreprocessingModesIndex": -1,
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "BM_LOCAL_BLOCK",
        "ThresholdCompensation": 10
      }
    ],
    "DeformationResistingModes": [
      {
        "Mode": "DRM_AUTO"
      },
      {
        "Mode": "DRM_GENERAL",
        "Level": 5
      },
      {
        "Mode": "DRM_BROAD_WARP"
      },
      {
        "Mode": "DRM_DEWRINKLE"
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
      },
      {
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "IPM_GRAY_EQUALIZE",
        "Sensitivity": 5
      },
      {
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "IPM_GRAY_SMOOTH",
        "SmoothBlockSizeX": 3,
        "SmoothBlockSizeY": 3
      }
    ],
    "LocalizationModes": [
      {
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "LM_CONNECTED_BLOCKS"
      },
      {
        "IsOneDStacked": 0,
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "LM_SCAN_DIRECTLY",
        "ScanDirection": 0,
        "ScanStride": 0
      },
      {
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "LM_STATISTICS"
      },
      {
        "LibraryFileName": "",
        "LibraryParameters": "",
        "Mode": "LM_LINES"
      }
    ],
    "Name": "Settings",
    "TextureDetectionModes": [
      {
        "Mode": "TDM_GENERAL_WIDTH_CONCENTRATION"
      }
    ],
    "Timeout": 2000
  },
  "Version": "3.0",
  "FormatSpecification": {
    "Name": "default"
  }
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