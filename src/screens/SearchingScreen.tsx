// AutoGo - Searching Screen (Design Image 21)
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import type { RootState } from '../types';

const SearchingScreen = ({ navigation, route }) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse1 = useRef(new Animated.Value(0.5)).current;
  const pulse2 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.timing(rotation, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true })
    ).start();

    // Pulse animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulse1, { toValue: 0.5, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse2, { toValue: 0.8, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulse2, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Auto-navigate after 4 seconds (simulate driver found)
    const timer = setTimeout(() => {
      navigation.replace('Tracking');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <LinearGradient colors={['#0A1520', '#0D2B2D', '#0A1F2E']} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={styles.content}>
        {/* Animated search rings */}
        <View style={styles.searchContainer}>
          <Animated.View style={[styles.ring, styles.outerRing, { opacity: pulse2, transform: [{ scale: pulse2 }] }]} />
          <Animated.View style={[styles.ring, styles.middleRing, { opacity: pulse1, transform: [{ scale: pulse1 }] }]} />
          <Animated.View style={[styles.ring, styles.innerRing, { transform: [{ rotate: spin }] }]}>
            <View style={styles.dot} />
          </Animated.View>
          <View style={styles.centerIcon}>
            <Ionicons name="car" size={40} color={colors.accent.primary} />
          </View>
        </View>

        <Text style={styles.title}>جارٍ البحث عن أقرب ونش...</Text>
        <Text style={styles.subtitle}>نبحث عن أفضل سائق بالقرب منك.{'\n'}قد يستغرق ذلك بعض الوقت.</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="car" size={20} color={colors.accent.primary} />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>ونش قريب</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="time" size={20} color={colors.accent.primary} />
            <Text style={styles.statValue}>~5 دقائق</Text>
            <Text style={styles.statLabel}>وقت تقديري</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Button title="إلغاء الطلب" onPress={() => navigation.goBack()} variant="danger" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  searchContainer: { width: 250, height: 250, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxl },
  ring: { position: 'absolute', borderRadius: 999, borderWidth: 1 },
  outerRing: { width: 250, height: 250, borderColor: 'rgba(45,212,191,0.1)' },
  middleRing: { width: 180, height: 180, borderColor: 'rgba(45,212,191,0.2)' },
  innerRing: {
    width: 120, height: 120, borderColor: colors.accent.primary, borderWidth: 2,
    borderStyle: 'dashed', borderRadius: 60,
  },
  dot: {
    width: 12, height: 12, borderRadius: 6, backgroundColor: colors.accent.primary,
    position: 'absolute', top: -6, left: '50%', marginLeft: -6,
  },
  centerIcon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center',
    position: 'absolute',
  },
  title: { ...typography.h3, color: colors.text.primary, textAlign: 'center', marginBottom: spacing.md },
  subtitle: { ...typography.body, color: colors.text.secondary, textAlign: 'center', lineHeight: 24 },
  statsRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    marginTop: spacing.xxl, gap: spacing.xxl,
  },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { ...typography.h4, color: colors.text.primary },
  statLabel: { ...typography.caption, color: colors.text.tertiary },
  statDivider: { width: 1, height: 40, backgroundColor: colors.divider },
  bottomContainer: { paddingHorizontal: spacing.xl, paddingBottom: 40 },
});

export default SearchingScreen;
