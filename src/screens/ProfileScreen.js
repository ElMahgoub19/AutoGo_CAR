// AutoGo - Profile Screen (Design Image 13)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Card from '../components/Card';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const menuItems = [
    { icon: 'create-outline', label: 'تعديل الملف الشخصي', screen: 'EditProfile' },
    { icon: 'location-outline', label: 'العناوين المحفوظة', screen: 'Addresses' },
    { icon: 'wallet-outline', label: 'المحفظة الرقمية', screen: 'Wallet' },
    { icon: 'card-outline', label: 'طرق الدفع', screen: 'PaymentMethods' },
    { icon: 'time-outline', label: 'سجل الخدمات', screen: 'History' },
    { icon: 'notifications-outline', label: 'الإشعارات', screen: 'Notifications' },
    { icon: 'help-circle-outline', label: 'مركز الدعم والمساعدة', screen: 'Support' },
    { icon: 'document-text-outline', label: 'الشروط والخصوصية', screen: 'Terms' },
  ];

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.text.secondary} />
          </View>
          <Text style={styles.name}>{user?.name || 'محمد العتيبي'}</Text>
          <Text style={styles.phone}>{user?.phone || '+966 50 123 4567'}</Text>

          {/* Points card */}
          <Card style={styles.pointsCard} variant="accent">
            <View style={styles.pointsRow}>
              <View>
                <Text style={styles.pointsLabel}>نقاط AUTOGO</Text>
                <Text style={styles.pointsValue}>{user?.points || 2450} نقطة</Text>
              </View>
              <View style={styles.pointsIcon}>
                <Ionicons name="trophy" size={24} color={colors.accent.primary} />
              </View>
            </View>
            <View style={styles.memberBadge}>
              <Text style={styles.memberText}>{user?.membershipType || 'بريميوم'}</Text>
              <Ionicons name="star" size={14} color="#F6AD55" />
            </View>
          </Card>
        </View>

        {/* Menu */}
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem} onPress={() => navigation.navigate(item.screen)}>
            <Ionicons name="chevron-back" size={18} color={colors.text.muted} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={20} color={colors.accent.primary} />
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => dispatch(logout())}>
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
          <Ionicons name="log-out-outline" size={20} color={colors.emergency.primary} />
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base },
  header: { alignItems: 'center', paddingTop: 60, marginBottom: spacing.xl },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 2, borderColor: colors.accent.primary + '40',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  name: { ...typography.h3, color: colors.text.primary },
  phone: { ...typography.body, color: colors.text.secondary, marginTop: 4 },
  pointsCard: { width: '100%', marginTop: spacing.lg },
  pointsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pointsLabel: { ...typography.bodySmall, color: colors.text.secondary },
  pointsValue: { ...typography.h4, color: colors.accent.primary, marginTop: 4 },
  pointsIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(45,212,191,0.15)', alignItems: 'center', justifyContent: 'center' },
  memberBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  memberText: { ...typography.labelSmall, color: '#F6AD55' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg,
    borderBottomWidth: 1, borderBottomColor: colors.divider,
  },
  menuIcon: { width: 40, height: 40, borderRadius: borderRadius.sm, backgroundColor: 'rgba(45,212,191,0.08)', alignItems: 'center', justifyContent: 'center' },
  menuLabel: { ...typography.label, color: colors.text.primary, flex: 1, textAlign: 'right', marginRight: spacing.md },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm, paddingVertical: spacing.xl, marginTop: spacing.lg,
  },
  logoutText: { ...typography.label, color: colors.emergency.primary },
});

export default ProfileScreen;
