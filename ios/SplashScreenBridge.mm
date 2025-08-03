#import <SplashScreenSpec/SplashScreenSpec.h>
#import <React/RCTBridgeModule.h>

// Import Swift-generated header
#if __has_include("SplashScreen/SplashScreen-Swift.h")
#import "SplashScreen/SplashScreen-Swift.h"
#else
#import "SplashScreen-Swift.h"
#endif

@interface SplashScreenBridge : NSObject <NativeSplashScreenSpec>
@end

@implementation SplashScreenBridge

RCT_EXPORT_MODULE(SplashScreen)

- (void)show {
    [RNSplashScreen show];
}

- (void)showWithConfig:(JS::NativeSplashScreen::SplashScreenConfig &)config {
    NSMutableDictionary *configDict = [NSMutableDictionary dictionary];
    if (config.fade().has_value()) {
        configDict[@"fade"] = @(config.fade().value());
    }
    if (config.duration().has_value()) {
        configDict[@"duration"] = @(config.duration().value());
    }
    if (config.preventFlash().has_value()) {
        configDict[@"preventFlash"] = @(config.preventFlash().value());
    }
    [RNSplashScreen showWithConfig:configDict];
}

- (void)hide {
    [RNSplashScreen hide];
}

- (void)hideWithConfig:(JS::NativeSplashScreen::SplashScreenConfig &)config {
    NSMutableDictionary *configDict = [NSMutableDictionary dictionary];
    if (config.fade().has_value()) {
        configDict[@"fade"] = @(config.fade().value());
    }
    if (config.duration().has_value()) {
        configDict[@"duration"] = @(config.duration().value());
    }
    if (config.preventFlash().has_value()) {
        configDict[@"preventFlash"] = @(config.preventFlash().value());
    }
    [RNSplashScreen hideWithConfig:configDict];
}

- (void)releaseMemory {
    [RNSplashScreen releaseMemory];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSplashScreenSpecJSI>(params);
}

@end