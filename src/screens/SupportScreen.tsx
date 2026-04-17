// AutoGo - Support Screen (Design Image 39)
import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import MapPlaceholder from '../components/MapPlaceholder';
import type { RootState } from '../types';

const SupportScreen = ({ navigation }) => {
  const categories = [
    { icon: 'person-outline', label: 'حسابي' },
    { icon: 'card-outline', label: 'المدفوعات' },
    { icon: 'construct-outline', label: 'الخدمات' },
    { icon: 'warning-outline', label: 'الطوارئ' },
  ];
  const faqs = [
    'كيف يمكنني إضافة سيارة جديدة للحساب؟',
    'هل يمكنني استرداد المبلغ في حال إلغاء الحجز؟',
  ];

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="مركز الدعم والمساعدة" onBack={() => navigation.goBack()} leftIcon="notifications-outline" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base, paddingBottom: 40 }}>
        <Text style={{ ...typography.h2, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.sm }}>
          كيف يمكننا مساعدتك{'\n'}<Text style={{ color: colors.accent.primary }}>اليوم؟</Text>
        </Text>
        <Text style={{ ...typography.body, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.xl }}>ابحث عن إجابات سريعة أو تواصل مع فريقنا المتخصص</Text>

        <Input placeholder="ابحث عن إجابة (مثلاً: شحن المحفظة، حجز صيانة)..." icon="search-outline" value="" onChangeText={() => {}} style={{ marginBottom: spacing.xl }} />

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: spacing.xl }}>
          {categories.map((c, i) => (
            <TouchableOpacity key={i} style={{ width: '48%', alignItems: 'center', marginBottom: spacing.lg }}>
              <View style={{ width: 60, height: 60, borderRadius: borderRadius.md, backgroundColor: 'rgba(45,212,191,0.08)', borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm }}>
                <Ionicons name={c.icon as any} size={26} color={colors.accent.primary} />
              </View>
              <Text style={{ ...typography.labelSmall, color: colors.text.secondary }}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
          <TouchableOpacity><Text style={{ ...typography.labelSmall, color: colors.accent.primary }}>مشاهدة الجميع</Text></TouchableOpacity>
          <Text style={{ ...typography.h4, color: colors.text.primary }}>الأسئلة الأكثر شيوعاً</Text>
        </View>

        {faqs.map((faq, i) => (
          <Card key={i} style={{ marginBottom: spacing.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Ionicons name="chevron-down" size={18} color={colors.accent.primary} />
              <Text style={{ ...typography.body, color: colors.text.primary, flex: 1, textAlign: 'right', marginHorizontal: spacing.sm }}>{faq}</Text>
            </View>
          </Card>
        ))}

        {/* Live chat banner */}
        <Card variant="accent" style={{ marginTop: spacing.xl }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Ionicons name="arrow-back" size={20} color={colors.accent.primary} />
            <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: spacing.md }}>
              <Text style={{ ...typography.label, color: colors.text.primary }}>تحدث مع الدعم</Text>
              <Text style={{ ...typography.caption, color: colors.accent.primary }}>متواجدون الآن لمساعدتك</Text>
            </View>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(45,212,191,0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="chatbubble-outline" size={22} color={colors.accent.primary} />
            </View>
          </TouchableOpacity>
        </Card>

        <Text style={{ ...typography.h4, color: colors.text.primary, textAlign: 'right', marginTop: spacing.xl, marginBottom: spacing.md }}>مواقع مراكز الخدمة المعتمدة</Text>
        <MapPlaceholder height={160} label="عرض المراكز على الخريطة" />
      </ScrollView>
    </LinearGradient>
  );
};

export default SupportScreen;
