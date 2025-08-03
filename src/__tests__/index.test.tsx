import SplashScreen from '../index';

// Mock the native module
jest.mock('../NativeSplashScreen', () => ({
  __esModule: true,
  default: {
    show: jest.fn(),
    showWithConfig: jest.fn(),
    hide: jest.fn(),
    hideWithConfig: jest.fn(),
    releaseMemory: jest.fn(),
  },
}));

// Get the mocked module
const mockNativeSplashScreen = jest.requireMock(
  '../NativeSplashScreen'
).default;

describe('SplashScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('show', () => {
    it('should call native show method without config', () => {
      SplashScreen.show();

      expect(mockNativeSplashScreen.show).toHaveBeenCalledTimes(1);
      expect(mockNativeSplashScreen.showWithConfig).not.toHaveBeenCalled();
    });

    it('should call native showWithConfig method with config', () => {
      const config = { preventFlash: true };
      SplashScreen.show(config);

      expect(mockNativeSplashScreen.showWithConfig).toHaveBeenCalledWith(
        config
      );
      expect(mockNativeSplashScreen.show).not.toHaveBeenCalled();
    });

    it('should call showWithConfig with all config options', () => {
      const config = {
        preventFlash: true,
        fade: true,
        duration: 0.5,
      };
      SplashScreen.show(config);

      expect(mockNativeSplashScreen.showWithConfig).toHaveBeenCalledWith(
        config
      );
    });
  });

  describe('hide', () => {
    it('should call native hide method without config', () => {
      SplashScreen.hide();

      expect(mockNativeSplashScreen.hide).toHaveBeenCalledTimes(1);
      expect(mockNativeSplashScreen.hideWithConfig).not.toHaveBeenCalled();
    });

    it('should call native hideWithConfig method with config', () => {
      const config = { fade: true, duration: 0.3 };
      SplashScreen.hide(config);

      expect(mockNativeSplashScreen.hideWithConfig).toHaveBeenCalledWith(
        config
      );
      expect(mockNativeSplashScreen.hide).not.toHaveBeenCalled();
    });

    it('should call hideWithConfig with all config options', () => {
      const config = {
        fade: false,
        duration: 1.0,
        preventFlash: true,
      };
      SplashScreen.hide(config);

      expect(mockNativeSplashScreen.hideWithConfig).toHaveBeenCalledWith(
        config
      );
    });
  });

  describe('releaseMemory', () => {
    it('should call native releaseMemory method', () => {
      SplashScreen.releaseMemory();

      expect(mockNativeSplashScreen.releaseMemory).toHaveBeenCalledTimes(1);
    });
  });

  describe('type exports', () => {
    it('should export SplashScreenConfig type', () => {
      // This is a type test, it will fail at compile time if the type is not exported
      const config: import('../index').SplashScreenConfig = {
        fade: true,
        duration: 0.5,
        preventFlash: true,
      };

      expect(config).toBeDefined();
    });
  });
});
