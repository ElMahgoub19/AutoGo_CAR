// AutoGo - Notifications Screen (Design Image 16)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import { mockNotifications } from '../data/mockData';
import type { RootState } from '../types';

const typeColors = { urgent: colors.emergency.primary, success: colors.status.success, promo: '#F6AD55', reminder: colors.status.info };
const typeIcons = { urgent: 'alert-circle', success: 'checkmark-circle', promo: 'pricetag', reminder: 'alarm' };

const NotificationsScreen = ({ navigation }) => {
  const today = mockNotifications.filter(n => n.isToday);
  const earlier = mockNotifications.filter(n => !n.isToday);

  const renderNotif = (notif) => (
    <Card key={notif.id} style={styles.notifCard}>
      <View style={styles.notifRow}>
        <View style={[styles.notifIcon, { backgroundColor: typeColors[notif.type] + '15' }]}>
          <Ionicons name={typeIcons[notif.type] as any} size={22} color={typeColors[notif.type]} />
        </View>
        <View style={styles.notifContent}>
          <Text style={styles.notifTitle}>{notif.title}</Text>
          <Text style={styles.notifBody} numberOfLines={2}>{notif.body}</Text>
          <View style={styles.notifFooter}>
            <Text style={styles.notifTime}>{notif.time}</Text>
            {notif.action && (
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>{notif.action}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="مركز الإشعارات" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {today.length > 0 && <Text style={styles.sectionTitle}>اليوم</Text>}
        {today.map(renderNotif)}
        {earlier.length > 0 && <Text style={styles.sectionTitle}>سابقة</Text>}
        {earlier.map(renderNotif)}
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base },
  sectionTitle: { ...typography.label, color: colors.text.tertiary, textAlign: 'right', marginVertical: spacing.md },
  notifCard: { marginBottom: spacing.md },
  notifRow: { flexDirection: 'row' },
  notifIcon: { width: 44, height: 44, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.md },
  notifContent: { flex: 1, alignItems: 'flex-end' },
  notifTitle: { ...typography.label, color: colors.text.primary },
  notifBody: { ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right', marginTop: 4, lineHeight: 20 },
  notifFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: spacing.sm },
  notifTime: { ...typography.caption, color: colors.text.muted },
  actionBtn: { backgroundColor: 'rgba(45,212,191,0.12)', borderRadius: borderRadius.sm, paddingHorizontal: 12, paddingVertical: 4 },
  actionText: { ...typography.caption, color: colors.accent.primary, fontWeight: '600' },
});

export default NotificationsScreen;
