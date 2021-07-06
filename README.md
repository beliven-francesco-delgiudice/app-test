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

## Copyright

© 2021 Heply S.r.l - All rights reserved
