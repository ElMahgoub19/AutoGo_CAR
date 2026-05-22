// AutoGo - Map Placeholder Component  
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import type { MapPlaceholderProps } from '../types';

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ style, height = 300, showPin = true, label, region }) => {
  // Mock location if not provided
  const initialRegion = region ? {
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: region.latitudeDelta || 0.05,
    longitudeDelta: region.longitudeDelta || 0.05,
  } : {
    latitude: 24.7136, // Riyadh
    longitude: 46.6753,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const mapCustomStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#0D1F2D" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#8ec3b9" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#1a3646" }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#4b6878" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#1b3542" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#254555" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#06131c" }]
    }
  ];

  return (
    <View style={[styles.container, { height }, style]}>
      {Platform.OS === 'web' ? (
        <View style={styles.grid}>
          {Array(12).fill(0).map((_, i) => (
            <View key={`h${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 8}%` }]} />
          ))}
          {Array(8).fill(0).map((_, i) => (
            <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 12}%` }]} />
          ))}
          <Ionicons name="map" size={40} color={colors.accent.primary + '60'} style={{ alignSelf: 'center', marginTop: '30%' }} />
        </View>
      ) : (
        <MapView
          provider={PROVIDER_DEFAULT}
          style={StyleSheet.absoluteFillObject}
          initialRegion={initialRegion}
          customMapStyle={mapCustomStyle}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          scrollEnabled={true}
          zoomEnabled={true}
        >
          {showPin && (
            <Marker coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}>
              <View style={styles.markerContainer}>
                <View style={styles.markerPulse} />
                <View style={styles.markerDot}>
                  <Ionicons name="car" size={16} color="#FFF" />
                </View>
              </View>
            </Marker>
          )}
        </MapView>
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
    top: 12,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent.primary + '40',
  },
  markerDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.emergency.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MapPlaceholder;
