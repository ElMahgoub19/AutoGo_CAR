// AutoGo - Privacy Policy Screen
import React from 'react';
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

const sections = [
  {
    icon: 'shield-checkmark-outline',
    title: 'جمع البيانات',
    content: 'نقوم بجمع البيانات الشخصية التي تقدمها لنا عند إنشاء حسابك، مثل الاسم ورقم الهاتف والبريد الإلكتروني. كما نجمع بيانات الاستخدام بشكل تلقائي لتحسين تجربتك، بما في ذلك نوع الجهاز ونظام التشغيل وسجل التصفح داخل التطبيق.',
  },
  {
    icon: 'eye-outline',
    title: 'كيف نستخدم بياناتك',
    items: [
      'تقديم الخدمات وتحسينها',
      'إرسال إشعارات متعلقة بطلباتك',
      'تخصيص تجربتك في التطبيق',
      'حماية حسابك ومنع الاحتيال',
      'تحليل الأداء وتطوير ميزات جديدة',
    ],
  },
  {
    icon: 'lock-closed-outline',
    title: 'حماية البيانات',
    content: 'نستخدم تقنيات تشفير متقدمة (SSL/TLS) لحماية بياناتك أثناء النقل. يتم تخزين جميع البيانات الحساسة بشكل مشفر في خوادم آمنة. نطبق معايير أمان صارمة تتوافق مع المعايير الدولية لحماية البيانات.',
  },
  {
    icon: 'people-outline',
    title: 'مشاركة البيانات',
    content: 'لا نبيع بياناتك الشخصية لأطراف ثالثة. قد نشارك بيانات محدودة مع مقدمي الخدمة (ورش الصيانة، شركات السحب) لإتمام الخدمات المطلوبة فقط. قد نفصح عن بيانات عند طلب قانوني من الجهات الرسمية المختصة.',
  },
  {
    icon: 'location-outline',
    title: 'بيانات الموقع',
    content: 'نستخدم موقعك الجغرافي لتقديم خدمات الطوارئ وتحديد أقرب ورش الصيانة إليك. يمكنك التحكم في إذن الموقع من إعدادات جهازك في أي وقت. لن نتتبع موقعك في الخلفية إلا بإذن صريح منك.',
  },
  {
    icon: 'settings-outline',
    title: 'حقوقك',
    items: [
      'الاطلاع على بياناتك الشخصية المحفوظة',
      'طلب تعديل أو تحديث بياناتك',
      'طلب حذف حسابك وبياناتك بالكامل',
      'إلغاء الاشتراك في الرسائل التسويقية',
      'تصدير نسخة من بياناتك',
    ],
  },
];

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="سياسة الخصوصية" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base, paddingBottom: 40 }}>
        {/* Last updated */}
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
          gap: spacing.xs, marginBottom: spacing.lg,
        }}>
          <Text style={{ ...typography.caption, color: colors.text.muted }}>آخر تحديث: 1 أبريل 2026</Text>
          <Ionicons name="time-outline" size={14} color={colors.text.muted} />
        </View>

        {/* Intro bar */}
        <Card variant="accent" style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...typography.label, color: colors.text.primary, textAlign: 'right' }}>
                خصوصيتك أولويتنا
              </Text>
              <Text style={{ ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right', marginTop: 4 }}>
                نلتزم بحماية بياناتك الشخصية وفقاً لأعلى المعايير
              </Text>
            </View>
            <View style={{
              width: 48, height: 48, borderRadius: 24,
              backgroundColor: 'rgba(45,212,191,0.15)',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name="shield-checkmark" size={24} color={colors.accent.primary} />
            </View>
          </View>
        </Card>

        {/* Sections */}
        {sections.map((section, index) => (
          <Card key={index} style={{ marginBottom: spacing.md }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
              gap: spacing.sm, marginBottom: spacing.md,
            }}>
              <Text style={{ ...typography.h4, color: colors.text.primary }}>{section.title}</Text>
              <View style={{
                width: 32, height: 32, borderRadius: borderRadius.sm,
                backgroundColor: 'rgba(45,212,191,0.08)',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Ionicons name={section.icon as any} size={18} color={colors.accent.primary} />
              </View>
            </View>

            {section.content && (
              <Text style={{
                ...typography.body, color: colors.text.secondary,
                textAlign: 'right', lineHeight: 24,
              }}>
                {section.content}
              </Text>
            )}

            {section.items && section.items.map((item, i) => (
              <View key={i} style={{
                flexDirection: 'row', alignItems: 'flex-start',
                justifyContent: 'flex-end', gap: spacing.sm,
                marginBottom: i < section.items.length - 1 ? spacing.sm : 0,
              }}>
                <Text style={{
                  ...typography.body, color: colors.text.secondary,
                  flex: 1, textAlign: 'right', lineHeight: 22,
                }}>
                  {item}
                </Text>
                <View style={{
                  width: 6, height: 6, borderRadius: 3,
                  backgroundColor: colors.accent.primary,
                  marginTop: 8,
                }} />
              </View>
            ))}
          </Card>
        ))}

        {/* Contact section */}
        <Card variant="accent" style={{ marginTop: spacing.md }}>
          <Text style={{ ...typography.label, color: colors.text.primary, textAlign: 'center', marginBottom: spacing.sm }}>
            لديك استفسار حول الخصوصية؟
          </Text>
          <Text style={{ ...typography.bodySmall, color: colors.text.secondary, textAlign: 'center', marginBottom: spacing.md }}>
            تواصل مع فريق حماية البيانات لدينا
          </Text>
          <Button
            title="تواصل معنا"
            onPress={() => navigation.navigate('Support')}
            size="medium"
          />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

export default PrivacyPolicyScreen;
