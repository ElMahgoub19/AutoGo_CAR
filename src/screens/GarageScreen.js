// AutoGo - Garage Screen (Design Images 08, 06)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Card from '../components/Card';
import Button from '../components/Button';

const GarageScreen = ({ navigation }) => {
  const { cars } = useSelector(state => state.garage);

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>جراجي</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddCar')} style={styles.addButton}>
            <Ionicons name="add" size={24} color={colors.accent.primary} />
          </TouchableOpacity>
        </View>

        {cars.length === 0 ? (
          /* Empty state */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="car-outline" size={80} color={colors.text.tertiary} />
            </View>
            <Text style={styles.emptyTitle}>جراجك فارغ</Text>
            <Text style={styles.emptySubtitle}>
              أضف سيارتك الأولى للاستفادة من خدمات{'\n'}الصيانة والتتبع الذكي
            </Text>
            <Button
              title="إضافة سيارة جديدة"
              onPress={() => navigation.navigate('AddCar')}
              icon="add-circle-outline"
              iconPosition="right"
              style={{ marginTop: spacing.xl, width: '80%' }}
            />
          </View>
        ) : (
          /* Cars list */
          cars.map((car, index) => (
            <Card
              key={car.id}
              style={styles.carCard}
              onPress={() => navigation.navigate('CarDetails', { car })}
            >
              <View style={styles.carHeader}>
                <View style={[
                  styles.statusBadge,
                  car.status === 'نشط' ? styles.activeBadge : styles.warningBadge,
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: car.status === 'نشط' ? colors.status.success : colors.status.warning },
                  ]}>
                    {car.status}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.carContent}>
                <View style={styles.carImageBox}>
                  <Ionicons name="car-sport" size={55} color={colors.text.primary} />
                </View>
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{car.brand} {car.model}</Text>
                  <View style={styles.plateBadge}>
                    <Text style={styles.plateText}>{car.plate}</Text>
                  </View>
                  <Text style={styles.carYear}>موديل {car.year}</Text>
                </View>
              </View>

              <View style={styles.carStats}>
                <View style={styles.statItem}>
                  <Ionicons name="speedometer-outline" size={16} color={colors.text.tertiary} />
                  <Text style={styles.statLabel}>المسافة</Text>
                  <Text style={styles.statValue}>{(car.mileage / 1000).toFixed(1)} ألف كم</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Ionicons name="construct-outline" size={16} color={
                    car.nextService > 0 ? colors.status.success : colors.emergency.primary
                  } />
                  <Text style={styles.statLabel}>الصيانة القادمة</Text>
                  <Text style={[styles.statValue, {
                    color: car.nextService > 0 ? colors.text.primary : colors.emergency.primary,
                  }]}>
                    {car.nextService > 0 ? `بعد ${car.nextService} كم` : 'متأخرة!'}
                  </Text>
                </View>
              </View>
            </Card>
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.base },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: spacing.lg,
  },
  headerTitle: { ...typography.h2, color: colors.text.primary },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45, 212, 191, 0.12)',
    borderWidth: 1,
    borderColor: colors.accent.primary + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.06)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: { ...typography.h3, color: colors.text.primary, marginBottom: spacing.sm },
  emptySubtitle: { ...typography.body, color: colors.text.secondary, textAlign: 'center', lineHeight: 24 },
  carCard: { marginBottom: spacing.base },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: borderRadius.sm },
  activeBadge: { backgroundColor: 'rgba(56, 161, 105, 0.15)' },
  warningBadge: { backgroundColor: 'rgba(214, 158, 46, 0.15)' },
  statusText: { ...typography.caption, fontWeight: '600' },
  carContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  carImageBox: {
    width: 90,
    height: 65,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.base,
  },
  carInfo: { flex: 1, alignItems: 'flex-end' },
  carName: { ...typography.h4, color: colors.text.primary },
  plateBadge: {
    backgroundColor: 'rgba(45, 212, 191, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  plateText: { ...typography.bodySmall, color: colors.accent.primary },
  carYear: { ...typography.caption, color: colors.text.tertiary, marginTop: 4 },
  carStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: spacing.md,
  },
  statItem: { alignItems: 'center', gap: 2 },
  statLabel: { ...typography.caption, color: colors.text.tertiary },
  statValue: { ...typography.labelSmall, color: colors.text.primary },
  statDivider: { width: 1, backgroundColor: colors.divider },
});

export default GarageScreen;
