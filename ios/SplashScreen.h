#import <UIKit/UIKit.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSplashScreenSpec.h"

@interface SplashScreen : NSObject <NativeSplashScreenSpec>
+ (void)show;
+ (void)hide;
#else
#import <React/RCTBridgeModule.h>

@interface SplashScreen : NSObject <RCTBridgeModule>
+ (void)show;
+ (void)hide;
#endif

@end
