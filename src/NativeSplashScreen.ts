import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface SplashScreenConfig {
  fade?: boolean;
  duration?: number;
  preventFlash?: boolean;
}

export interface Spec extends TurboModule {
  show(): void;
  showWithConfig(config: SplashScreenConfig): void;
  hide(): void;
  hideWithConfig(config: SplashScreenConfig): void;
  releaseMemory(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SplashScreen');
