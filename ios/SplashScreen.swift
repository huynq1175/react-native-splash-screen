import Foundation
import UIKit
import React

@objc(RNSplashScreen)
@objcMembers
public class SplashScreen: NSObject {
    private static var waiting = true
    private static var addedJsLoadErrorObserver = false
    private static var splashViewController: UIViewController?
    
    override init() {
        super.init()
        SplashScreen.setupObservers()
    }
    
    @objc
    public static func moduleName() -> String {
        return "SplashScreen"
    }
    
    @objc
    public static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    private static func setupObservers() {
        if !addedJsLoadErrorObserver {
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(jsLoadError(_:)),
                name: NSNotification.Name("RCTJavaScriptDidFailToLoadNotification"),
                object: nil
            )
            addedJsLoadErrorObserver = true
        }
    }
    
    @objc
    public static func show() {
        showWithConfig([:])
    }
    
    @objc
    public static func showWithConfig(_ config: [String: Any]) {
        DispatchQueue.main.async {
            guard splashViewController == nil else { return }
            
            let storyboard = UIStoryboard(name: "LaunchScreen", bundle: nil)
            splashViewController = storyboard.instantiateInitialViewController()
            
            if let window = UIApplication.shared.delegate?.window,
               let splashView = splashViewController?.view {
                // Prevent white flash by matching window background
                let preventFlash = config["preventFlash"] as? Bool ?? true
                if preventFlash {
                    window?.backgroundColor = splashView.backgroundColor ?? UIColor.systemBackground
                }
                
                window?.addSubview(splashView)
                splashView.frame = window?.bounds ?? .zero
                
                // Ensure splash view is on top
                window?.bringSubviewToFront(splashView)
            }
        }
    }
    
    @objc
    public static func hide() {
        hideWithConfig([:])
    }
    
    @objc
    public static func hideWithConfig(_ config: [String: Any]) {
        DispatchQueue.main.async {
            guard let viewController = splashViewController else { return }
            
            let fade = config["fade"] as? Bool ?? true
            let duration = config["duration"] as? Double ?? 0.3
            
            if fade {
                UIView.transition(
                    with: viewController.view,
                    duration: duration,
                    options: .transitionCrossDissolve,
                    animations: {
                        viewController.view.alpha = 0.0
                    },
                    completion: { finished in
                        viewController.view.removeFromSuperview()
                        splashViewController = nil
                        releaseMemory()
                    }
                )
            } else {
                viewController.view.removeFromSuperview()
                splashViewController = nil
                releaseMemory()
            }
        }
    }
    
    @objc
    private static func jsLoadError(_ notification: Notification) {
        // If there was an error loading javascript, hide the splash screen so it can be shown.
        // Otherwise the splash screen will remain forever, which is a hassle to debug.
        hide()
    }
    
    
    @objc
    public static func releaseMemory() {
        DispatchQueue.main.async {
            // Clear cached images
            if let launchImages = Bundle.main.infoDictionary?["UILaunchImages"] as? [[String: Any]] {
                for imageInfo in launchImages {
                    if let imageName = imageInfo["UILaunchImageName"] as? String {
                        UIImage(named: imageName)?.accessibilityIdentifier = nil
                    }
                }
            }
            
            // Clear any strong references
            splashViewController = nil
            
            // Force memory cleanup
            autoreleasepool {
                // This helps release autorelease objects
                RunLoop.current.run(until: Date())
            }
        }
    }
}

// MARK: - React Native Module Methods
extension SplashScreen: RCTBridgeModule {
    @objc
    public func show() {
        SplashScreen.show()
    }
    
    @objc
    public func showWithConfig(_ config: [String: Any]) {
        SplashScreen.showWithConfig(config)
    }
    
    @objc
    public func hide() {
        SplashScreen.hide()
    }
    
    @objc
    public func hideWithConfig(_ config: [String: Any]) {
        SplashScreen.hideWithConfig(config)
    }
    
    
    @objc
    public func releaseMemory() {
        SplashScreen.releaseMemory()
    }
}
