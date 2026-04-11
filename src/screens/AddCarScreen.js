// AutoGo - Add Car Screen (Design Image 09)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addCar } from '../store/slices/garageSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const brands = ['تسلا', 'مرسيدس', 'بي إم دبليو', 'تويوتا', 'لكزس', 'هيونداي', 'كيا', 'نيسان'];

const AddCarScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [showBrands, setShowBrands] = useState(false);

  const handleAdd = () => {
    dispatch(addCar({ brand: brand || 'تسلا', model: model || 'موديل 3', year: parseInt(year) || 2024, plate: plate || 'أ ب ج 1234', mileage: 0, nextService: 5000, color: '#FFF', image: null, lastLocation: null }));
    navigation.goBack();
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="إضافة سيارة جديدة" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Car icon */}
        <View style={styles.carIconContainer}>
          <View style={styles.carIconCircle}>
            <Ionicons name="car-sport" size={60} color={colors.accent.primary} />
          </View>
          <Text style={styles.carIconLabel}>أدخل بيانات سيارتك</Text>
        </View>

        {/* Brand selector */}
        <Text style={styles.fieldLabel}>الشركة المصنعة</Text>
        <TouchableOpacity style={styles.selector} onPress={() => setShowBrands(!showBrands)}>
          <Ionicons name="chevron-down" size={20} color={colors.text.tertiary} />
          <Text style={[styles.selectorText, brand && { color: colors.text.primary }]}>
            {brand || 'اختر الشركة المصنعة'}
          </Text>
          <Ionicons name="car-outline" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        {showBrands && (
          <Card style={styles.dropdown}>
            {brands.map((b) => (
              <TouchableOpacity key={b} style={styles.dropdownItem} onPress={() => { setBrand(b); setShowBrands(false); }}>
                <Text style={[styles.dropdownText, b === brand && { color: colors.accent.primary }]}>{b}</Text>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        <Input label="الموديل" value={model} onChangeText={setModel} placeholder="مثال: موديل 3" icon="information-circle-outline" />
        <Input label="سنة الصنع" value={year} onChangeText={setYear} placeholder="مثال: 2024" keyboardType="number-pad" icon="calendar-outline" />
        <Input label="رقم اللوحة" value={plate} onChangeText={setPlate} placeholder="مثال: أ ب ج 1234" icon="document-outline" />

        <Button title="إضافة السيارة" onPress={handleAdd} icon="checkmark-circle" iconPosition="right" style={{ marginTop: spacing.xl }} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.xl, paddingBottom: 40 },
  carIconContainer: { alignItems: 'center', marginVertical: spacing.xl },
  carIconCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(45,212,191,0.08)', borderWidth: 2, borderColor: 'rgba(45,212,191,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  carIconLabel: { ...typography.body, color: colors.text.secondary },
  fieldLabel: { ...typography.label, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.sm },
  selector: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.input.background, borderRadius: borderRadius.md,
    borderWidth: 1, borderColor: colors.input.border, height: 52, paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
  },
  selectorText: { ...typography.body, color: colors.text.tertiary, flex: 1, textAlign: 'right', marginHorizontal: spacing.sm },
  dropdown: { marginBottom: spacing.base, marginTop: -spacing.sm },
  dropdownItem: { paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  dropdownText: { ...typography.body, color: colors.text.secondary, textAlign: 'right' },
});

export default AddCarScreen;
