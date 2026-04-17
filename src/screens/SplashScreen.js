// AutoGo - Splash Screen (Design Image 01)
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const SplashScreen = ({ navigation }) => {
  const logoScale = new Animated.Value(0.5);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#0A2525', '#0D3B3A', '#0A2020']} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.imageLogo} 
          resizeMode="contain" 
        />
      </Animated.View>

      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.title}>AUTOGO</Text>
        <Text style={styles.subtitle}>S M A R T   C A R   C A R E</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  imageLogo: {
    width: 240,
    height: 240,
  },
  textContainer: { alignItems: 'center' },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 6,
  },
  subtitle: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
    letterSpacing: 4,
  },
});

export default SplashScreen;
