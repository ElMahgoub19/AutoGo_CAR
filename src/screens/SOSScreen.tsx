// AutoGo - SOS / Emergency Screen (Design Images 17-18)
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import MapPlaceholder from '../components/MapPlaceholder';
import Button from '../components/Button';
import type { RootState } from '../types';

const SOSScreen = ({ navigation }) => {
  const { activeCar } = useSelector((state: RootState) => state.garage);
  const [locationSet, setLocationSet] = useState(false);

  const handleSOS = () => {
    navigation.navigate('TowType');
  };

  return (
    <LinearGradient colors={['#1A1A2E', '#0D2B2D', '#0A1F2E']} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="طلب ونش طوارئ" onBack={() => navigation.goBack()} />

      {/* Map area */}
      <View style={styles.mapContainer}>
        <MapPlaceholder height={280} showPin label="حدد موقع العطل بدقة" />
        <TouchableOpacity style={styles.myLocationBtn} onPress={() => setLocationSet(true)}>
          <Ionicons name="navigate" size={22} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      {/* Location info */}
      <Card style={styles.locationCard}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <View style={{ flex: 1 }}>
            <Text style={styles.locationLabel}>موقعك الحالي</Text>
            <Text style={styles.locationAddress}>حي الملقا، طريق الملك فهد، الرياض</Text>
          </View>
          <Ionicons name="location" size={22} color={colors.emergency.primary} />
        </View>
      </Card>

      {/* Active car */}
      {activeCar && (
        <Card style={styles.carBadge}>
          <View style={styles.carRow}>
            <Text style={styles.carText}>{activeCar.brand} {activeCar.model} • {activeCar.plate}</Text>
            <Ionicons name="car-sport" size={20} color={colors.accent.primary} />
          </View>
        </Card>
      )}

      {/* SOS Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.sosButton} activeOpacity={0.8} onPress={handleSOS}>
          <LinearGradient colors={[colors.emergency.primary, '#C53030']} style={styles.sosGradient}>
            <Ionicons name="warning" size={32} color="#FFF" />
            <Text style={styles.sosText}>اطلب ونش الآن</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.sosHint}>سيتم إرسال أقرب ونش متاح لموقعك</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { marginHorizontal: spacing.base, borderRadius: borderRadius.lg, overflow: 'hidden', position: 'relative' },
  myLocationBtn: {
    position: 'absolute', bottom: 12, left: 12,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.background.darkCard, borderWidth: 1, borderColor: colors.accent.primary + '40',
    alignItems: 'center', justifyContent: 'center',
  },
  locationCard: { marginHorizontal: spacing.base, marginTop: spacing.md },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  locationDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.emergency.primary },
  locationLabel: { ...typography.caption, color: colors.text.tertiary, textAlign: 'right' },
  locationAddress: { ...typography.bodySmall, color: colors.text.primary, textAlign: 'right', marginTop: 2 },
  carBadge: { marginHorizontal: spacing.base, marginTop: spacing.sm },
  carRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm },
  carText: { ...typography.bodySmall, color: colors.text.secondary },
  bottomContainer: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: spacing.base, paddingBottom: 40 },
  sosButton: { borderRadius: borderRadius.lg, overflow: 'hidden', ...shadows.card },
  sosGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: spacing.md },
  sosText: { ...typography.h4, color: '#FFF', fontWeight: '800' },
  sosHint: { ...typography.caption, color: colors.text.muted, textAlign: 'center', marginTop: spacing.sm },
});

export default SOSScreen;
