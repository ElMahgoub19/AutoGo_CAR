// AutoGo - History Screen (Design Image 37)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import type { RootState } from '../types';

const statusColors = { 'مكتمل': colors.status.success, 'قيد التنفيذ': colors.status.warning, 'ملغي': colors.emergency.primary };

const HistoryScreen = ({ navigation }) => {
  const { history } = useSelector((state: RootState) => state.orders);
  const [filter, setFilter] = useState('الكل');
  const [search, setSearch] = useState('');
  const filters = ['الكل', 'تسلا موديل 3', 'مرسيدس S-Class'];

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="سجل الخدمات" onBack={() => navigation.goBack()} leftIcon="options-outline" />

      <View style={styles.searchContainer}>
        <Input value={search} onChangeText={setSearch} placeholder="ابحث عن خدمة، تاريخ أو سيارة..." icon="search-outline" style={{ marginBottom: 0 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((f) => (
          <TouchableOpacity key={f} style={[styles.filterChip, filter === f && styles.activeFilter]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content}>
        {history.map((order) => (
          <Card key={order.id} style={styles.orderCard} onPress={() => navigation.navigate('OrderDetail', { order })}>
            <View style={styles.orderHeader}>
              <View style={[styles.statusBadge, { backgroundColor: (statusColors[order.status] || colors.text.muted) + '20' }]}>
                <Text style={[styles.statusText, { color: statusColors[order.status] || colors.text.muted }]}>{order.status}</Text>
              </View>
              <View style={styles.orderTitleRow}>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <View style={styles.orderIcon}>
                  <Ionicons name={order.icon === 'truck' ? 'car' : order.icon === 'sparkles' ? 'sparkles' : 'construct' as any} size={22} color={colors.accent.primary} />
                </View>
              </View>
            </View>
            <Text style={styles.orderCar}>{order.car?.brand} {order.car?.model} • {order.car?.plate}</Text>

            <View style={styles.orderFooter}>
              <View style={styles.orderActions}>
                <TouchableOpacity style={styles.reorderBtn}>
                  <Ionicons name="refresh" size={16} color={colors.accent.primary} />
                  <Text style={styles.reorderText}>إعادة طلب</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsBtn}>
                  <Text style={styles.detailsText}>التفاصيل</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>التاريخ والوقت</Text>
                <Text style={styles.dateValue}>{order.date}</Text>
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
  searchContainer: { paddingHorizontal: spacing.base, marginBottom: spacing.md },
  filters: { paddingHorizontal: spacing.base, gap: spacing.sm, flexDirection: 'row-reverse', marginBottom: spacing.base },
  filterChip: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: borderRadius.full, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  activeFilter: { backgroundColor: colors.accent.primary, borderColor: colors.accent.primary },
  filterText: { ...typography.labelSmall, color: colors.text.secondary },
  activeFilterText: { color: colors.button.primaryText },
  content: { paddingHorizontal: spacing.base },
  orderCard: { marginBottom: spacing.md },
  orderHeader: { marginBottom: spacing.sm },
  orderTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm },
  orderTitle: { ...typography.h4, color: colors.text.primary },
  orderIcon: { width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: borderRadius.sm, alignSelf: 'flex-start', marginBottom: spacing.sm },
  statusText: { ...typography.caption, fontWeight: '600' },
  orderCar: { ...typography.bodySmall, color: colors.text.tertiary, textAlign: 'right' },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: spacing.md },
  dateRow: { alignItems: 'flex-end' },
  dateLabel: { ...typography.caption, color: colors.text.muted },
  dateValue: { ...typography.bodySmall, color: colors.text.secondary, marginTop: 2 },
  orderActions: { flexDirection: 'row', gap: spacing.sm },
  reorderBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: colors.accent.primary + '40' },
  reorderText: { ...typography.caption, color: colors.accent.primary },
  detailsBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: borderRadius.sm, backgroundColor: 'rgba(255,255,255,0.06)' },
  detailsText: { ...typography.caption, color: colors.text.secondary },
});

export default HistoryScreen;
