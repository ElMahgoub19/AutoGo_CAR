// AutoGo - Invoice Screen (Design Image 38)
import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import type { RootState } from '../types';

const InvoiceScreen = ({ navigation }) => (
  <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
    <Header title="تفاصيل الفاتورة" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base, paddingBottom: 40 }}>
      <View style={{ alignItems: 'center', marginVertical: spacing.xl }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(56,161,105,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md }}>
          <Ionicons name="checkmark-circle" size={36} color={colors.status.success} />
        </View>
        <Text style={{ ...typography.label, color: colors.status.success }}>تمت عملية الدفع بنجاح</Text>
        <Text style={{ fontSize: 42, fontWeight: '800', color: colors.text.primary, marginTop: spacing.sm }}>285.00 <Text style={{ ...typography.h4, color: colors.text.secondary }}>ج.م</Text></Text>
        <Text style={{ ...typography.bodySmall, color: colors.text.tertiary, marginTop: 4 }}>الخميس، 15 مايو 2025 • 04:30 م</Text>
      </View>

      <Card style={{ marginBottom: spacing.lg }}>
        <Text style={{ ...typography.label, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.md }}>تفاصيل الخدمات</Text>
        {[
          { label: 'غسيل ذكي (خارجي وداخلي)', value: '150.00 ج.م' },
          { label: 'فحص ضغط الإطارات', value: '45.00 ج.م' },
          { label: 'إضافة معطر جو بريميوم', value: '25.00 ج.م' },
          { label: 'خصم العميل الوفي (15%)', value: '33.00- ج.م', accent: true },
          { label: 'ضريبة القيمة المضافة (15%)', value: '98.00 ج.م' },
        ].map((row, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text style={{ ...typography.bodySmall, color: row.accent ? colors.accent.primary : colors.text.secondary }}>{row.value}</Text>
            <Text style={{ ...typography.bodySmall, color: row.accent ? colors.accent.primary : colors.text.tertiary }}>{row.label}</Text>
          </View>
        ))}
        <View style={{ borderTopWidth: 1, borderTopColor: colors.divider, borderStyle: 'dashed', paddingTop: spacing.md, marginTop: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ ...typography.priceSmall, color: colors.accent.primary }}>285.00 ج.م</Text>
          <Text style={{ ...typography.h4, color: colors.text.primary }}>الإجمالي الكلي</Text>
        </View>
      </Card>

      <Card style={{ marginBottom: spacing.xl }}>
        <Text style={{ ...typography.label, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.md }}>معلومات الدفع</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'rgba(56,161,105,0.15)', borderRadius: borderRadius.sm, paddingHorizontal: 10, paddingVertical: 3 }}>
            <Text style={{ ...typography.caption, color: colors.status.success }}>مكتمل</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <View><Text style={{ ...typography.label, color: colors.text.primary }}>Apple Pay</Text><Text style={{ ...typography.caption, color: colors.text.tertiary }}>بطاقة مدى **** 4211</Text></View>
            <Ionicons name="logo-apple" size={24} color={colors.text.primary} />
          </View>
        </View>
      </Card>

      <Button title="تحميل الفاتورة (PDF)" onPress={() => {}} icon="download-outline" iconPosition="right" style={{ marginBottom: spacing.md }} />
      <Button title="العودة للرئيسية" onPress={() => navigation.navigate('MainTabs')} variant="secondary" />
    </ScrollView>
  </LinearGradient>
);

export default InvoiceScreen;
