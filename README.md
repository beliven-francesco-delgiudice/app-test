<<<<<<< HEAD

# app

=======

# APP
>>>>>>>
>>>>>>> 23a91661a053a6010ace1b060732f73bc9ad21c3

Mobile app

## General structure

- **android** Android specific codebase
- **ios** iOS specific codebase
- **public** Public web resources
- **resources** Static resources for native builds
- **src** Platform-agnostic codebase (uses [Ionic Framework](https://ionicframework.com/docs/vue/overview) with [Vue js](https://v3.vuejs.org/guide/introduction.html))

## Pre-requisites

- **NodeJS** >= 14 (<https://nodejs.org/en/download/>)
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
