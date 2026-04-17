// AutoGo - Addresses Screen (Design Image 14)
import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { mockAddresses } from '../data/mockData';
import type { RootState } from '../types';

const AddressesScreen = ({ navigation }) => (
  <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
    <Header title="العناوين المحفوظة" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base }}>
      {mockAddresses.map((addr) => (
        <Card key={addr.id} style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity><Ionicons name="create-outline" size={18} color={colors.accent.primary} /></TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: spacing.md }}>
              <Text style={{ ...typography.label, color: colors.text.primary }}>{addr.label}</Text>
              <Text style={{ ...typography.bodySmall, color: colors.text.secondary, marginTop: 4 }}>{addr.address}</Text>
            </View>
            <View style={{ width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={addr.icon === 'home' ? 'home-outline' : 'briefcase-outline' as any} size={22} color={colors.accent.primary} />
            </View>
          </View>
        </Card>
      ))}
      <Button title="إضافة عنوان جديد" onPress={() => {}} variant="secondary" icon="add-circle-outline" iconPosition="right" style={{ marginTop: spacing.md }} />
    </ScrollView>
  </LinearGradient>
);

export default AddressesScreen;
