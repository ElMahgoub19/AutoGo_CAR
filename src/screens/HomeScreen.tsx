// AutoGo - Home Screen (Design Image 07)
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchCars } from '../store/slices/garageSlice';
import { fetchActiveOrders } from '../store/slices/ordersSlice';
import { fetchProfile } from '../store/slices/authSlice';
import type { RootState } from '../types';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { activeCar, cars } = useSelector((state: RootState) => state.garage);
  const { activeOrders } = useSelector((state: RootState) => state.orders);

  // Safe user formatting
  const firstName = user?.name ? user.name.split(' ')[0] : 'ضيف';
  const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'M'}&background=2DD4BF&color=fff&size=256`;

  // NOTE: API fetching disabled to preserve professional mock data.
  // Re-enable when backend has full production data.
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(fetchCars());
  //     dispatch(fetchActiveOrders());
  //     dispatch(fetchProfile());
  //   }
  // }, [isAuthenticated]);

  // SOS Pulse Animation
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true })
      ])
    ).start();
  }, [pulseAnim]);

  const services = [
    { id: '1', icon: 'build', label: 'صيانة دورية', screen: 'Services' },
    { id: '2', icon: 'water', label: 'غسيل ذكي', screen: 'Services' },
    { id: '3', icon: 'battery-charging', label: 'فحص البطارية', screen: 'Services' },
    { id: '4', icon: 'disc', label: 'الإطارات', screen: 'Services' },
    { id: '5', icon: 'construct', label: 'كهرباء', screen: 'Services' },
    { id: '6', icon: 'speedometer', label: 'فحص شامل', screen: 'Services' },
  ];

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Premium Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notifButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text.primary} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.userInfoStack} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfileTab' as any)}
          >
            <View style={styles.headerRight}>
              <Text style={styles.greeting}>أهلاً، {firstName} 👋</Text>
              <Text style={styles.greetingSub}>كيف حال سيارتك اليوم؟</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: userAvatar }} 
                style={styles.avatar} 
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Active car card */}
        {activeCar ? (
          <Card style={styles.carCard} onPress={() => navigation.navigate('CarDetails', { car: activeCar })}>
            <View style={styles.carCardContent}>
              <View style={styles.carInfo}>
                <View style={styles.carImagePlaceholder}>
                  <Ionicons name="car-sport" size={50} color={colors.text.primary} />
                </View>
              </View>
              <View style={styles.carDetails}>
                <Text style={styles.carName}>{activeCar.brand} {activeCar.model}</Text>
                <Text style={styles.carPlate}>{activeCar.plate}</Text>
                <View style={styles.carStats}>
                  <View style={styles.carStat}>
                    <Ionicons name="speedometer-outline" size={14} color={colors.text.tertiary} />
                    <Text style={styles.carStatText}>{(activeCar.mileage / 1000).toFixed(1)} ألف كم</Text>
                  </View>
                  <View style={styles.carStat}>
                    <Ionicons name="calendar-outline" size={14} color={colors.text.tertiary} />
                    <Text style={styles.carStatText}>{activeCar?.year || '-'}</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Reminder banner */}
            {activeCar.reminders?.length > 0 && (
              <View style={styles.reminderBanner}>
                <Ionicons name="alert-circle" size={16} color={colors.emergency.primary} />
                <Text style={styles.reminderText}>{activeCar.reminders[0].message}</Text>
              </View>
            )}
          </Card>
        ) : (
          <Card style={styles.emptyCarCard} onPress={() => navigation.navigate('AddCar')}>
            <Ionicons name="add-circle-outline" size={48} color={colors.accent.primary} />
            <Text style={styles.emptyCarText}>أضف سيارتك الأولى</Text>
          </Card>
        )}

        {/* Animated SOS Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.sosButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SOS')}
          >
            <LinearGradient
              colors={[colors.emergency.primary, '#9B1C1C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sosGradient}
            >
              <View style={styles.sosContent}>
                <View>
                  <Text style={styles.sosTitle}>🚨 طوارئ - طلب ونش</Text>
                  <Text style={styles.sosSub}>سيارتك عطلانة؟ اطلب المساعدة فوراً</Text>
                </View>
                <View style={styles.sosIconContainer}>
                  <Ionicons name="warning" size={28} color="#FFF" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Services grid */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity onPress={() => navigation.navigate('Services')}>
            <Text style={styles.seeAll}>عرض الكل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>الخدمات الذكية</Text>
        </View>

        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(service.screen)}
            >
              <View style={styles.serviceIcon}>
                <Ionicons name={service.icon as any} size={24} color={colors.accent.primary} />
              </View>
              <Text style={styles.serviceLabel}>{service.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active orders */}
        {activeOrders.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <TouchableOpacity onPress={() => navigation.navigate('ActiveOrders')}>
                <Text style={styles.seeAll}>عرض الكل</Text>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>طلبات نشطة</Text>
            </View>

            {activeOrders.slice(0, 2).map((order) => (
              <Card key={order.id} style={styles.orderCard} onPress={() => navigation.navigate('OrderStatus', { order })}>
                <View style={styles.orderRow}>
                  <View style={[styles.orderStatusBadge, { backgroundColor: order.statusColor + '20' }]}>
                    <Text style={[styles.orderStatusText, { color: order.statusColor }]}>
                      {order.status}
                    </Text>
                  </View>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderTitle}>{order.title}</Text>
                    <Text style={styles.orderId}>رقم الطلب: #{order.id}</Text>
                  </View>
                  <View style={styles.orderIcon}>
                    <Ionicons name={order.icon === 'truck' ? 'car' : 'construct' as any} size={22} color={colors.accent.primary} />
                  </View>
                </View>
              </Card>
            ))}
          </>
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
  userInfoStack: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  headerRight: { 
    alignItems: 'flex-end', 
    marginRight: spacing.sm 
  },
  greeting: { ...typography.h3, color: colors.text.primary, fontWeight: '700' },
  greetingSub: { ...typography.bodySmall, color: colors.accent.primary, marginTop: 2, opacity: 0.9 },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    overflow: 'hidden',
    ...shadows.glow,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emergency.primary,
  },
  carCard: { marginBottom: spacing.base },
  carCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carInfo: { marginLeft: spacing.base },
  carImagePlaceholder: {
    width: 80,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carDetails: { flex: 1, alignItems: 'flex-end' },
  carName: { ...typography.h4, color: colors.text.primary },
  carPlate: {
    ...typography.bodySmall,
    color: colors.accent.primary,
    backgroundColor: 'rgba(45,212,191,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  carStats: { flexDirection: 'row', marginTop: spacing.sm, gap: spacing.base },
  carStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  carStatText: { ...typography.caption, color: colors.text.tertiary },
  reminderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 62, 62, 0.1)',
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    marginTop: spacing.md,
    gap: spacing.sm,
    justifyContent: 'flex-end',
  },
  reminderText: { ...typography.caption, color: colors.emergency.light, flex: 1, textAlign: 'right' },
  emptyCarCard: {
    marginBottom: spacing.base,
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyCarText: { ...typography.label, color: colors.accent.primary, marginTop: spacing.sm },
  sosButton: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: colors.emergency.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(229, 62, 62, 0.5)',
  },
  sosGradient: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  sosContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sosTitle: { ...typography.h4, color: '#FFF', textAlign: 'right' },
  sosSub: { ...typography.bodySmall, color: 'rgba(255,255,255,0.8)', marginTop: 4, textAlign: 'right' },
  sosIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
    marginTop: spacing.sm,
  },
  sectionTitle: { ...typography.h4, color: colors.text.primary },
  seeAll: { ...typography.labelSmall, color: colors.accent.primary },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  serviceItem: {
    width: (width - spacing.base * 2 - spacing.md * 2) / 3,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45, 212, 191, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  serviceLabel: { ...typography.labelSmall, color: colors.text.secondary, textAlign: 'center' },
  orderCard: { marginBottom: spacing.md },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45, 212, 191, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfo: { flex: 1, alignItems: 'flex-end', marginRight: spacing.md },
  orderTitle: { ...typography.label, color: colors.text.primary },
  orderId: { ...typography.caption, color: colors.text.tertiary, marginTop: 2 },
  orderStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  orderStatusText: { ...typography.caption, fontWeight: '600' },
});

export default HomeScreen;
