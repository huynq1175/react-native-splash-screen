package com.splashscreen

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = SplashScreenModule.NAME)
class SplashScreenModule(reactContext: ReactApplicationContext) :
  NativeSplashScreenSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  override fun show() {
    currentActivity?.let {
      SplashScreen.show(it, true)
    }
  }

  override fun hide() {
    currentActivity?.let {
      SplashScreen.hide(it)
    }
  }

  companion object {
    const val NAME = "SplashScreen"
  }
}
