// AutoGo - Terms & Privacy Screen (Design Image 40)
import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import type { RootState } from '../types';

const TermsScreen = ({ navigation }) => {
  const [tab, setTab] = useState('terms');
  const tabs = [
    { id: 'terms', label: 'شروط الاستخدام' },
    { id: 'privacy', label: 'سياسة الخصوصية' },
    { id: 'faq', label: 'ملفاً' },
  ];

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="الشروط والخصوصية" onBack={() => navigation.goBack()} />
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.base, gap: spacing.sm, marginBottom: spacing.lg }}>
        {tabs.map((t) => (
          <TouchableOpacity key={t.id} onPress={() => setTab(t.id)} style={{ flex: 1, paddingVertical: 10, borderRadius: borderRadius.sm, backgroundColor: tab === t.id ? colors.accent.primary : 'rgba(255,255,255,0.06)', alignItems: 'center' }}>
            <Text style={{ ...typography.labelSmall, color: tab === t.id ? colors.button.primaryText : colors.text.secondary }}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base, paddingBottom: 40 }}>
        <Text style={{ ...typography.caption, color: colors.text.muted, textAlign: 'right', marginBottom: spacing.lg }}>آخر تحديث: 20 مايو 2025</Text>

        <Card style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm, marginBottom: spacing.md }}>
            <Text style={{ ...typography.h4, color: colors.text.primary }}>مقدمة عامة</Text>
            <Ionicons name="document-text-outline" size={20} color={colors.accent.primary} />
          </View>
          <Text style={{ ...typography.body, color: colors.text.secondary, textAlign: 'right', lineHeight: 24 }}>
            مرحباً بك في تطبيقنا. نحن نقدر ثقتك في اختيارنا لإدارة مركباتك. تهدف هذه الاتفاقية إلى توضيح القواعد والضوابط التي تحكم استخدامك للتطبيق والخدمات المقدمة من خلاله، لضمان تجربة آمنة ومرضية لجميع المستخدمين.
          </Text>
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.h4, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.md }}>1. شروط الاستخدام</Text>
          <Text style={{ ...typography.label, color: colors.accent.primary, textAlign: 'right', marginBottom: spacing.sm }}>أ. أهلية الاستخدام</Text>
          <Text style={{ ...typography.body, color: colors.text.secondary, textAlign: 'right', lineHeight: 24 }}>
            يجب أن يكون عمرك 18 عاماً على الأقل لاستخدام هذا التطبيق بشكل مستقل. باستخدامك للتطبيق، فإنك تقر بأنك تملك الأهلية القانونية الكاملة للتعاقد.
          </Text>
        </Card>

        <Card style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm, marginBottom: spacing.md }}>
            <Text style={{ ...typography.h4, color: colors.text.primary }}>سياسة الخصوصية</Text>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.accent.primary} />
          </View>
          <Text style={{ ...typography.body, color: colors.text.secondary, textAlign: 'right', lineHeight: 24 }}>
            خصوصيتك هي أولويتنا القصوى. نحن نقوم بجمع البيانات الضرورية فقط لتقديم أفضل خدمة ممكنة لك.
          </Text>
        </Card>

        <Card variant="accent">
          <Text style={{ ...typography.label, color: colors.text.primary, textAlign: 'center', marginBottom: spacing.sm }}>هل لديك استفسار حول السياسات؟</Text>
          <Text style={{ ...typography.bodySmall, color: colors.text.secondary, textAlign: 'center', marginBottom: spacing.md }}>فريقنا القانوني متاح للإجابة على جميع تساؤلاتك</Text>
          <Button title="تواصل مع الدعم القانوني" onPress={() => {}} variant="danger" size="medium" />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

export default TermsScreen;
