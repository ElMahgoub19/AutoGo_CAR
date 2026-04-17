// AutoGo - Settings Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import type { RootState } from '../types';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('ar');
  const [biometric, setBiometric] = useState(false);

  const SettingRow = ({ icon, label, description, value, onValueChange, type = 'toggle' }: { icon: any; label: any; description: any; value?: any; onValueChange?: any; type?: string }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        {type === 'toggle' && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: 'rgba(255,255,255,0.1)', true: 'rgba(45,212,191,0.4)' }}
            thumbColor={value ? colors.accent.primary : 'rgba(255,255,255,0.4)'}
          />
        )}
        {type === 'arrow' && (
          <Ionicons name="chevron-back" size={18} color={colors.text.muted} />
        )}
      </View>
      <View style={styles.settingRight}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>{label}</Text>
          {description && <Text style={styles.settingDesc}>{description}</Text>}
        </View>
        <View style={styles.settingIcon}>
          <Ionicons name={icon as any} size={20} color={colors.accent.primary} />
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="الإعدادات" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>الإشعارات</Text>
        <Card style={styles.sectionCard}>
          <SettingRow
            icon="notifications-outline"
            label="تفعيل الإشعارات"
            description="استقبال جميع الإشعارات"
            value={notifications}
            onValueChange={setNotifications}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="cube-outline"
            label="تحديثات الطلبات"
            description="إشعارات حالة الطلب والتتبع"
            value={orderUpdates}
            onValueChange={setOrderUpdates}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="megaphone-outline"
            label="العروض والتخفيضات"
            description="إشعارات العروض الحصرية"
            value={promotions}
            onValueChange={setPromotions}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="volume-high-outline"
            label="الأصوات"
            description="تشغيل أصوات الإشعارات"
            value={soundEnabled}
            onValueChange={setSoundEnabled}
          />
        </Card>

        {/* Appearance Section */}
        <Text style={styles.sectionTitle}>المظهر</Text>
        <Card style={styles.sectionCard}>
          <SettingRow
            icon="moon-outline"
            label="الوضع الداكن"
            description="تفعيل المظهر الداكن للتطبيق"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <View style={styles.separator} />
          <TouchableOpacity>
            <SettingRow
              icon="language-outline"
              label="اللغة"
              description={language === 'ar' ? 'العربية' : 'English'}
              type="arrow"
            />
          </TouchableOpacity>
        </Card>

        {/* Language selector */}
        <View style={styles.langToggle}>
          <TouchableOpacity
            style={[styles.langBtn, language === 'en' && styles.langBtnActive]}
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, language === 'ar' && styles.langBtnActive]}
            onPress={() => setLanguage('ar')}
          >
            <Text style={[styles.langText, language === 'ar' && styles.langTextActive]}>العربية</Text>
          </TouchableOpacity>
        </View>

        {/* Security Section */}
        <Text style={styles.sectionTitle}>الأمان</Text>
        <Card style={styles.sectionCard}>
          <SettingRow
            icon="finger-print-outline"
            label="تسجيل الدخول بالبصمة"
            description="استخدام البصمة أو Face ID"
            value={biometric}
            onValueChange={setBiometric}
          />
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <SettingRow
              icon="key-outline"
              label="تغيير كلمة المرور"
              description="تحديث كلمة المرور الخاصة بك"
              type="arrow"
            />
          </TouchableOpacity>
        </Card>

        {/* Data & Storage */}
        <Text style={styles.sectionTitle}>البيانات والتخزين</Text>
        <Card style={styles.sectionCard}>
          <TouchableOpacity>
            <SettingRow
              icon="cloud-download-outline"
              label="تنزيل بياناتي"
              description="تحميل نسخة من بياناتك الشخصية"
              type="arrow"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity>
            <SettingRow
              icon="trash-outline"
              label="مسح ذاكرة التخزين المؤقت"
              description="تحرير مساحة التخزين"
              type="arrow"
            />
          </TouchableOpacity>
        </Card>

        {/* About */}
        <Card variant="accent" style={{ marginTop: spacing.lg }}>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutVersion}>v1.0.0</Text>
            <View>
              <Text style={styles.aboutTitle}>AUTOGO</Text>
              <Text style={styles.aboutSub}>S M A R T   C A R   C A R E</Text>
            </View>
          </View>
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base, paddingBottom: 40 },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    textAlign: 'right',
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  sectionCard: { marginBottom: spacing.sm },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  settingLeft: {
    marginLeft: spacing.sm,
  },
  settingInfo: {
    alignItems: 'flex-end',
    flex: 1,
  },
  settingIcon: {
    width: 36, height: 36, borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(45,212,191,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  settingLabel: { ...typography.label, color: colors.text.primary },
  settingDesc: { ...typography.caption, color: colors.text.tertiary, marginTop: 2 },
  separator: { height: 1, backgroundColor: colors.divider },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: borderRadius.sm,
    padding: 4,
    marginTop: spacing.sm,
  },
  langBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: borderRadius.sm - 2,
  },
  langBtnActive: { backgroundColor: colors.accent.primary },
  langText: { ...typography.labelSmall, color: colors.text.secondary },
  langTextActive: { color: colors.button.primaryText },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aboutTitle: {
    ...typography.h4,
    color: colors.text.primary,
    textAlign: 'right',
    letterSpacing: 2,
  },
  aboutSub: {
    ...typography.caption,
    color: colors.text.tertiary,
    letterSpacing: 2,
    marginTop: 2,
  },
  aboutVersion: { ...typography.bodySmall, color: colors.text.muted },
});

export default SettingsScreen;
