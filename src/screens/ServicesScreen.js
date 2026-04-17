// AutoGo - Services Screen (Design Image 23)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectService, setCategory } from '../store/slices/servicesSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import { serviceCategories } from '../data/mockData';

const ServicesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { services, activeCategory } = useSelector(state => state.services);

  const filtered = activeCategory === 'الكل' ? services : services.filter(s => s.category === activeCategory);

  const handleSelectService = (service) => {
    dispatch(selectService(service));
    navigation.navigate('WorkshopList');
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="الخدمات" onBack={() => navigation.goBack()} />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        {serviceCategories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => dispatch(setCategory(cat))}
            style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
          >
            <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content}>
        {filtered.map((service) => (
          <Card key={service.id} style={styles.serviceCard} onPress={() => handleSelectService(service)}>
            <View style={styles.serviceRow}>
              <View style={styles.serviceIcon}>
                <Ionicons name={service.icon || 'construct'} size={26} color={colors.accent.primary} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDesc} numberOfLines={2}>{service.description}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceText}>يبدأ من {service.price} ج.م</Text>
                  <Ionicons name="chevron-back" size={16} color={colors.accent.primary} />
                </View>
              </View>
            </View>
          </Card>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  categories: { paddingHorizontal: spacing.base, marginBottom: spacing.base, flexDirection: 'row-reverse', alignItems: 'center', height: 50 },
  categoryChip: {
    paddingHorizontal: 16, height: 40, minWidth: 90, borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center', marginLeft: spacing.sm,
  },
  categoryChipActive: { backgroundColor: colors.accent.primary, borderColor: colors.accent.primary },
  categoryText: { ...typography.label, color: colors.text.secondary },
  categoryTextActive: { color: colors.button.primaryText },
  content: { paddingHorizontal: spacing.base },
  serviceCard: { marginBottom: spacing.md },
  serviceRow: { flexDirection: 'row', alignItems: 'center' },
  serviceIcon: {
    width: 56, height: 56, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45,212,191,0.1)', borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
    alignItems: 'center', justifyContent: 'center', marginLeft: spacing.md,
  },
  serviceInfo: { flex: 1, alignItems: 'flex-end' },
  serviceName: { ...typography.h4, color: colors.text.primary },
  serviceDesc: { ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right', marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  priceText: { ...typography.labelSmall, color: colors.accent.primary },
});

export default ServicesScreen;
