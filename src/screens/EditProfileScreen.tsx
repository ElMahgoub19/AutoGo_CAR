// AutoGo - Remaining helper screens (Edit Profile, Addresses, Wallet, PaymentMethods, OrderDetail, OrderStatus, Invoice, Support, Terms)
// EditProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { updateProfileAsync } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import type { RootState } from '../types';
import { useAppDispatch } from '../hooks';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useSelector((s: RootState) => s.auth);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');

  const handleSave = async () => {
    await dispatch(updateProfileAsync({ name, email, phone, city }));
    navigation.goBack();
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="تعديل الملف الشخصي" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: 40 }}>
        <Input label="الاسم الكامل" value={name} onChangeText={setName} icon="person-outline" />
        <Input label="البريد الإلكتروني" value={email} onChangeText={setEmail} icon="mail-outline" keyboardType="email-address" />
        <Input label="رقم الجوال" value={phone} onChangeText={setPhone} icon="call-outline" keyboardType="phone-pad" />
        <Input label="المدينة" value={city} onChangeText={setCity} icon="location-outline" />
        <Button title="حفظ التعديلات" onPress={handleSave} loading={isLoading} style={{ marginTop: spacing.xl }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default EditProfileScreen;
