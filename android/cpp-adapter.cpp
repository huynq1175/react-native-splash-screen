#include <jni.h>
#include "react-native-splash-screen.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_splashscreen_SplashScreenModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return splashscreen::multiply(a, b);
}
