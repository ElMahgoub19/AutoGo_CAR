// AutoGo - Service Method Screen (Design Image 27)
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { setServiceMethod } from '../store/slices/servicesSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import type { RootState } from '../types';
import { useAppDispatch } from '../hooks';

const ServiceMethodScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState('center');

  const methods = [
    {
      id: 'center',
      title: 'زيارة مركز الصيانة',
      desc: 'احجز موعداً في أقرب مركز صيانة معتمد واستمتع بخدمة احترافية في بيئة مجهزة بالكامل.',
      icon: 'business-outline',
      tags: ['أكثر شمولاً', 'انتظار مريح'],
    },
    {
      id: 'mobile',
      title: 'الميكانيكي المتنقل',
      desc: 'سنأتي إليك أينما كنت! خدمة صيانة دورية سريعة في منزلك أو مكان عملك دون عناء التنقل.',
      icon: 'car-outline',
      tags: ['في موقعك', 'توفير للوقت'],
    },
  ];

  const handleContinue = () => {
    dispatch(setServiceMethod(selected as 'center' | 'mobile'));
    navigation.navigate('BookingReview');
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>كيف ترغب في{'\n'}<Text style={styles.titleAccent}>صيانة مركبتك؟</Text></Text>
        <Text style={styles.subtitle}>اختر الطريقة التي تناسب جدولك وموقعك لنقدم لك أفضل خدمة.</Text>

        {methods.map((method) => (
          <TouchableOpacity key={method.id} activeOpacity={0.8} onPress={() => setSelected(method.id)}>
            <Card style={[styles.methodCard, selected === method.id && styles.selectedCard]}>
              <View style={styles.methodHeader}>
                <View style={styles.radioOuter}>
                  {selected === method.id && <View style={styles.radioInner} />}
                </View>
                <View style={styles.methodIcon}>
                  <Ionicons name={method.icon as any} size={26} color={colors.accent.primary} />
                </View>
              </View>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodDesc}>{method.desc}</Text>
              <View style={styles.tagsRow}>
                {method.tags.map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <Button title="استمرار" onPress={handleContinue} icon="arrow-back" iconPosition="left" />
        <Text style={styles.bottomHint}>يمكنك تغيير نوع الخدمة لاحقاً من خلال إعدادات الحجز.</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.xl },
  title: { ...typography.h1, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.md },
  titleAccent: { color: colors.accent.primary },
  subtitle: { ...typography.body, color: colors.text.secondary, textAlign: 'right', marginBottom: spacing.xxl, lineHeight: 24 },
  methodCard: { marginBottom: spacing.base },
  selectedCard: { borderColor: colors.accent.primary, borderWidth: 1.5 },
  methodHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.accent.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.accent.primary },
  methodIcon: {
    width: 52, height: 52, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center',
  },
  methodTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right' },
  methodDesc: { ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right', marginTop: 6, lineHeight: 22 },
  tagsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.sm, marginTop: spacing.md },
  tag: {
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  tagText: { ...typography.caption, color: colors.text.secondary },
  bottomContainer: { paddingHorizontal: spacing.xl, paddingBottom: 30 },
  bottomHint: { ...typography.caption, color: colors.text.muted, textAlign: 'center', marginTop: spacing.sm },
});

export default ServiceMethodScreen;
