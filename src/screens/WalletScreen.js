// AutoGo - Wallet Screen (Design Image 35)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import { mockTransactions } from '../data/mockData';

const WalletScreen = ({ navigation }) => {
  const { user } = useSelector(s => s.auth);
  const actions = [
    { icon: 'add', label: 'شحن' },
    { icon: 'arrow-up', label: 'تحويل' },
    { icon: 'card-outline', label: 'بطاقاتي' },
  ];

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="المحفظة الرقمية" onBack={() => navigation.goBack()} leftIcon="settings-outline" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base }}>
        {/* Balance card */}
        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right' }}>الرصيد الحالي</Text>
          <Text style={{ fontSize: 42, fontWeight: '800', color: colors.text.primary, textAlign: 'right' }}>
            {user?.walletBalance || 450.00} <Text style={{ ...typography.h4, color: colors.accent.primary }}>ر.س</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.xl }}>
            {actions.map((a, i) => (
              <TouchableOpacity key={i} style={{ alignItems: 'center' }}>
                <View style={{ width: 52, height: 52, borderRadius: borderRadius.md, backgroundColor: i === 2 ? 'rgba(45,212,191,0.15)' : 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm }}>
                  <Ionicons name={a.icon} size={24} color={i === 2 ? colors.accent.primary : colors.text.primary} />
                </View>
                <Text style={{ ...typography.caption, color: colors.text.secondary }}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Transactions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
          <TouchableOpacity><Text style={{ ...typography.labelSmall, color: colors.accent.primary }}>عرض الكل</Text></TouchableOpacity>
          <Text style={{ ...typography.h4, color: colors.text.primary }}>آخر المعاملات</Text>
        </View>

        {mockTransactions.map((t) => (
          <Card key={t.id} style={{ marginBottom: spacing.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...typography.label, color: t.amount > 0 ? colors.status.success : colors.emergency.primary }}>
                {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)} ر.س
              </Text>
              <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: spacing.md }}>
                <Text style={{ ...typography.label, color: colors.text.primary }}>{t.title}</Text>
                <Text style={{ ...typography.caption, color: colors.text.muted, marginTop: 2 }}>{t.date}</Text>
              </View>
              <View style={{ width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: t.color + '15', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={t.icon || 'card'} size={20} color={t.color} />
              </View>
            </View>
          </Card>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default WalletScreen;
