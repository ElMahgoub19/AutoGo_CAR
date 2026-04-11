// AutoGo - Workshop Detail Screen (Design Image 25)
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

const WorkshopDetailScreen = ({ navigation, route }) => {
  const ws = route?.params?.workshop || {};

  const features = [
    { icon: 'ribbon-outline', label: 'مركز معتمد' },
    { icon: 'car-outline', label: 'مواقف سيارات' },
    { icon: 'wifi-outline', label: 'واي فاي مجاني' },
    { icon: 'cafe-outline', label: 'منطقة انتظار' },
  ];

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="" onBack={() => navigation.goBack()} rightIcon="share-outline" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Workshop image placeholder */}
        <View style={styles.imageContainer}>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.imageOverlay}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star-outline" size={14} color="#FFF" />
              <Text style={styles.ratingText}>{ws.rating || 4.9}</Text>
            </View>
            <Text style={styles.wsName}>{ws.name || 'مركز الرياض لصيانة تيسلا'}</Text>
            <View style={styles.addressRow}>
              <Text style={styles.addressText}>{ws.address || 'حي الملقا، طريق الملك فهد، الرياض'}</Text>
              <Ionicons name="location" size={14} color={colors.text.secondary} />
            </View>
          </LinearGradient>
        </View>

        {/* Features */}
        <View style={styles.featuresRow}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={22} color={colors.accent.primary} />
              </View>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* Map */}
        <MapPlaceholder height={160} label="عرض على الخريطة" style={{ marginBottom: spacing.lg }} />

        {/* Hours */}
        <Card style={styles.hoursCard}>
          <View style={styles.hoursRow}>
            <View style={styles.openBadge}>
              <Text style={styles.openText}>{ws.isOpen !== false ? 'مفتوح الآن' : 'مغلق'}</Text>
            </View>
            <View style={styles.hoursInfo}>
              <View style={styles.hoursTitle}>
                <Text style={styles.hoursTitleText}>ساعات العمل</Text>
                <Ionicons name="time-outline" size={18} color={colors.text.secondary} />
              </View>
              <Text style={styles.hoursDetail}>{ws.workDays || 'الأحد - الخميس'}</Text>
              <Text style={styles.hoursDetail}>{ws.openHours || '08:00 ص - 10:00 م'}</Text>
            </View>
          </View>
        </Card>

        {/* Book button */}
        <Button
          title="حجز موعد الآن"
          onPress={() => navigation.navigate('Booking')}
          icon="arrow-back"
          iconPosition="left"
          style={{ marginTop: spacing.lg }}
        />

        {/* Reviews summary */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>التقييمات والمراجعات</Text>
          <View style={styles.reviewsRow}>
            <View style={styles.ratingBig}>
              <Text style={styles.ratingBigText}>{ws.rating || 4.9}</Text>
              <View style={styles.starsRow}>
                {[1,2,3,4,5].map(i => (
                  <Ionicons key={i} name="star-outline" size={16} color={colors.accent.primary} />
                ))}
              </View>
              <Text style={styles.reviewCount}>بناءً على {ws.reviewCount || 1240} تقييم</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 40 },
  imageContainer: {
    height: 250, backgroundColor: '#0D1F2D', justifyContent: 'flex-end',
    marginHorizontal: spacing.base, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.lg,
  },
  imageOverlay: { padding: spacing.lg, justifyContent: 'flex-end' },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.accent.primary, borderRadius: borderRadius.sm,
    paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: spacing.sm,
  },
  ratingText: { ...typography.labelSmall, color: '#FFF' },
  wsName: { ...typography.h2, color: colors.text.primary, textAlign: 'right' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 4 },
  addressText: { ...typography.bodySmall, color: colors.text.secondary },
  featuresRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingHorizontal: spacing.base, marginBottom: spacing.xl,
  },
  featureItem: { alignItems: 'center' },
  featureIcon: {
    width: 52, height: 52, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45,212,191,0.08)', borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  featureLabel: { ...typography.caption, color: colors.text.secondary },
  hoursCard: { marginHorizontal: spacing.base },
  hoursRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  openBadge: {
    backgroundColor: 'rgba(45,212,191,0.15)', borderRadius: borderRadius.full,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  openText: { ...typography.labelSmall, color: colors.accent.primary },
  hoursInfo: { alignItems: 'flex-end' },
  hoursTitle: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  hoursTitleText: { ...typography.label, color: colors.text.primary },
  hoursDetail: { ...typography.bodySmall, color: colors.text.secondary, marginTop: 2 },
  reviewsSection: { paddingHorizontal: spacing.base, marginTop: spacing.xl },
  sectionTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.md },
  reviewsRow: { alignItems: 'center' },
  ratingBig: { alignItems: 'center' },
  ratingBigText: { fontSize: 48, fontWeight: '800', color: colors.text.primary },
  starsRow: { flexDirection: 'row', gap: 4, marginTop: 4 },
  reviewCount: { ...typography.bodySmall, color: colors.text.tertiary, marginTop: 6 },
});

export default WorkshopDetailScreen;
