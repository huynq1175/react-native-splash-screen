#import "SplashScreen.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>

static bool waiting = true;
static bool addedJsLoadErrorObserver = false;
static UIView* loadingView = nil;
static UIViewController *splashViewController = nil;

@implementation SplashScreen
RCT_EXPORT_MODULE()

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED

- (void)hide { 
    [SplashScreen hide];
}


- (void)show { 
    [SplashScreen show];
}

+ (void)show {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (!splashViewController) {
          UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
          splashViewController = [storyboard instantiateInitialViewController];
          
          UIWindow *window = [UIApplication sharedApplication].delegate.window;
          [window addSubview:splashViewController.view];
          splashViewController.view.frame = window.bounds;
        }
      });
}

+ (void)hide {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (splashViewController) {
          [UIView transitionWithView:splashViewController.view
                            duration:0.3
                             options:UIViewAnimationOptionTransitionCrossDissolve
                          animations:^{
            splashViewController.view.alpha = 0.5;
          } completion:^(BOOL finished) {
            [splashViewController.view removeFromSuperview];
            splashViewController = nil;
          }];
        }
      });
}

+ (void) jsLoadError:(NSNotification*)notification
{
    // If there was an error loading javascript, hide the splash screen so it can be shown.  Otherwise the splash screen will remain forever, which is a hassle to debug.
    [SplashScreen hide];
}


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSplashScreenSpecJSI>(params);
}
#endif

@end
