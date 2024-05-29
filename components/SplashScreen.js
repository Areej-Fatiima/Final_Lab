import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient
      colors={['#FFDEE9', 'black']}
      style={styles.container}
    >
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/c1/b6/1b/c1b61b9bc0e83e91e0ef5ab298007163.jpg' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Chatter Craft</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default SplashScreen;