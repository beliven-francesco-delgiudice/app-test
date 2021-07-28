# LimAPP

Mobile app for teams to receive notifications from race direction

## General structure

- **android** Android specific codebase
- **ios** iOS specific codebase
- **public** Public web resources
- **resources** Static resources for native builds
- **src** Platform-agnostic codebase (uses [Ionic Framework](https://ionicframework.com/docs/vue/overview) with [Vue js](https://v3.vuejs.org/guide/introduction.html))
- **tests** Integration and E2E test suite

## Pre-requisites

- **NodeJS** >= 12 (https://nodejs.org/en/download/)
- **Xcode** (https://ionicframework.com/docs/developing/ios)
- **Android Studio** (https://ionicframework.com/docs/developing/android)

## Getting started

```bash
npm i -g @ionic/cli
npm install

# Develop
ionic capacitor run ios
ionic capacitor run android

# Build for iOS
ionic capacitor build ios

# Build for Android
ionic capacitor build android
```

**NOTE:** Capacitor will open the native IDEs in order to build the apps

## Configuration

- `src/config.json` Main configuration file
  - _environment_ Select development (dev) and production (prod) mode
  - _onesignal_ Onesignal api keys
- `src/messages.json` Stores all success and failure messages of the app
- `src/urls.json` Stores all urls used for the server connection

## Play Store

To build the android app run `ionic capacitor build android`. \
After running the command, open Android Studio on the project. \
Go to _Build_ and then _Generate Signed Bundle_. \
Select _Android App Bundle_ and then _Next_.

- The _Key store path_ is the unique path to the Key file. You can find it in the Heply Google Drive in the folder _Lima Corporate_ > _APP_ > _chiavi_ named as **Key Android**. Download it and insert the unique path.
- The _Key store password_ and the _Key password_ are the same, you can find them in the Heply password manager under **LimAPP key store password**.

The go _Next_, choose _release_ and press _Finish_. \
After finishing, you will see a notification in the bottom low corner. Press on the arrow and click on _locate_. \
There you will find the finished build as an .aab file, ready to be uploaded on the Play Store.

## Copyright

© 2021 Heply S.r.l - All rights reserved
