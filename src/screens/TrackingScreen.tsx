// AutoGo - Tracking Screen (Design Image 30) - Integrated with Maps
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Card from '../components/Card';
import { mockDriver, mockWorkshops } from '../data/mockData';
import type { RootState, RootStackScreenProps, Workshop } from '../types';

const API_KEY = "YOUR_API_KEY"; 

// حساب المسافة بخوارزمية Haversine
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // نصف قطر الأرض بالكيلومتر
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // المسافة بالكيلومتر
}

function getNearestWorkshop(userLocation: { latitude: number; longitude: number }, workshops: Workshop[]): Workshop | null {
  let nearest: Workshop | null = null;
  let minDistance = Infinity;

  workshops.forEach((workshop) => {
    if (!workshop.location) return;
    const distance = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      workshop.location.lat,
      workshop.location.lng
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = workshop;
    }
  });

  return nearest;
}

// ستايل دارك للخريطة عشان يطابق ديزاين التطبيق
const mapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#1A2222" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#8ec3b9" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1a3646" }] },
  { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b6878" }] },
  { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#64779e" }] },
  { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b6878" }] },
  { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "color": "#334e87" }] },
  { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#023e58" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#283d6a" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#6f9ba5" }] },
  { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] },
  { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#023e58" }] },
  { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#3C7680" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304a7d" }] },
  { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#98a5be" }] },
  { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#2c6675" }] },
  { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#255763" }] },
  { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#b0d5ce" }] },
  { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#023e58" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0e1626" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#4e6d70" }] }
];

const TrackingScreen = ({ navigation }: RootStackScreenProps<'Tracking'>) => {
  const { trackingData } = useSelector((state: RootState) => state.orders);
  const driver = mockDriver;

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [nearestWorkshop, setNearestWorkshop] = useState<Workshop | null>(null);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [driverLocation, setDriverLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError("تم رفض صلاحية الوصول للموقع. سيتم استخدام موقع افتراضي للتجربة.");
        // نقطة افتراضية لو الموبايل معاند (أو ايميليتور)
        const fakeLocation = { latitude: 30.0444, longitude: 31.2357 };
        setupMapData(fakeLocation);
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({});
        setupMapData({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      } catch (error) {
        // Fallback in case of emulator timeout
        const fakeLocation = { latitude: 30.0444, longitude: 31.2357 };
        setupMapData(fakeLocation);
      }
    })();
  }, []);

  const setupMapData = (userLoc: { latitude: number, longitude: number }) => {
    setLocation(userLoc);
    const nearest = getNearestWorkshop(userLoc, mockWorkshops);
    setNearestWorkshop(nearest);

    // Initial position for the simulated driver (starts at the workshop)
    if (nearest?.location) {
  setDriverLocation({
    latitude: nearest.location.lat + 0.015,
    longitude: nearest.location.lng + 0.015,
  });
}
  };

  // جلب مسار الطريق
  useEffect(() => {
    if (location && nearestWorkshop?.location && API_KEY !== "YOUR_API_KEY") {
      const getRoute = async () => {
        try {
          const res = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?start=${location.longitude},${location.latitude}&end=${nearestWorkshop.location.lng},${nearestWorkshop.location.lat}`,
            {
              method: 'GET',
              headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json, application/geo+json'
              }
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data?.features?.[0]?.geometry?.coordinates) {
              const coords = data.features[0].geometry.coordinates;
              setRouteCoords(coords.map((c: [number, number]) => ({
                latitude: c[1],
                longitude: c[0],
              })));
            }
          }
        } catch (e) {
          console.warn("Error Route fetch: ", e);
        }
      };
      getRoute();
    }
  }, [location?.latitude, location?.longitude, nearestWorkshop?.id]);

  // تحريك الـ Driver للمحاكاة
  useEffect(() => {
    if (!driverLocation || !location) return;
    const simulationInterval = setInterval(() => {
      setDriverLocation((prev) => {
        if (!prev || !location) return prev;
        
        // حساب زحف الونش ناحية المستخدم (خطوات بسيطة)
        const latStep = (location.latitude - prev.latitude) * 0.05;
        const lngStep = (location.longitude - prev.longitude) * 0.05;

        // مبيتحركش لو قرب جداً (عشان ميفضلش يتهز)
        if (Math.abs(latStep) < 0.00001 && Math.abs(lngStep) < 0.00001) {
          return prev;
        }

        return {
          latitude: prev.latitude + latStep,
          longitude: prev.longitude + lngStep,
        };
      });
    }, 2000);

    return () => clearInterval(simulationInterval);
  }, [driverLocation === null, location?.latitude]);

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Map */}
      <View style={styles.mapSection}>
        {!location ? (
          <View style={[styles.mapPlaceholder, { height: 350 }]}>
            <ActivityIndicator size="large" color={colors.accent.primary} />
            <Text style={{ color: '#fff', marginTop: 10 }}>جاري تحديد الموقع...</Text>
          </View>
        ) : (
          <MapView
            style={{ width: '100%', height: 350 }}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.08,
              longitudeDelta: 0.08,
            }}
          >
            {/* User */}
            <Marker coordinate={location} title="موقعك" pinColor={colors.status.info} />
            
            {/* Nearest Workshop */}
            {nearestWorkshop?.location && (
              <Marker
                coordinate={{ latitude: nearestWorkshop.location.lat, longitude: nearestWorkshop.location.lng }}
                title={nearestWorkshop.name}
                description="أقرب ورشة"
                pinColor={colors.status.success}
              />
            )}
            
            {/* Driver */}
            {driverLocation && (
              <Marker coordinate={driverLocation} title="الونش" pinColor={colors.status.error} />
            )}

            {/* Route */}
            {routeCoords.length > 0 && (
              <Polyline
                coordinates={routeCoords}
                strokeColor={colors.accent.primary}
                strokeWidth={4}
              />
            )}
          </MapView>
        )}

        {/* ETA badge */}
        <View style={styles.etaBadge}>
          <LinearGradient colors={['#0D3B3A', '#0A2525']} style={styles.etaGradient}>
            <View style={styles.etaIcon}>
              <Ionicons name="time" size={22} color={colors.accent.primary} />
            </View>
            <View>
              <Text style={styles.etaTitle}>يصل خلال {trackingData?.eta || 0} دقائق</Text>
              <Text style={styles.etaSub}>المسافة المتبقية: {trackingData?.distance || 0} كم</Text>
            </View>
          </LinearGradient>
        </View>
        
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topIcon}>
            <Ionicons name="chevron-forward" size={22} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>بث مباشر</Text>
          </View>
          <TouchableOpacity style={styles.topIcon}>
            <Ionicons name="information-circle-outline" size={22} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Driver card */}
        <View style={styles.driverCard}>
          <View style={styles.driverRow}>
            <View style={styles.driverActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Chat')}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.accent.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Call')}>
                <Ionicons name="call-outline" size={20} color={colors.accent.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingText}>({driver.reviewCount} تقييم) {driver.rating}</Text>
                <Ionicons name="star" size={14} color={colors.rating.gold} />
              </View>
            </View>
            <View style={styles.driverAvatar}>
              <Ionicons name="person" size={30} color={colors.text.secondary} />
            </View>
          </View>
        </View>

        {/* Vehicle info */}
        <Card style={styles.vehicleCard}>
          <View style={styles.vehicleRow}>
            <Text style={styles.vehicleLabel}>نوع الونش ولوحة المركبة</Text>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleText}>{driver.towType} • {driver.plate}</Text>
              <View style={styles.vehicleIcon}>
                <Ionicons name="car" size={22} color={colors.accent.primary} />
              </View>
            </View>
          </View>
        </Card>

        {/* Progress timeline */}
        <Card style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>تطور حالة الطلب</Text>
          {trackingData?.steps?.map((step: any, idx: number) => (
            <View key={idx} style={styles.timelineStep}>
              <View style={styles.timelineLeft}>
                {idx < (trackingData?.steps?.length || 0) - 1 && (
                  <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />
                )}
                <View style={[
                  styles.timelineDot,
                  step.done && styles.timelineDotDone,
                  step.active && styles.timelineDotActive,
                ]}>
                  {step.done && <Ionicons name="checkmark" size={12} color="#FFF" />}
                </View>
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.stepLabel, step.active && styles.stepLabelActive]}>{step.label}</Text>
                {step.time && <Text style={styles.stepTime}>{step.time}</Text>}
              </View>
            </View>
          ))}
        </Card>

        {/* Cancel link */}
        <TouchableOpacity style={styles.cancelLink}>
          <Text style={styles.cancelText}>إلغاء الطلب</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapSection: { position: 'relative' },
  mapPlaceholder: { backgroundColor: colors.background.primary, justifyContent: 'center', alignItems: 'center' },
  topBar: {
    position: 'absolute', top: 50, left: spacing.base, right: spacing.base,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  topIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center',
  },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.status.success },
  liveText: { ...typography.labelSmall, color: colors.text.primary },
  etaBadge: {
    position: 'absolute', bottom: 16, left: spacing.base, right: spacing.base,
    borderRadius: borderRadius.lg, overflow: 'hidden',
  },
  etaGradient: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: spacing.base, gap: spacing.md,
  },
  etaIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(45,212,191,0.15)', alignItems: 'center', justifyContent: 'center',
  },
  etaTitle: { ...typography.h4, color: colors.text.primary },
  etaSub: { ...typography.bodySmall, color: colors.text.secondary, marginTop: 2 },
  content: { paddingHorizontal: spacing.base, paddingTop: spacing.lg },
  driverCard: { marginBottom: spacing.md },
  driverRow: { flexDirection: 'row', alignItems: 'center' },
  driverAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 2, borderColor: colors.accent.primary + '40',
    alignItems: 'center', justifyContent: 'center',
  },
  driverInfo: { flex: 1, alignItems: 'flex-end', marginRight: spacing.md },
  driverName: { ...typography.h4, color: colors.text.primary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  ratingText: { ...typography.bodySmall, color: colors.text.secondary },
  driverActions: { flexDirection: 'row', gap: spacing.sm },
  actionBtn: {
    width: 44, height: 44, borderRadius: borderRadius.md,
    backgroundColor: colors.background.card, borderWidth: 1, borderColor: colors.background.cardBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  vehicleCard: { marginBottom: spacing.md },
  vehicleRow: { alignItems: 'flex-end' },
  vehicleLabel: { ...typography.caption, color: colors.text.tertiary, marginBottom: spacing.sm },
  vehicleInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  vehicleText: { ...typography.label, color: colors.text.primary },
  vehicleIcon: {
    width: 40, height: 40, borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(45,212,191,0.12)', alignItems: 'center', justifyContent: 'center',
  },
  timelineCard: { marginBottom: spacing.lg },
  timelineTitle: { ...typography.label, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.lg },
  timelineStep: { flexDirection: 'row', marginBottom: spacing.lg, alignItems: 'flex-start' },
  timelineLeft: { width: 30, alignItems: 'center', position: 'relative' },
  timelineLine: {
    position: 'absolute', top: 22, width: 2, height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  timelineLineDone: { backgroundColor: colors.accent.primary },
  timelineDot: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  timelineDotDone: { backgroundColor: colors.accent.primary, borderColor: colors.accent.primary },
  timelineDotActive: { borderColor: colors.accent.primary, backgroundColor: 'rgba(45,212,191,0.3)' },
  timelineContent: { flex: 1, marginLeft: spacing.md, alignItems: 'flex-end' },
  stepLabel: { ...typography.label, color: colors.text.secondary },
  stepLabelActive: { color: colors.accent.primary, fontWeight: '700' },
  stepTime: { ...typography.caption, color: colors.text.muted, marginTop: 2 },
  cancelLink: { alignItems: 'center', paddingVertical: spacing.md },
  cancelText: { ...typography.label, color: colors.text.muted },
});

export default TrackingScreen;
