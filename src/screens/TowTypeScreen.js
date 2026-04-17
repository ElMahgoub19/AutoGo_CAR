// AutoGo - Tow Type Selection Screen (Design Image 19)
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { towTypes } from '../data/mockData';

const TowTypeScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="اختر نوع الونش" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>حدد نوع الونش المناسب لحالة سيارتك</Text>

        {towTypes.map((tow) => (
          <TouchableOpacity key={tow.id} activeOpacity={0.8} onPress={() => setSelected(tow.id)}>
            <Card style={[styles.towCard, selected === tow.id && styles.selectedCard]}>
              <View style={styles.towRow}>
                <View style={styles.radioOuter}>
                  {selected === tow.id && <View style={styles.radioInner} />}
                </View>
                <View style={styles.towInfo}>
                  <Text style={styles.towName}>{tow.name}</Text>
                  <Text style={styles.towDesc}>{tow.description}</Text>
                  <Text style={styles.towPrice}>{tow.price} ج.م</Text>
                </View>
                <View style={[styles.towIcon, selected === tow.id && styles.selectedIcon]}>
                  <Ionicons name="car" size={28} color={selected === tow.id ? colors.accent.primary : colors.text.tertiary} />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button
          title="متابعة الدفع"
          onPress={() => navigation.navigate('Payment', { type: 'tow', price: towTypes.find(t => t.id === selected)?.price || 100 })}
          disabled={!selected}
          icon="arrow-back"
          iconPosition="left"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base, paddingBottom: 120 },
  subtitle: { ...typography.body, color: colors.text.secondary, textAlign: 'center', marginBottom: spacing.xl },
  towCard: { marginBottom: spacing.md },
  selectedCard: { borderColor: colors.accent.primary, borderWidth: 1.5 },
  towRow: { flexDirection: 'row', alignItems: 'center' },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.accent.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.accent.primary },
  towInfo: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  towName: { ...typography.h4, color: colors.text.primary },
  towDesc: { ...typography.bodySmall, color: colors.text.secondary, textAlign: 'right', marginTop: 2 },
  towPrice: { ...typography.label, color: colors.accent.primary, marginTop: spacing.sm },
  towIcon: {
    width: 56, height: 56, borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center',
  },
  selectedIcon: { backgroundColor: 'rgba(45,212,191,0.12)' },
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.base, paddingBottom: 40, backgroundColor: colors.background.primary },
});

export default TowTypeScreen;
