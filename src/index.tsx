import SplashScreenModule from './NativeSplashScreen';
import type { SplashScreenConfig } from './NativeSplashScreen';

export type { SplashScreenConfig };

interface ISplashScreen {
  show(): void;
  show(config: SplashScreenConfig): void;
  hide(): void;
  hide(config: SplashScreenConfig): void;
  releaseMemory(): void;
}

const SplashScreen: ISplashScreen = {
  show(config?: SplashScreenConfig) {
    if (config) {
      SplashScreenModule.showWithConfig(config);
    } else {
      SplashScreenModule.show();
    }
  },

  hide(config?: SplashScreenConfig) {
    if (config) {
      SplashScreenModule.hideWithConfig(config);
    } else {
      SplashScreenModule.hide();
    }
  },

  releaseMemory() {
    SplashScreenModule.releaseMemory();
  },
};

export default SplashScreen;
