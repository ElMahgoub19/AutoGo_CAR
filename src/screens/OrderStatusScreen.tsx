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
import type { RootState } from '../types';

import { useSelector } from 'react-redux';

const OrderStatusScreen = ({ navigation, route }) => {
  const order = route?.params?.order || {};
  const { activeCar } = useSelector((state: RootState) => state.garage);
  const displayCar = order.car || activeCar;
  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="تفاصيل الطلب" onBack={() => navigation.goBack()} leftIcon="information-circle-outline" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base }}>
        <Card variant="accent" style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View><Text style={{ ...typography.caption, color: colors.text.muted }}>رقم الطلب</Text><Text style={{ ...typography.label, color: colors.accent.primary }}>#{order.id || 'ORD-77291'}</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Text style={{ ...typography.h4, color: colors.text.primary }}>{order.title || (order.type === 'ونش' ? 'طلب ونش إنقاذ' : 'خدمة صيانة')}</Text>
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
              <Text style={{ ...typography.h4, color: colors.text.primary }}>
                {displayCar?.brand ? `${displayCar.brand} ${displayCar.model || ''}` : 'سيارة غير محددة'}
              </Text>
              {displayCar?.plate && (
                <Text style={{ ...typography.bodySmall, color: colors.text.tertiary }}>
                  {displayCar.plate} {displayCar.year ? `• موديل ${displayCar.year}` : ''}
                </Text>
              )}
            </View>
            <View style={{ width: 56, height: 40, borderRadius: borderRadius.sm, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="car-sport" size={28} color={colors.text.primary} />
            </View>
          </View>
        </Card>

        {/* Service Details Section */}
        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.label, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.md }}>تفاصيل الخدمة</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm }}>
            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: spacing.md }}>
              <Text style={{ ...typography.label, color: colors.text.primary }}>
                {order.service?.name || order.title || (order.type === 'ونش' ? 'طلب ونش إنقاذ' : 'خدمة صيانة')}
              </Text>
              <Text style={{ ...typography.bodySmall, color: colors.text.tertiary, textAlign: 'right', marginTop: 4 }}>
                {order.type === 'ونش' ? 'طلب استغاثة ونش إنقاذ للموقع المحدد' : 'صيانة ذكية تمت جدولتها عبر التطبيق'}
              </Text>
              {order.price > 0 && (
                <Text style={{ ...typography.label, color: colors.accent.primary, marginTop: spacing.sm }}>
                  {order.price} ج.م
                </Text>
              )}
            </View>
            <View style={{ width: 40, height: 40, borderRadius: borderRadius.sm, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={order.type === 'ونش' ? 'warning' : 'build'} size={20} color={colors.accent.primary} />
            </View>
          </View>
          
          {order.workshop && (
             <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.divider }}>
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: spacing.md }}>
                <Text style={{ ...typography.label, color: colors.text.primary }}>{order.workshop.name}</Text>
                <Text style={{ ...typography.bodySmall, color: colors.text.tertiary, textAlign: 'right', marginTop: 4 }}>المركز المعتمد لتقديم الخدمة</Text>
              </View>
              <View style={{ width: 40, height: 40, borderRadius: borderRadius.sm, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="business" size={20} color={colors.accent.primary} />
              </View>
            </View>
          )}
        </Card>

        <Button title="عرض الفاتورة" onPress={() => navigation.navigate('Invoice')} variant="secondary" icon="receipt-outline" iconPosition="right" />
        <Button title="تقييم الخدمة" onPress={() => navigation.navigate('Rating', { orderId: order.id })} style={{ marginTop: spacing.md }} icon="star-outline" iconPosition="right" />
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default OrderStatusScreen;
