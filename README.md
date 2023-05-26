# app

Mobile app for teams to receive notifications from race direction

## General structure

- **android** Android specific codebase
- **ios** iOS specific codebase
- **public** Public web resources
- **resources** Static resources for native builds
- **src** Platform-agnostic codebase (uses [Ionic Framework](https://ionicframework.com/docs/vue/overview) with [Vue js](https://v3.vuejs.org/guide/introduction.html))
- **tests** Integration and E2E test suite

## Pre-requisites

- **NodeJS** >= 12 (<https://nodejs.org/en/download/>)
- **Xcode** (<https://ionicframework.com/docs/developing/ios>)
- **Android Studio** (<https://ionicframework.com/docs/developing/android>)

## Getting started

```bash
npm i -g @ionic/cli
npm install

# Develop
ionic capacitor run ios
ionic capacitor run android
ionic serve

# Build for iOS
ionic capacitor build ios

# Build for Android
ionic capacitor build android

# Build Webapp
npm run build
```

**NOTE:** Capacitor will open the native IDEs in order to build the apps

## Configuration

- `src/config.json` Main configuration file
  - _environment_ Select development (dev) and production (prod) mode
  - _onesignal_ Onesignal api keys
- `src/messages.json` Stores all success and failure messages of the app
- `src/urls.json` Stores all urls used for the server connection

## Upload to stores

You will find here the guides on how to upload the app on the Play Store and on the App Store.
Please keep the version and the build number equally updated:

File:

- Android: `android/app/build.gradle`
- iOS: `ios/App/App.xcodeproj/project.pbxproj`

Version number:

- iOS: "MARKETING_VERSION"
- Android: "versionName"

Build number:

- iOs: "CURRENT_PROJECT_VERSION"
- Android: "versionCode"

## Play Store

**Before building you will need to open the file _build.gradle_ to edit the _versionName_ and increase the _versionCode_ number.** \
To build the android app run `ionic capacitor build android`. \
After running the command, if not already opened, open Android Studio on the project. \
Go to _Build_ and then _Generate Signed Bundle/APK_. \
Select _Android App Bundle_ and then _Next_.

- The _Key store path_ is the unique path to the Key file. You can find it in the Heply Google Drive in the folder _Lima Corporate_ > _APP_ > _chiavi_ named as **Key Android**. Download it and insert the unique path.
- The _Key store password_ and the _Key password_ are the same, you can find them in the Heply password manager under **app key store password**.

The go _Next_, choose _release_ and press _Finish_. \
After finishing, you will see a notification in the bottom low corner titled **Generate Signed Bundle**. Press on the arrow and click on _locate_. \
There you will find the finished build as an .aab file, ready to be uploaded on the Play Store.

## App Store

To build the ios app run `ionic capacitor build ios`. \
After running the command, if not already opened, open XCode on the project by opening _App.xcodeproj_. \
In the top side of the window click on _App_ (next to Play and Pause) and select _Any iOS Device_. \
**Before archiving you will need to open the file _App.xcodeproj_ to edit the _Version_ and increase the _Build_ number.** \
Then in the top bar click on _Product_ and select _Archive_.

**Note:** If you encounter the "Capacitor not found" error, close XCode and open it by running `npx cap open ios` in the project repository.

After archiving, in the new window click on _Distribute app_, then always click on _Next_ until you read _Processing App..._\
Now click on Upload to automatically upload it on the app store.

## Copyright

© 2021 Heply S.r.l - All rights reserved
