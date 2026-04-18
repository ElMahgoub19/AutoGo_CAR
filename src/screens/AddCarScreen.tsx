// AutoGo - Add Car Screen 
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, Modal, TextInput, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { addCar } from '../store/slices/garageSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAppDispatch } from '../hooks';
import { getMakes, getModels, SelectOption } from '../services/carService';

// Reusable Select Component
const SelectField = ({ label, value, onSelect, data, placeholder, icon, isLoading = false }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const currentLabel = data.find((d: SelectOption) => d.value === value)?.label || '';

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item: SelectOption) => 
      item.label.toLowerCase().includes(search.toLowerCase()) || 
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity 
        style={styles.selector} 
        onPress={() => setModalVisible(true)}
        disabled={isLoading || data.length === 0}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.accent.primary} />
        ) : (
          <Ionicons name="chevron-down" size={20} color={colors.text.tertiary} />
        )}
        <Text style={[styles.selectorText, currentLabel && { color: colors.text.primary }]}>
          {currentLabel || placeholder}
        </Text>
        <Ionicons name={icon as any} size={20} color={colors.text.tertiary} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>ابحث عن {label}</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.text.tertiary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="ابحث هنا..."
                placeholderTextColor={colors.text.tertiary}
                value={search}
                onChangeText={setSearch}
                textAlign="right"
              />
            </View>

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.dropdownItem} 
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                    setSearch('');
                  }}
                >
                  <Text style={[styles.dropdownText, item.value === value && { color: colors.accent.primary }]}>{item.label}</Text>
                </TouchableOpacity>
              )}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={5}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const AddCarScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  
  const [brands, setBrands] = useState<SelectOption[]>([]);
  const [models, setModels] = useState<SelectOption[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  // Generate years list
  const activeYear = new Date().getFullYear() + 1;
  const years = Array.from({ length: 40 }, (_, i) => ({ 
    label: (activeYear - i).toString(), 
    value: (activeYear - i).toString() 
  }));

  // Load Brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoadingBrands(true);
      const makes = await getMakes();
      setBrands(makes);
      setLoadingBrands(false);
    };
    fetchBrands();
  }, []);

  // Load Models when Brand changes
  useEffect(() => {
    if (!brand) return;
    const fetchModelsList = async () => {
      setLoadingModels(true);
      const fetchedModels = await getModels(brand);
      setModels(fetchedModels);
      setLoadingModels(false);
    };
    fetchModelsList();
  }, [brand]);

  const handleBrandSelect = (selectedBrand: string) => {
    setBrand(selectedBrand);
    setModel(''); // Reset model when brand changes
  };

  const handleAdd = () => {
    dispatch(addCar({ 
      brand: brand || 'مجهول', 
      model: model || 'مجهول', 
      year: parseInt(year) || new Date().getFullYear(), 
      plate: plate || 'بدون لوحة', 
      mileage: 0, 
      nextService: 5000, 
      color: '#FFF', 
      image: null, 
      lastLocation: null
    }));
    
    navigation.goBack();
  };

  // Generate disable state
  const isFormValid = brand && model && year;

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
          <Text style={styles.carIconLabel}>تفاصيل مركبتك</Text>
        </View>

        <SelectField 
          label="الشركة المصنعة" 
          placeholder="اختر الشركة (مثل Toyota)" 
          icon="car-outline" 
          data={brands}
          value={brand}
          onSelect={handleBrandSelect}
          isLoading={loadingBrands}
        />

        <SelectField 
          label="الموديل" 
          placeholder="اختر الموديل (مثل Corolla)" 
          icon="hardware-chip-outline" 
          data={models}
          value={model}
          onSelect={setModel}
          isLoading={loadingModels}
        />

        <SelectField 
          label="سنة الصنع" 
          placeholder="اختر السنة" 
          icon="calendar-outline" 
          data={years}
          value={year}
          onSelect={setYear}
        />

        <View style={{ marginTop: spacing.md }}>
          <Input 
            label="رقم اللوحة (اختياري)" 
            value={plate} 
            onChangeText={setPlate} 
            placeholder="مثال: أ ب ج 1234" 
            icon="document-outline" 
          />
        </View>

        <Button 
          title="إضافة السيارة" 
          onPress={handleAdd} 
          disabled={!isFormValid as boolean}
          icon="checkmark-circle" 
          iconPosition="right" 
          style={{ marginTop: spacing.xl, opacity: isFormValid ? 1 : 0.5 }} 
        />
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
    ...shadows.glow
  },
  carIconLabel: { ...typography.h4, color: colors.text.primary },
  
  fieldLabel: { ...typography.label, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.sm, marginTop: spacing.md },
  selector: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.input.background, borderRadius: borderRadius.md,
    borderWidth: 1, borderColor: colors.input.border, height: 55, paddingHorizontal: spacing.xl,
  },
  selectorText: { ...typography.body, color: colors.text.tertiary, flex: 1, textAlign: 'right', marginHorizontal: spacing.sm },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    height: '75%',
    padding: spacing.xl,
    paddingTop: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: { ...typography.h4, color: colors.text.primary },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.input.border,
  },
  searchIcon: { marginRight: spacing.sm },
  searchInput: {
    flex: 1,
    height: 50,
    color: colors.text.primary,
    ...typography.body,
  },
  dropdownItem: { paddingVertical: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.divider },
  dropdownText: { ...typography.body, color: colors.text.secondary, textAlign: 'right' },
});

export default AddCarScreen;
