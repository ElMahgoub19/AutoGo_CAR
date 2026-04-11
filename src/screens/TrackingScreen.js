// AutoGo - Tracking Screen (Design Image 30)
import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Card from '../components/Card';
import MapPlaceholder from '../components/MapPlaceholder';
import { mockDriver } from '../data/mockData';

const TrackingScreen = ({ navigation }) => {
  const { trackingData } = useSelector(state => state.orders);
  const driver = mockDriver;

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Map */}
      <View style={styles.mapSection}>
        <MapPlaceholder height={300} showPin />
        {/* ETA badge */}
        <View style={styles.etaBadge}>
          <LinearGradient colors={['#0D3B3A', '#0A2525']} style={styles.etaGradient}>
            <View style={styles.etaIcon}>
              <Ionicons name="time" size={22} color={colors.accent.primary} />
            </View>
            <View>
              <Text style={styles.etaTitle}>يصل خلال {trackingData.eta} دقائق</Text>
              <Text style={styles.etaSub}>المسافة المتبقية: {trackingData.distance} كم</Text>
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
          {trackingData.steps.map((step, idx) => (
            <View key={idx} style={styles.timelineStep}>
              <View style={styles.timelineLeft}>
                {idx < trackingData.steps.length - 1 && (
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
