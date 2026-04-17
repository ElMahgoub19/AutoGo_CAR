// AutoGo - Order Detail Screen (Design Image 34)
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

const OrderDetailScreen = ({ navigation, route }) => {
  const order = route?.params?.order || {};
  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="تفاصيل الطلب" onBack={() => navigation.goBack()} leftIcon="information-circle-outline" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base, paddingBottom: 120 }}>
        <Card variant="accent" style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View><Text style={{ ...typography.caption, color: colors.text.muted }}>رقم الطلب</Text><Text style={{ ...typography.label, color: colors.accent.primary }}>#{order.id || 'ORD-77291'}</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Text style={{ ...typography.h4, color: colors.text.primary }}>طلب مكتمل</Text>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(56,161,105,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="checkmark-circle" size={22} color={colors.status.success} />
              </View>
            </View>
          </View>
          <Text style={{ ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right', marginTop: spacing.sm }}>تم تسليم المركبة في الموعد المحدد</Text>
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.label, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.md }}>تفاصيل الخدمة</Text>
          {[
            { icon: 'sparkles', name: 'غسيل ذكي بريميوم', desc: 'تنظيف شامل للهيكل الخارجي مع تلميع داخلي نانو سيراميك.' },
            { icon: 'disc', name: 'فحص ومعايرة الإطارات', desc: 'تعديل الضغط لجميع الإطارات وفحص عمق المداس.' },
          ].map((s, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg }}>
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: spacing.md }}>
                <Text style={{ ...typography.label, color: colors.text.primary }}>{s.name}</Text>
                <Text style={{ ...typography.bodySmall, color: colors.text.tertiary, textAlign: 'right', marginTop: 4 }}>{s.desc}</Text>
              </View>
              <View style={{ width: 40, height: 40, borderRadius: borderRadius.sm, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={s.icon as any} size={20} color={colors.accent.primary} />
              </View>
            </View>
          ))}
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.label, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.md }}>ملخص الفاتورة</Text>
          {[
            { label: 'قيمة الخدمات', value: '195.00 ج.م' },
            { label: 'ضريبة القيمة المضافة (15%)', value: '29.25 ج.م' },
            { label: 'خصم بروموكود (WELCOME)', value: '25.00- ج.م', isDiscount: true },
          ].map((row, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <Text style={{ ...typography.bodySmall, color: row.isDiscount ? colors.accent.primary : colors.text.secondary }}>{row.value}</Text>
              <Text style={{ ...typography.bodySmall, color: row.isDiscount ? colors.accent.primary : colors.text.tertiary }}>{row.label}</Text>
            </View>
          ))}
          <View style={{ borderTopWidth: 1, borderTopColor: colors.divider, borderStyle: 'dashed', paddingTop: spacing.md, marginTop: spacing.sm, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ ...typography.priceSmall, color: colors.accent.primary }}>199.25 ج.م</Text>
            <Text style={{ ...typography.h4, color: colors.text.primary }}>الإجمالي الكلي</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.base, paddingBottom: 30, backgroundColor: colors.background.primary }}>
        <Button title="إعادة طلب الخدمة" onPress={() => navigation.navigate('Services')} icon="refresh" iconPosition="right" />
      </View>
    </LinearGradient>
  );
};

export default OrderDetailScreen;
