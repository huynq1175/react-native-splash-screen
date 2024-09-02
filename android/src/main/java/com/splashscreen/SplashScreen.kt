package com.splashscreen

import android.app.Activity
import android.app.Dialog
import android.os.Build
import android.view.WindowManager
import java.lang.ref.WeakReference

object SplashScreen {
  private var mSplashDialog: Dialog? = null
  private var mActivity: WeakReference<Activity>? = null

  fun show(activity: Activity?, themeResId: Int, fullScreen: Boolean) {
    if (activity == null) return
    mActivity = WeakReference(activity)
    activity.runOnUiThread {
      if (!activity.isFinishing) {
        mSplashDialog = Dialog(activity, themeResId).apply {
          setContentView(R.layout.splash_screen)
          setCancelable(false)
          if (fullScreen) {
            setActivityAndroidP(this)
          }
          if (!isShowing) {
            show()
          }
        }
      }
    }
  }

  fun show(activity: Activity, fullScreen: Boolean) {
    val resourceId = if (fullScreen) R.style.SplashScreen_Fullscreen else R.style.SplashScreen_SplashTheme
    show(activity, resourceId, fullScreen)
  }

  fun show(activity: Activity) {
    show(activity, false)
  }

  fun hide(activity: Activity?) {
    var activity = activity
    if (activity == null) {
      activity = mActivity?.get()
    }

    if (activity == null) return

    activity.runOnUiThread {
      mSplashDialog?.takeIf { it.isShowing }?.let {
        if (!activity.isFinishing && !(activity.isDestroyed)) {
          it.dismiss()
        }
        mSplashDialog = null
      }
    }
  }

  private fun setActivityAndroidP(dialog: Dialog) {
    if (Build.VERSION.SDK_INT >= 28) {
      dialog.window?.apply {
        addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS)
        attributes = attributes.apply {
          layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
        }
      }
    }
  }
}
