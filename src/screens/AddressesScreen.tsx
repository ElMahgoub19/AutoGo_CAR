// AutoGo - Addresses Screen (Connected to Backend)
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { addAddressAsync, deleteAddressAsync } from '../store/slices/addressSlice';
import type { RootState, AppDispatch } from '../types';

const AddressesScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { addresses, isLoading } = useSelector((state: RootState) => state.address);
  const [modalVisible, setModalVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddAddress = async () => {
    if (!label || !addressDetail) {
      Alert.alert('خطأ', 'يرجى إدخال اسم العنوان والتفاصيل');
      return;
    }
    setIsSubmitting(true);
    await dispatch(addAddressAsync({ label, address: addressDetail }));
    setIsSubmitting(false);
    setModalVisible(false);
    setLabel('');
    setAddressDetail('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('تأكيد الحذف', 'هل أنت متأكد من حذف هذا العنوان؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: () => dispatch(deleteAddressAsync(id)) }
    ]);
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="العناوين المحفوظة" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base, paddingBottom: spacing.xl }}>
        {isLoading && !addresses.length ? (
          <ActivityIndicator size="large" color={colors.accent.primary} style={{ marginTop: 50 }} />
        ) : addresses.length === 0 ? (
          <Text style={{ ...typography.body, color: colors.text.secondary, textAlign: 'center', marginTop: 50 }}>لا توجد عناوين محفوظة.</Text>
        ) : (
          addresses.map((addr: any) => (
            <Card key={addr.id} style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handleDelete(addr.id)}>
                  <Ionicons name="trash-outline" size={18} color={colors.emergency.primary} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: spacing.md }}>
                  <Text style={{ ...typography.label, color: colors.text.primary }}>{addr.label}</Text>
                  <Text style={{ ...typography.bodySmall, color: colors.text.secondary, marginTop: 4 }}>{addr.address}</Text>
                </View>
                <View style={{ width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: 'rgba(45,212,191,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={addr.label.includes('العمل') ? 'briefcase-outline' : 'home-outline' as any} size={22} color={colors.accent.primary} />
                </View>
              </View>
            </Card>
          ))
        )}
        <Button 
          title="إضافة عنوان جديد" 
          onPress={() => setModalVisible(true)} 
          variant="secondary" 
          icon="add-circle-outline" 
          iconPosition="right" 
          style={{ marginTop: spacing.md }} 
        />
      </ScrollView>

      {/* Add Address Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: colors.background.secondary, padding: spacing.lg, borderTopLeftRadius: borderRadius.lg, borderTopRightRadius: borderRadius.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={{ ...typography.h3, color: colors.text.primary }}>عنوان جديد</Text>
              <View style={{ width: 24 }} />
            </View>

            <Input 
              label="اسم العنوان (مثال: المنزل، العمل)" 
              value={label} 
              onChangeText={setLabel} 
              placeholder="المنزل" 
            />
            <Input 
              label="تفاصيل العنوان" 
              value={addressDetail} 
              onChangeText={setAddressDetail} 
              placeholder="شارع التسعين، التجمع الخامس..." 
              multiline 
            />

            <Button 
              title="حفظ العنوان" 
              onPress={handleAddAddress} 
              loading={isSubmitting} 
              style={{ marginTop: spacing.md }} 
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default AddressesScreen;
