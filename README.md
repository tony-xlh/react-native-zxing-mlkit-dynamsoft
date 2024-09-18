# react-native-zxing-mlkit-dynamsoft

A React Native barcode scanner demo using Vision Camera, ZXing, Google ML Kit and Dynamsoft Barcode Reader.

The demo can read barcodes from cameras or from an album image.

It is mainly used for comparing the different barcode reading SDKs:

* [ZXing](http://github.com/zxing/zxing/): an open-source library with basic barcode reading features
* [MLKit](https://developers.google.com/ml-kit/vision/barcode-scanning/android): a free library by Google
* [Dynamsoft Barcode Reader](http://www.dynamsoft.com/barcode-reader/overview/): an enterprise-grade SDK by Dynamsoft

If the license for Dynamsoft Barcode Reader expires, you can apply for one [here](https://www.dynamsoft.com/customer/license/trialLicense/).

## Comparison

### Barcode Formats

| ZXing       | MLKit       | Dynamsoft          |
|-------------|-------------|--------------------|
| UPC-A       | UPC-A       | UPC-A              |
| UPC-E       | UPC-E       | UPC-E              |
| EAN-8       | EAN-8       | EAN-8              |
| EAN-13      | EAN-13      | EAN-13             |
| Code 39     | Code 39     | Code 39            |
| Code 93     | Code 93     | Code 93            |
| ITF         | ITF         | ITF                |
| Codabar     | Codabar     | Codabar            |
| QR Code     | QR Code     | QR Code            |
| Aztec       | Aztec       | Aztec              |
| Data Matrix | Data Matrix | Data Matrix        |
| PDF417      | PDF417      | PDF417             |
| Maxicode    |             | Maxicode           |
| RSS-14      |             | RSS-14             |
|             |             | Code 11            |
|             |             | Interleaved 2 of 5 |
|             |             | Industrial 2 of 5  |
|             |             | GS1 DataBar        |
|             |             | GS1 Composite Code |
|             |             | DotCode            |
|             |             | Pharmacode         |
|             |             | Patch Code         |

### Reading Angle

Dynamsoft Barcode Reader and MLKit can read barcodes in any angle while ZXing has a limitation. You must align the barcode with the camera to read it.

### Inverted

Only Dynamsoft Barcode Reader can read inverted images in all barcode formats.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
