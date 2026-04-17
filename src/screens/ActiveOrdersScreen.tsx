// AutoGo - Active Orders Screen (Design Image 29)
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
import Button from '../components/Button';
import type { RootState } from '../types';

const ActiveOrdersScreen = ({ navigation }) => {
  const { activeOrders } = useSelector((state: RootState) => state.orders);
  const [filter, setFilter] = React.useState('الكل');
  const filters = ['الكل', 'ونش', 'صيانة'];

  const filtered = filter === 'الكل' ? activeOrders : activeOrders.filter(o => o.type === filter);

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="الطلبات النشطة" onBack={() => navigation.navigate('HomeTab')} />

      {/* Filter tabs */}
      <View style={styles.filters}>
        {filters.map((f) => (
          <TouchableOpacity key={f} style={[styles.filterChip, filter === f && styles.activeFilter]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>{f === 'الكل' ? `الكل (${activeOrders.length})` : f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filtered.map((order) => (
          <Card key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: order.statusColor }]} />
                <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
              </View>
              <View style={styles.orderTitleRow}>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <View style={styles.orderIcon}>
                  <Ionicons name={order.icon === 'truck' ? 'car' : 'construct' as any} size={22} color={colors.accent.primary} />
                </View>
              </View>
              <Text style={styles.orderId}>رقم الطلب: #{order.id}</Text>
            </View>

            {order.driver && (
              <View style={styles.driverRow}>
                <TouchableOpacity style={styles.callBtn}>
                  <Ionicons name="call-outline" size={18} color={colors.accent.primary} />
                </TouchableOpacity>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{order.driver.name}</Text>
                  <Text style={styles.driverDetail}>{order.driver.towType} • {order.driver.plate}</Text>
                </View>
                <View style={styles.driverAvatar}>
                  <Ionicons name="person" size={22} color={colors.text.secondary} />
                </View>
              </View>
            )}

            {order.date && (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>{order.date}</Text>
                <Ionicons name="calendar-outline" size={16} color={colors.text.tertiary} />
              </View>
            )}

            {order.location && (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>{order.location}</Text>
                <Ionicons name="location-outline" size={16} color={colors.text.tertiary} />
              </View>
            )}

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.moreBtn}>
                <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
              <Button
                title={order.type === 'ونش' ? 'تتبع المسار الآن' : 'عرض التفاصيل'}
                onPress={() => order.type === 'ونش' ? navigation.navigate('Tracking') : navigation.navigate('OrderStatus', { order })}
                size="medium"
                style={{ flex: 1, marginLeft: spacing.sm }}
                icon={order.type === 'ونش' ? 'navigate-outline' : undefined}
                iconPosition="left"
              />
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
  filters: { flexDirection: 'row', paddingHorizontal: spacing.base, marginBottom: spacing.base, gap: spacing.sm, justifyContent: 'flex-end' },
  filterChip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  activeFilter: { backgroundColor: colors.accent.primary, borderColor: colors.accent.primary },
  filterText: { ...typography.labelSmall, color: colors.text.secondary },
  activeFilterText: { color: colors.button.primaryText },
  content: { paddingHorizontal: spacing.base },
  orderCard: { marginBottom: spacing.base },
  orderHeader: { marginBottom: spacing.md },
  orderTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm, marginBottom: 4 },
  orderTitle: { ...typography.h4, color: colors.text.primary },
  orderIcon: {
    width: 44, height: 44, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45,212,191,0.12)', alignItems: 'center', justifyContent: 'center',
  },
  orderId: { ...typography.caption, color: colors.text.tertiary, textAlign: 'right' },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.sm, marginBottom: spacing.sm,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { ...typography.caption, fontWeight: '600' },
  driverRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: borderRadius.md,
    padding: spacing.md, marginBottom: spacing.md,
  },
  driverAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center',
  },
  driverInfo: { flex: 1, alignItems: 'flex-end', marginRight: spacing.md },
  driverName: { ...typography.label, color: colors.text.primary },
  driverDetail: { ...typography.caption, color: colors.text.tertiary, marginTop: 2 },
  callBtn: {
    width: 40, height: 40, borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(45,212,191,0.12)', alignItems: 'center', justifyContent: 'center',
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm, marginBottom: spacing.sm },
  infoText: { ...typography.bodySmall, color: colors.text.secondary },
  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
  moreBtn: {
    width: 44, height: 44, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center',
  },
});

export default ActiveOrdersScreen;
