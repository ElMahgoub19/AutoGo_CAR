// AutoGo - Order Detail/Status + Invoice + Support + Terms (helper screens)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const OrderStatusScreen = ({ navigation, route }) => {
  const order = route?.params?.order || {};
  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="تفاصيل الطلب" onBack={() => navigation.goBack()} leftIcon="information-circle-outline" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base }}>
        <Card variant="accent" style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View><Text style={{ ...typography.caption, color: colors.text.muted }}>رقم الطلب</Text><Text style={{ ...typography.label, color: colors.accent.primary }}>#{order.id || 'ORD-77291'}</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Text style={{ ...typography.h4, color: colors.text.primary }}>{order.title || 'طلب مكتمل'}</Text>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(56,161,105,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="checkmark-circle" size={24} color={colors.status.success} />
              </View>
            </View>
          </View>
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.label, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.md }}>بيانات المركبة</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.md }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ ...typography.h4, color: colors.text.primary }}>تسلا موديل 3</Text>
              <Text style={{ ...typography.bodySmall, color: colors.text.tertiary }}>أ ب ج 1234 • موديل 2023</Text>
            </View>
            <View style={{ width: 56, height: 40, borderRadius: borderRadius.sm, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="car-sport" size={28} color={colors.text.primary} />
            </View>
          </View>
        </Card>

        <Button title="عرض الفاتورة" onPress={() => navigation.navigate('Invoice')} variant="secondary" icon="receipt-outline" iconPosition="right" />
        <Button title="تقييم الخدمة" onPress={() => navigation.navigate('Rating', { orderId: order.id })} style={{ marginTop: spacing.md }} icon="star-outline" iconPosition="right" />
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default OrderStatusScreen;
