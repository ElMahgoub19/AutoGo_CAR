// AutoGo - Payment Methods Screen (Design Image 36)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const PaymentMethodsScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('visa');
  const methods = [
    { id: 'visa', name: 'Apple Pay', icon: 'logo-apple', desc: 'دفع فوري وآمن' },
    { id: 'instapay', name: 'InstaPay', icon: 'flash', desc: 'تحويل بنكي لحظي' },
    { id: 'wallet', name: 'المحفظة الرقمية', icon: 'wallet', desc: 'الرصيد: 450.00 ج.م' },
  ];

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="طرق الدفع" onBack={() => navigation.goBack()} leftIcon="add-outline" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base }}>
        {/* Card preview */}
        <Text style={{ ...typography.label, color: colors.accent.primary, textAlign: 'right', marginBottom: spacing.md }}>البطاقات المحفوظة</Text>
        <Card style={{ marginBottom: spacing.xl, backgroundColor: '#1A2D3D' }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ ...typography.bodySmall, color: colors.text.tertiary }}>اسم العميل</Text>
            <Text style={{ ...typography.label, color: colors.text.primary }}>محمد العتيبي</Text>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text.primary, marginTop: spacing.md, letterSpacing: 4 }}>**** **** **** 4211</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: spacing.md }}>
              <View style={{ backgroundColor: colors.accent.primary, borderRadius: borderRadius.sm, paddingHorizontal: 12, paddingVertical: 4 }}>
                <Text style={{ ...typography.caption, color: colors.button.primaryText, fontWeight: '600' }}>افتراضية</Text>
              </View>
              <View><Text style={{ ...typography.caption, color: colors.text.tertiary }}>الصلاحية</Text><Text style={{ ...typography.label, color: colors.text.primary }}>12/27</Text></View>
            </View>
          </View>
        </Card>

        <Text style={{ ...typography.label, color: colors.accent.primary, textAlign: 'right', marginBottom: spacing.md }}>الدفع السريع والمحافظ</Text>
        {methods.map((m) => (
          <TouchableOpacity key={m.id} onPress={() => setSelected(m.id)}>
            <Card style={{ marginBottom: spacing.md, borderColor: selected === m.id ? colors.accent.primary : colors.background.cardBorder }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="chevron-back" size={18} color={colors.text.muted} />
                <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: spacing.md }}>
                  <Text style={{ ...typography.label, color: colors.text.primary }}>{m.name}</Text>
                  <Text style={{ ...typography.caption, color: m.id === 'wallet' ? colors.accent.primary : colors.text.tertiary, marginTop: 2 }}>{m.desc}</Text>
                </View>
                <View style={{ width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={m.icon} size={22} color={colors.accent.primary} />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <Button title="استخدام وسيلة الدفع" onPress={() => navigation.goBack()} style={{ marginTop: spacing.lg }} />
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: spacing.md }}>
          <Text style={{ ...typography.caption, color: colors.text.muted }}>جميع معاملاتك مشفرة وآمنة تماماً</Text>
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.text.muted} />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default PaymentMethodsScreen;
