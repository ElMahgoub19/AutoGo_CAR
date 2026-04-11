// AutoGo - Payment Screen (Design Image 20)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { requestTow } from '../store/slices/ordersSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { paymentMethods } from '../data/mockData';

const PaymentScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const price = route?.params?.price || 150;
  const [selectedMethod, setSelectedMethod] = useState('apple_pay');

  const handlePay = async () => {
    if (route?.params?.type === 'tow') {
      dispatch(requestTow({ price }));
      navigation.navigate('Searching');
    } else {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="ملخص الطلب والدفع" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Price summary */}
        <Card style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceAmount}>{price.toFixed(2)} ر.س</Text>
            <Text style={styles.priceLabel}>التكلفة التقديرية</Text>
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownValue}>{price.toFixed(2)} ر.س</Text>
            <Text style={styles.breakdownLabel}>رسوم الخدمة</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={[styles.breakdownValue, { color: colors.status.success }]}>مجاناً</Text>
            <Text style={styles.breakdownLabel}>رسوم التطبيق</Text>
          </View>
        </Card>

        {/* Payment methods */}
        <Text style={styles.sectionTitle}>اختر وسيلة الدفع</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity key={method.id} activeOpacity={0.8} onPress={() => setSelectedMethod(method.id)}>
            <Card style={[styles.methodCard, selectedMethod === method.id && styles.selectedMethod]}>
              <View style={styles.methodRow}>
                <View style={styles.radioOuter}>
                  {selectedMethod === method.id && <View style={styles.radioInner} />}
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  {method.description && <Text style={styles.methodDesc}>{method.description}</Text>}
                </View>
                <View style={styles.methodIcon}>
                  <Ionicons name={method.icon} size={24} color={colors.text.primary} />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* Promo */}
        <Card style={styles.promoCard}>
          <View style={styles.promoRow}>
            <Ionicons name="chevron-back" size={18} color={colors.accent.primary} />
            <Text style={styles.promoText}>هل لديك كود خصم؟</Text>
            <Ionicons name="pricetag-outline" size={20} color={colors.accent.primary} />
          </View>
        </Card>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button title="تأكيد ودفع" onPress={handlePay} icon="shield-checkmark-outline" iconPosition="right" />
        <View style={styles.secureRow}>
          <Text style={styles.secureText}>جميع معاملاتك مشفرة وآمنة تماماً</Text>
          <Ionicons name="lock-closed-outline" size={14} color={colors.text.muted} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base, paddingBottom: 140 },
  priceCard: { marginBottom: spacing.lg },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  priceLabel: { ...typography.body, color: colors.text.secondary },
  priceAmount: { ...typography.price, color: colors.accent.primary },
  priceDivider: { height: 1, backgroundColor: colors.divider, marginBottom: spacing.md },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  breakdownLabel: { ...typography.bodySmall, color: colors.text.tertiary },
  breakdownValue: { ...typography.label, color: colors.text.primary },
  sectionTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.md },
  methodCard: { marginBottom: spacing.md },
  selectedMethod: { borderColor: colors.accent.primary, borderWidth: 1.5 },
  methodRow: { flexDirection: 'row', alignItems: 'center' },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.accent.primary, alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.accent.primary },
  methodInfo: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  methodName: { ...typography.label, color: colors.text.primary },
  methodDesc: { ...typography.caption, color: colors.text.tertiary, marginTop: 2 },
  methodIcon: { width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  promoCard: { marginTop: spacing.sm },
  promoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  promoText: { ...typography.label, color: colors.accent.primary, flex: 1, textAlign: 'right', marginHorizontal: spacing.sm },
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.base, paddingBottom: 30, backgroundColor: colors.background.primary },
  secureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.sm },
  secureText: { ...typography.caption, color: colors.text.muted },
});

export default PaymentScreen;
