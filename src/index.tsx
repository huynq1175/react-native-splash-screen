const SplashScreenModule = require('./NativeSplashScreen').default;

const SplashScreen = {
  show() {
    SplashScreenModule.show();
  },

  hide() {
    SplashScreenModule.hide();
  },
};

export default SplashScreen;
