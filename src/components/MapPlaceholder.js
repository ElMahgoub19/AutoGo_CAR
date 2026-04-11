// AutoGo - Map Placeholder Component  
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const MapPlaceholder = ({ style, height = 300, showPin = true, label }) => {
  return (
    <View style={[styles.container, { height }, style]}>
      {/* Grid pattern to simulate map */}
      <View style={styles.grid}>
        {Array(12).fill(0).map((_, i) => (
          <View key={`h${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 8}%` }]} />
        ))}
        {Array(8).fill(0).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 12}%` }]} />
        ))}
      </View>

      {/* Map icon */}
      <View style={styles.mapIcon}>
        <Ionicons name="map" size={40} color={colors.accent.primary + '60'} />
      </View>

      {showPin && (
        <View style={styles.pin}>
          <Ionicons name="location" size={36} color={colors.emergency.primary} />
        </View>
      )}

      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D1F2D',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.accent.primary + '10',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.accent.primary + '10',
  },
  mapIcon: {
    opacity: 0.4,
  },
  pin: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default MapPlaceholder;
