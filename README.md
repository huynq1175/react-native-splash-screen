
# React Native Splash Screen

A simple and customizable splash screen package for React Native applications. This package allows you to show and hide a splash screen with ease, supporting both fullscreen and non-fullscreen modes.
> [!IMPORTANT]
> New Architecture required.

## Installation

To install the package, run:

```bash
npm install @nucleus/react-native-splash-screen
```

or

```bash
yarn add @nucleus/react-native-splash-screen
```

## Setup

### Android


1. **Create a layout for your splash screen:**

   Create a `splash_screen.xml` layout file in `res/layout`:

   ```xml
   <!-- res/layout/splash_screen.xml -->
   <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
       android:layout_width="match_parent"
       android:layout_height="match_parent"
       android:orientation="vertical"
       android:background="@drawable/splash_background"
       android:gravity="center">

       <ImageView
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:layout_centerInParent="true"
          android:scaleType="centerCrop"
          android:contentDescription="@string/app_name"
          android:src="@drawable/splash_background" />
   </LinearLayout>
   ```

2. **Create splash screen themes:**

   Add splash screen themes to `res/values/styles.xml`:

   ```xml
   <!-- res/values/styles.xml -->
   <resources>
       <style name="SplashScreen_SplashTheme" parent="Theme.AppCompat.Light.NoActionBar">
           <item name="android:windowBackground">@drawable/splash_background</item>
       </style>

       <style name="SplashScreen_Fullscreen" parent="Theme.AppCompat.Light.NoActionBar">
           <item name="android:windowBackground">@drawable/splash_background</item>
           <item name="android:windowFullscreen">true</item>
       </style>
   </resources>
   ```

4. **Update `MainActivity.kt`:**

   In your `MainActivity.kt`, call `SplashScreen.show(this)` in the `onCreate` method:

   ```kotlin
   package com.example

   import android.os.Bundle
   import com.facebook.react.ReactActivity
   import org.devio.rn.splashscreen.SplashScreen

   class MainActivity : ReactActivity() {

       override fun onCreate(savedInstanceState: Bundle?) {
           SplashScreen.show(this, true)  // Show the splash screen when the activity is created
           super.onCreate(savedInstanceState)
       }

       override fun getMainComponentName(): String? {
           return "YourAppName"
       }
   }
   ```

## Usage

To show or hide the splash screen from JavaScript, use the following methods:

### Show Splash Screen

```javascript
import { NativeModules } from 'react-native';

const { SplashScreen } = NativeModules;

// Show the splash screen
SplashScreen.show();
```

### Hide Splash Screen

```javascript
import { NativeModules } from 'react-native';

const { SplashScreen } = NativeModules;

// Hide the splash screen
SplashScreen.hide();
```

### Changing the Splash Screen Theme

You can customize the splash screen theme by editing the themes defined in `styles.xml`.

## License

MIT

---

**Author:** HuyNQ

**GitHub:** Huĩ <huy.nguyen@jmango360.com> (https://github.com/huynqjmango360)
