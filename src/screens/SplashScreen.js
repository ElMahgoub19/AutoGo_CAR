// AutoGo - Splash Screen (Design Image 01)
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
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
        {/* Logo placeholder - gear with car */}
        <View style={styles.gearOuter}>
          <View style={styles.gearInner}>
            <Ionicons name="car-sport" size={60} color={colors.text.primary} />
            <View style={styles.bolt}>
              <Ionicons name="flash" size={20} color="#F6AD55" />
            </View>
          </View>
          {/* Gear teeth */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <View key={i} style={[styles.gearTooth, { transform: [{ rotate: `${angle}deg` }, { translateY: -65 }] }]} />
          ))}
        </View>
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
  gearOuter: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearTooth: {
    position: 'absolute',
    width: 18,
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 3,
    top: '50%',
    left: '50%',
    marginLeft: -9,
    marginTop: -9,
  },
  bolt: { position: 'absolute', bottom: 25, right: 30 },
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
