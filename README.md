# react-native-splash-screen

A performant splash screen for React Native apps with smooth transitions and memory optimization.

## Features

- 🚀 **Smooth Transitions** - Configurable fade animations
- 🎯 **Prevent White Flash** - Seamless transition from splash to app
- 💾 **Memory Optimization** - Built-in memory management
- 🔧 **Highly Configurable** - Customize duration, animations, and behavior
- 📱 **Cross Platform** - iOS and Android support
- 🏗️ **New Architecture** - TurboModule support

## Installation

```sh
npm install @abeman/react-native-splash-screen
# or
yarn add @abeman/react-native-splash-screen
```

### iOS Setup

1. **Run pod install**
```sh
cd ios && pod install
```

2. **Configure in AppDelegate** (Swift)
```swift
import SplashScreen

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    // Show splash screen on app launch
    SplashScreen.show()
    return true
  }
}
```

### Android Setup

1. **Add splash screen drawable** at `android/app/src/main/res/drawable/launch_screen.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/splash_background" />
  <item>
    <bitmap
      android:src="@mipmap/ic_launcher"
      android:gravity="center" />
  </item>
</layer-list>
```

2. **Define colors** at `android/app/src/main/res/values/colors.xml`:
```xml
<resources>
  <color name="splash_background">#FFFFFF</color>
</resources>
```

3. **Update theme** in `android/app/src/main/res/values/styles.xml`:
```xml
<style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
  <item name="android:windowBackground">@drawable/launch_screen</item>
  <item name="android:windowDisablePreview">false</item>
</style>
```

4. **Configure in MainActivity** (Kotlin):
```kotlin
import com.splashscreen.SplashScreenModule

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreenModule.showSplash(this)
    super.onCreate(savedInstanceState)
  }
}
```

## Usage

### Basic Usage

```typescript
import SplashScreen from '@abeman/react-native-splash-screen';

// In your app's entry point (App.tsx)
useEffect(() => {
  // Hide splash screen after app loads
  SplashScreen.hide();
}, []);
```

### Advanced Usage

```typescript
import SplashScreen from '@abeman/react-native-splash-screen';

// Show splash screen with configuration
SplashScreen.show({
  preventFlash: true
});

// Hide with smooth fade animation
SplashScreen.hide({
  fade: true,
  duration: 0.5,      // seconds
  preventFlash: true
});

// Release memory when needed
SplashScreen.releaseMemory();
```

## API Reference

### Methods

#### `show(config?: SplashScreenConfig)`
Shows the splash screen.

**Parameters:**
- `config` (optional):
  - `preventFlash`: boolean - Prevent white flash (default: true)

#### `hide(config?: SplashScreenConfig)`
Hides the splash screen.

**Parameters:**
- `config` (optional):
  - `fade`: boolean - Enable fade animation (default: true)
  - `duration`: number - Animation duration in seconds (default: 0.3)
  - `preventFlash`: boolean - Prevent white flash during transition

#### `releaseMemory()`
Releases cached resources to free up memory.

### TypeScript Support

```typescript
import SplashScreen, { SplashScreenConfig } from '@abeman/react-native-splash-screen';

const config: SplashScreenConfig = {
  fade: true,
  duration: 0.5,
  preventFlash: true
};

SplashScreen.hide(config);
```

## Example

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import SplashScreen from '@abeman/react-native-splash-screen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppData();
  }, []);

  const loadAppData = async () => {
    try {
      // Load your app data, authenticate user, etc.
      await fetchUserData();
      await loadAppResources();

      setIsLoading(false);

      // Hide splash screen with smooth transition
      SplashScreen.hide({
        fade: true,
        duration: 0.5,
        preventFlash: true
      });
    } catch (error) {
      // Handle error
      SplashScreen.hide();
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
      </View>
  );
  }

  return (
    <View style={{ flex: 1 }}>
  <Text>Welcome to the app!</Text>
  </View>
);
}
```

## Performance Tips

1. **Preload Resources**: Call `SplashScreen.show()` as early as possible in your native code
2. **Optimize Images**: Use appropriately sized images for splash screen
3. **Memory Management**: Call `releaseMemory()` after hiding splash screen in memory-constrained situations
4. **Prevent Flash**: Always use `preventFlash: true` for seamless transitions

## Troubleshooting

### White flash on Android
Make sure you've set the `windowBackground` in your app theme and use `preventFlash: true` when hiding.

### Splash screen not showing on iOS
Ensure you're calling `SplashScreen.show()` in `didFinishLaunchingWithOptions` before any other setup.

### TypeScript errors
Make sure to import types: `import { SplashScreenConfig } from '@abeman/react-native-splash-screen'`

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
