package com.splashscreen

import android.app.Activity
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule
import java.lang.ref.WeakReference

@ReactModule(name = SplashScreenModule.NAME)
class SplashScreenModule(reactContext: ReactApplicationContext) :
  NativeSplashScreenSpec(reactContext) {

  private var imageView: android.widget.ImageView? = null
  private val mainHandler = Handler(Looper.getMainLooper())

  override fun getName(): String {
    return NAME
  }

  override fun show() {
    showWithConfig(null)
  }

  override fun showWithConfig(config: ReadableMap?) {
    UiThreadUtil.runOnUiThread {
      val activity = currentActivity ?: return@runOnUiThread
      if (staticSplashDialog?.isShowing == true) return@runOnUiThread

      val preventFlash = if (config?.hasKey("preventFlash") == true) config.getBoolean("preventFlash") else true

      staticSplashDialog = android.app.Dialog(activity, android.R.style.Theme_Translucent_NoTitleBar_Fullscreen).apply {
        setContentView(createSplashView(activity))
        setCancelable(false)

        if (preventFlash) {
          // Set window background to match splash screen to prevent white flash
          window?.setBackgroundDrawableResource(android.R.color.transparent)
          window?.decorView?.setBackgroundColor(android.graphics.Color.parseColor("#FFFFFF"))
        }

        show()
      }
    }
  }

  override fun hide() {
    hideWithConfig(null)
  }

  override fun hideWithConfig(config: ReadableMap?) {
    UiThreadUtil.runOnUiThread {
      Log.d(NAME, "hideWithConfig: staticSplashDialog isShowing = ${staticSplashDialog?.isShowing}")
      staticSplashDialog?.let { dialog ->
        if (!dialog.isShowing) return@runOnUiThread

        val fade = if (config?.hasKey("fade") == true) config.getBoolean("fade") else true
        val duration = if (config?.hasKey("duration") == true) (config.getDouble("duration") * 1000) else 300.0

        if (fade) {
          dialog.window?.decorView?.animate()
            ?.alpha(0f)
            ?.setDuration(duration.toLong())
            ?.withEndAction {
              dialog.dismiss()
              staticSplashDialog = null
              releaseMemory()
            }
            ?.start()
        } else {
          dialog.dismiss()
          staticSplashDialog = null
          releaseMemory()
        }
      }
    }
  }

  override fun releaseMemory() {
    UiThreadUtil.runOnUiThread {
      // Clear image view
      imageView?.setImageDrawable(null)
      imageView = null

      // Clear dialog
      staticSplashDialog?.dismiss()
      staticSplashDialog = null

      // Force garbage collection
      System.gc()
    }
  }

  private fun createSplashView(activity: Activity): View {
    return LinearLayout(activity).apply {
      orientation = LinearLayout.VERTICAL
      layoutParams = ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT
      )

      val drawableId = resources.getIdentifier("launch_screen", "drawable", activity.packageName)
      if (drawableId != 0) {
        imageView = android.widget.ImageView(activity).apply {
          setImageResource(drawableId)
          scaleType = android.widget.ImageView.ScaleType.CENTER_CROP
          layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )
        }
        addView(imageView)
      } else {
        // Fallback to white background if no launch screen found
        setBackgroundColor(android.graphics.Color.WHITE)
      }
    }
  }

  companion object {
    const val NAME = "SplashScreen"
    private var staticSplashDialog: android.app.Dialog? = null

    @JvmStatic
    fun showSplash(activity: Activity) {
      val preventFlash = true

      if (staticSplashDialog?.isShowing == true) return

      staticSplashDialog = android.app.Dialog(activity, android.R.style.Theme_Translucent_NoTitleBar_Fullscreen).apply {
        val linearLayout = LinearLayout(activity).apply {
          orientation = LinearLayout.VERTICAL
          layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )

          val drawableId = resources.getIdentifier("launch_screen", "drawable", activity.packageName)
          if (drawableId != 0) {
            val imageView = android.widget.ImageView(activity).apply {
              setImageResource(drawableId)
              scaleType = android.widget.ImageView.ScaleType.CENTER_CROP
              layoutParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
              )
            }
            addView(imageView)
          } else {
            setBackgroundColor(android.graphics.Color.WHITE)
          }
        }

        setContentView(linearLayout)
        setCancelable(false)

        if (preventFlash) {
          window?.setBackgroundDrawableResource(android.R.color.transparent)
          window?.decorView?.setBackgroundColor(android.graphics.Color.parseColor("#FFFFFF"))
        }

        show()
      }
    }

    @JvmStatic
    fun hideSplash() {
      staticSplashDialog?.let { dialog ->
        if (dialog.isShowing) {
          dialog.dismiss()
          staticSplashDialog = null
        }
      }
    }
  }
}
