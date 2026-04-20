// AutoGo - Workshop List Screen (Design Image 24)
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectWorkshop, fetchWorkshops } from '../store/slices/servicesSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import MapPlaceholder from '../components/MapPlaceholder';
import type { RootState } from '../types';
import { useAppDispatch } from '../hooks';

const WorkshopListScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { workshops } = useSelector((state: RootState) => state.services);

  // NOTE: API fetching disabled to preserve professional mock data.
  // useEffect(() => {
  //   dispatch(fetchWorkshops());
  // }, []);

  const handleSelect = (ws) => {
    dispatch(selectWorkshop(ws));
    navigation.navigate('WorkshopDetail', { workshop: ws });
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="مراكز الصيانة القريبة" onBack={() => navigation.goBack()} />

      <MapPlaceholder height={200} style={{ marginHorizontal: spacing.base, marginBottom: spacing.base }} label="مراكز الصيانة بالقرب منك" />

      <ScrollView contentContainerStyle={styles.content}>
        {workshops.map((ws) => (
          <Card key={ws.id} style={styles.wsCard} onPress={() => handleSelect(ws)}>
            <View style={styles.wsRow}>
              <View style={styles.wsImage}>
                <Ionicons name="business" size={30} color={colors.accent.primary} />
              </View>
              <View style={styles.wsInfo}>
                <Text style={styles.wsName}>{ws.name}</Text>
                <View style={styles.wsMeta}>
                  <Ionicons name="location-outline" size={14} color={colors.text.tertiary} />
                  <Text style={styles.wsAddress}>{ws.distance} كم</Text>
                  <Ionicons name="star" size={14} color={colors.rating.gold} />
                  <Text style={styles.wsRating}>{ws.rating}</Text>
                </View>
                <View style={styles.wsStatus}>
                  <View style={[styles.statusDot, { backgroundColor: ws.isOpen ? colors.status.success : colors.emergency.primary }]} />
                  <Text style={[styles.statusText, { color: ws.isOpen ? colors.status.success : colors.emergency.primary }]}>
                    {ws.isOpen ? 'مفتوح الآن' : 'مغلق'}
                  </Text>
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
  content: { paddingHorizontal: spacing.base },
  wsCard: { marginBottom: spacing.md },
  wsRow: { flexDirection: 'row', alignItems: 'center' },
  wsImage: {
    width: 70, height: 70, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(45,212,191,0.08)', alignItems: 'center', justifyContent: 'center', marginLeft: spacing.md,
  },
  wsInfo: { flex: 1, alignItems: 'flex-end' },
  wsName: { ...typography.label, color: colors.text.primary, textAlign: 'right' },
  wsMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  wsAddress: { ...typography.caption, color: colors.text.tertiary },
  wsRating: { ...typography.caption, color: colors.rating.gold },
  wsStatus: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { ...typography.caption },
});

export default WorkshopListScreen;
