import { StyleSheet, View, Text, Button } from 'react-native';
import { useEffect, useRef } from 'react';
import SplashScreen from '@nucleus/react-native-splash-screen';

export default function App() {
  const showtimer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const showSplash = async () => {
    SplashScreen.show();
    showtimer.current = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text>Result: {''}</Text>
      <Button title={'Show'} onPress={showSplash} />
      <Button title={'Hide'} onPress={() => SplashScreen.hide()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
