// AutoGo - Car Details Screen (Design Image 10)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import MapPlaceholder from '../components/MapPlaceholder';
import type { RootState } from '../types';

const CarDetailsScreen = ({ navigation, route }) => {
  const car = route?.params?.car || {};

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="تفاصيل السيارة" onBack={() => navigation.goBack()} rightIcon="create-outline" onRightPress={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Car visual */}
        <View style={styles.carVisual}>
          <Ionicons name="car-sport" size={100} color={colors.text.primary} />
          <Text style={styles.carName}>{car.brand} {car.model}</Text>
          <View style={styles.plateBadge}>
            <Text style={styles.plateText}>{car.plate}</Text>
          </View>
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {[
            { icon: 'speedometer-outline', label: 'المسافة المقطوعة', value: `${(car.mileage / 1000).toFixed(1)} ألف كم` },
            { icon: 'calendar-outline', label: 'سنة الصنع', value: `${car.year}` },
            { icon: 'construct-outline', label: 'الصيانة القادمة', value: car.nextService > 0 ? `بعد ${car.nextService} كم` : 'متأخرة' },
            { icon: 'shield-checkmark-outline', label: 'الحالة', value: car.status },
          ].map((stat, i) => (
            <Card key={i} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={22} color={colors.accent.primary} />
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </Card>
          ))}
        </View>

        {/* Location */}
        <Text style={styles.sectionTitle}>آخر موقع معروف</Text>
        <MapPlaceholder height={180} label={car.lastLocation?.address || 'لا يوجد موقع محفوظ'} />

        {/* Actions */}
        <View style={styles.actions}>
          <Button title="حجز صيانة" onPress={() => navigation.navigate('Services')} icon="construct-outline" iconPosition="right" style={{ marginBottom: spacing.md }} />
          <Button title="طلب ونش" onPress={() => navigation.navigate('SOS')} variant="danger" icon="warning-outline" iconPosition="right" />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base },
  carVisual: { alignItems: 'center', paddingVertical: spacing.xxl },
  carName: { ...typography.h2, color: colors.text.primary, marginTop: spacing.md },
  plateBadge: { backgroundColor: 'rgba(45,212,191,0.12)', paddingHorizontal: 14, paddingVertical: 4, borderRadius: borderRadius.sm, marginTop: spacing.sm },
  plateText: { ...typography.label, color: colors.accent.primary },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: spacing.lg },
  statCard: { width: '48%', alignItems: 'center', paddingVertical: spacing.lg, marginBottom: spacing.md },
  statLabel: { ...typography.caption, color: colors.text.tertiary, marginTop: spacing.sm },
  statValue: { ...typography.label, color: colors.text.primary, marginTop: 2 },
  sectionTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.md },
  actions: { marginTop: spacing.xl },
});

export default CarDetailsScreen;
