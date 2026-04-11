// AutoGo - Call Screen (Design Image 32)
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import { mockDriver } from '../data/mockData';

const CallScreen = ({ navigation }) => {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <LinearGradient colors={['#0A2020', '#0D3B3A', '#0A1F2E']} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color={colors.text.secondary} />
            </View>
          </View>
        </View>

        <Text style={styles.name}>{mockDriver.name}</Text>
        <Text style={styles.duration}>{formatDuration(duration)}</Text>
        <Text style={styles.detail}>{mockDriver.towType} • {mockDriver.plate}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          {[
            { icon: isMuted ? 'mic-off' : 'mic', label: 'كتم', onPress: () => setIsMuted(!isMuted), active: isMuted },
            { icon: 'volume-high', label: 'المكبر', onPress: () => setIsSpeaker(!isSpeaker), active: isSpeaker },
            { icon: 'keypad', label: 'الأرقام', onPress: () => {} },
            { icon: 'chatbubble-outline', label: 'الدردشة', onPress: () => { navigation.goBack(); navigation.navigate('Chat'); } },
          ].map((action, i) => (
            <TouchableOpacity key={i} style={styles.actionItem} onPress={action.onPress}>
              <View style={[styles.actionIcon, action.active && styles.actionIconActive]}>
                <Ionicons name={action.icon} size={24} color={action.active ? colors.accent.primary : colors.text.secondary} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* End call */}
      <TouchableOpacity style={styles.endCallBtn} onPress={() => navigation.goBack()}>
        <LinearGradient colors={['#E53E3E', '#C53030']} style={styles.endCallGradient}>
          <Ionicons name="call" size={28} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
          <Text style={styles.endCallText}>إنهاء المكالمة</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatarContainer: { marginBottom: spacing.xl },
  avatarRing: {
    width: 150, height: 150, borderRadius: 75,
    borderWidth: 3, borderColor: colors.accent.primary + '50',
    alignItems: 'center', justifyContent: 'center',
  },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center',
  },
  name: { ...typography.h2, color: colors.text.primary, marginBottom: spacing.sm },
  duration: { ...typography.h3, color: colors.accent.primary, marginBottom: spacing.sm },
  detail: { ...typography.body, color: colors.text.secondary },
  actions: { flexDirection: 'row', gap: spacing.xl, marginTop: spacing.massive },
  actionItem: { alignItems: 'center' },
  actionIcon: {
    width: 56, height: 56, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  actionIconActive: { backgroundColor: 'rgba(45,212,191,0.15)', borderColor: colors.accent.primary + '40' },
  actionLabel: { ...typography.caption, color: colors.text.secondary },
  endCallBtn: { marginHorizontal: spacing.xl, marginBottom: 40, borderRadius: borderRadius.lg, overflow: 'hidden' },
  endCallGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: spacing.md },
  endCallText: { ...typography.h4, color: '#FFF' },
});

export default CallScreen;
