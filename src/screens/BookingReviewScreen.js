// AutoGo - Booking Review Screen (Design Image 28)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { bookService } from '../store/slices/ordersSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const BookingReviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedService, selectedWorkshop, selectedDate, selectedTime } = useSelector(s => s.services);
  const { user } = useSelector(s => s.auth);

  const handleConfirm = async () => {
    await dispatch(bookService({
      serviceName: selectedService?.name || 'تغيير الزيت والفلاتر',
      workshop: selectedWorkshop?.name || 'مركز الرياض',
      date: selectedDate || '12 مايو 2024',
      time: selectedTime || '10:00 صباحاً',
    }));
    navigation.navigate('MainTabs');
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="مراجعة الحجز" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Workshop banner */}
        <View style={styles.wsBanner}>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.wsBannerOverlay}>
            <Text style={styles.wsBannerName}>{selectedWorkshop?.name || 'مركز الرياض لصيانة تيسلا'}</Text>
            <View style={styles.wsBannerAddress}>
              <Text style={styles.wsBannerAddressText}>{selectedWorkshop?.address || 'حي الملقا، طريق الملك فهد'}</Text>
              <Ionicons name="location" size={14} color={colors.text.secondary} />
            </View>
          </LinearGradient>
        </View>

        {/* Booking details */}
        <Card style={styles.detailsCard}>
          {[
            { icon: 'construct-outline', label: 'الخدمة المختارة', value: selectedService?.name || 'تغيير الزيت والفلاتر (أصلي)' },
            { icon: 'calendar-outline', label: 'تاريخ الحجز', value: selectedDate || 'الأحد، 12 مايو 2024' },
            { icon: 'time-outline', label: 'الوقت المحدد', value: selectedTime || '10:00 صباحاً' },
          ].map((item, i) => (
            <View key={i} style={[styles.detailRow, i > 0 && styles.detailBorder]}>
              <View style={styles.detailIcon}>
                <Ionicons name={item.icon} size={22} color={colors.accent.primary} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Contact info */}
        <View style={styles.sectionHeader}>
          <Text style={styles.editLink}>تعديل</Text>
          <Text style={styles.sectionTitle}>معلومات التواصل</Text>
        </View>
        <Card>
          <View style={styles.contactRow}>
            <Text style={styles.contactName}>{user?.name || 'محمد العتيبي'}</Text>
            <Ionicons name="person-outline" size={22} color={colors.text.tertiary} />
          </View>
          <View style={[styles.contactRow, { marginTop: spacing.md }]}>
            <Text style={styles.contactPhone}>{user?.phone || '+966 50 XXXX XXX'}</Text>
            <Ionicons name="call-outline" size={22} color={colors.text.tertiary} />
          </View>
        </Card>

        {/* Cost summary */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>ملخص التكلفة</Text>
        <Card>
          <View style={styles.costRow}>
            <Text style={styles.costValue}>{selectedService?.price || 120.00} ر.س</Text>
            <Text style={styles.costLabel}>تكلفة الخدمة</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button title="تأكيد الحجز النهائي" onPress={handleConfirm} icon="checkmark" iconPosition="right" />
        <Text style={styles.bottomHint}>بالضغط على تأكيد، أنت توافق على سياسة الإلغاء قبل 24 ساعة.</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base, paddingBottom: 140 },
  wsBanner: {
    height: 160, backgroundColor: '#0D1F2D', borderRadius: borderRadius.lg,
    overflow: 'hidden', marginBottom: spacing.lg, justifyContent: 'flex-end',
  },
  wsBannerOverlay: { padding: spacing.lg },
  wsBannerName: { ...typography.h3, color: colors.text.primary, textAlign: 'right' },
  wsBannerAddress: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 4 },
  wsBannerAddressText: { ...typography.bodySmall, color: colors.text.secondary },
  detailsCard: { marginBottom: spacing.lg },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  detailBorder: { borderTopWidth: 1, borderTopColor: colors.divider },
  detailIcon: {
    width: 44, height: 44, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center', marginLeft: spacing.md,
  },
  detailInfo: { flex: 1, alignItems: 'flex-end' },
  detailLabel: { ...typography.caption, color: colors.text.tertiary },
  detailValue: { ...typography.label, color: colors.text.primary, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right' },
  editLink: { ...typography.labelSmall, color: colors.accent.primary },
  contactRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.md },
  contactName: { ...typography.label, color: colors.text.primary },
  contactPhone: { ...typography.body, color: colors.text.secondary },
  costRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  costLabel: { ...typography.body, color: colors.text.secondary },
  costValue: { ...typography.label, color: colors.text.primary },
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.base, paddingBottom: 30, backgroundColor: colors.background.primary },
  bottomHint: { ...typography.caption, color: colors.text.muted, textAlign: 'center', marginTop: spacing.sm },
});

export default BookingReviewScreen;
