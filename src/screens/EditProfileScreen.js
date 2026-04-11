// AutoGo - Remaining helper screens (Edit Profile, Addresses, Wallet, PaymentMethods, OrderDetail, OrderStatus, Invoice, Support, Terms)
// EditProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(s => s.auth);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState(user?.city || '');

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="تعديل الملف الشخصي" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: 40 }}>
        <Input label="الاسم الكامل" value={name} onChangeText={setName} icon="person-outline" />
        <Input label="البريد الإلكتروني" value={email} onChangeText={setEmail} icon="mail-outline" keyboardType="email-address" />
        <Input label="المدينة" value={city} onChangeText={setCity} icon="location-outline" />
        <Button title="حفظ التعديلات" onPress={() => { dispatch(updateProfile({ name, email, city })); navigation.goBack(); }} style={{ marginTop: spacing.xl }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default EditProfileScreen;
