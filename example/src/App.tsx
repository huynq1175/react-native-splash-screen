import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import SplashScreen from '@abeman/react-native-splash-screen';

export default function App() {
  const showtimer = useRef<NodeJS.Timeout>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading app data
    const loadAppData = async () => {
      // Simulate network request or heavy computation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);

      // Hide splash screen with smooth transition
      console.log('Splash screen will hide now');
      SplashScreen.hide({
        fade: true,
        duration: 1.0,
        preventFlash: true,
      });
    };

    loadAppData();

    return () => {
      if (showtimer.current) {
        clearTimeout(showtimer.current);
      }
    };
  }, []);

  const showSplashDefault = () => {
    SplashScreen.show();
    showtimer.current = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  };

  const showSplashWithConfig = () => {
    SplashScreen.show({
      duration: 1.0,
      preventFlash: true,
    });
    showtimer.current = setTimeout(() => {
      SplashScreen.hide({
        fade: true,
        duration: 0.8,
      });
    }, 2000);
  };

  const showSplashNoFade = () => {
    SplashScreen.show();
    showtimer.current = setTimeout(() => {
      SplashScreen.hide({
        fade: false,
      });
    }, 2000);
  };

  const hideSplashImmediately = () => {
    if (showtimer.current) {
      clearTimeout(showtimer.current);
    }
    SplashScreen.hide();
  };

  const releaseMemory = () => {
    SplashScreen.releaseMemory();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>React Native Splash Screen</Text>
        <Text style={styles.subtitle}>Performance Optimized Demo</Text>

        {isLoading && (
          <Text style={styles.loadingText}>Loading app data...</Text>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Controls</Text>
          <Button title="Show Splash (Default)" onPress={showSplashDefault} />
          <View style={styles.spacer} />
          <Button title="Hide Immediately" onPress={hideSplashImmediately} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smooth Transitions</Text>
          <Button
            title="Show with Fade Effect"
            onPress={showSplashWithConfig}
          />
          <View style={styles.spacer} />
          <Button title="Show without Fade" onPress={showSplashNoFade} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Memory Management</Text>
          <Button title="Release Memory" onPress={releaseMemory} />
          <Text style={styles.hint}>Releases cached images and resources</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features:</Text>
          <Text style={styles.feature}>✓ Prevents white flash on startup</Text>
          <Text style={styles.feature}>✓ Smooth fade transitions</Text>
          <Text style={styles.feature}>✓ Memory optimization</Text>
          <Text style={styles.feature}>✓ Configurable duration</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 16,
  },
  section: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  spacer: {
    height: 12,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
  feature: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    paddingLeft: 8,
  },
});
