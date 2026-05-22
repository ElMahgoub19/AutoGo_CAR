// AutoGo - Car Details Screen (Design Image 10)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import MapPlaceholder from '../components/MapPlaceholder';
import { useAppDispatch } from '../hooks';
import { updateCarAsync } from '../store/slices/garageSlice';

const CarDetailsScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  // Keep local state in sync with Redux updates
  const [car, setCar] = useState(route?.params?.car || {});
  const [isEditingMileage, setIsEditingMileage] = useState(false);
  const [mileageInput, setMileageInput] = useState(car.mileage?.toString() || '0');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (updates: any) => {
    setIsUpdating(true);
    try {
      const res = await dispatch(updateCarAsync({ carId: car.id, data: updates })).unwrap();
      setCar(res);
    } catch (e) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تحديث البيانات');
    } finally {
      setIsUpdating(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('عذراً', 'نحتاج إلى إذن للوصول إلى معرض الصور.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleUpdate({ imageUrl: result.assets[0].uri });
    }
  };

  const toggleStatus = () => {
    const newStatus = car.status === 'نشط' ? 'خامل' : 'نشط';
    const newIsActive = newStatus === 'نشط';
    handleUpdate({ status: newStatus, isActive: newIsActive });
  };

  const saveMileage = () => {
    const num = parseInt(mileageInput, 10);
    if (!isNaN(num) && num >= 0) {
      handleUpdate({ mileage: num });
    } else {
      setMileageInput(car.mileage?.toString() || '0');
    }
    setIsEditingMileage(false);
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="تفاصيل السيارة" onBack={() => navigation.goBack()} rightIcon="create-outline" onRightPress={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Car visual */}
        <Card style={styles.carVisualCard} onPress={pickImage}>
          {car.imageUrl ? (
            <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
          ) : (
            <View style={styles.carIconPlaceholder}>
              <Ionicons name="car-sport" size={70} color={colors.text.primary} />
            </View>
          )}
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </View>
          <Text style={styles.carName}>{car.brand} {car.model}</Text>
          <View style={styles.plateBadge}>
            <Text style={styles.plateText}>{car.plate}</Text>
          </View>
        </Card>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {/* Mileage */}
          <Card style={styles.statCard} onPress={() => setIsEditingMileage(true)}>
            <Ionicons name="speedometer-outline" size={22} color={colors.accent.primary} />
            <Text style={styles.statLabel}>المسافة المقطوعة</Text>
            {isEditingMileage ? (
               <TextInput
                 style={styles.inlineInput}
                 value={mileageInput}
                 onChangeText={setMileageInput}
                 keyboardType="numeric"
                 autoFocus
                 onBlur={saveMileage}
                 onSubmitEditing={saveMileage}
               />
            ) : (
               <Text style={styles.statValue}>{(car.mileage / 1000).toFixed(1)} ألف كم</Text>
            )}
            <Ionicons name="pencil" size={12} color={colors.text.tertiary} style={styles.editIconHint} />
          </Card>

          {/* Year */}
          <Card style={styles.statCard}>
            <Ionicons name="calendar-outline" size={22} color={colors.accent.primary} />
            <Text style={styles.statLabel}>سنة الصنع</Text>
            <Text style={styles.statValue}>{car.year}</Text>
          </Card>

          {/* Next Service */}
          <Card style={styles.statCard}>
            <Ionicons name="construct-outline" size={22} color={colors.accent.primary} />
            <Text style={styles.statLabel}>الصيانة القادمة</Text>
            <Text style={styles.statValue}>{car.nextServiceKm > 0 ? `بعد ${car.nextServiceKm} كم` : 'متأخرة'}</Text>
          </Card>

          {/* Status Toggle */}
          <Card 
            style={[styles.statCard, car.status === 'نشط' ? styles.statActive : styles.statInactive]} 
            onPress={toggleStatus}
          >
            <Ionicons name="shield-checkmark-outline" size={22} color={car.status === 'نشط' ? colors.status.success : colors.text.tertiary} />
            <Text style={styles.statLabel}>الحالة</Text>
            <Text style={[styles.statValue, { color: car.status === 'نشط' ? colors.status.success : colors.text.secondary }]}>
              {car.status}
            </Text>
            <Ionicons name="swap-vertical" size={12} color={colors.text.tertiary} style={styles.editIconHint} />
            {isUpdating && <ActivityIndicator size="small" color={colors.accent.primary} style={styles.loadingSpinner} />}
          </Card>
        </View>

        {/* Location */}
        <Text style={styles.sectionTitle}>آخر موقع معروف</Text>
        <MapPlaceholder height={180} label={car.lastLocation?.address || 'لا يوجد موقع محفوظ'} />

        {/* Actions */}
        <View style={styles.actions}>
          <Button title="حجز صيانة" onPress={() => navigation.navigate('Services')} icon="construct-outline" iconPosition="right" style={{ marginBottom: spacing.md }} />
          <Button title="طلب ونش" onPress={() => navigation.navigate('SOS')} variant="danger" icon="warning-outline" iconPosition="right" />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.base },
  carVisualCard: { alignItems: 'center', paddingVertical: spacing.xl, marginBottom: spacing.lg, position: 'relative' },
  carImage: { width: 140, height: 80, borderRadius: borderRadius.md, resizeMode: 'cover' },
  carIconPlaceholder: { width: 140, height: 80, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
  cameraIcon: { position: 'absolute', top: spacing.xl + 60, right: '50%', marginRight: -80, width: 28, height: 28, borderRadius: 14, backgroundColor: colors.accent.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.background.card },
  carName: { ...typography.h3, color: colors.text.primary, marginTop: spacing.md },
  plateBadge: { backgroundColor: 'rgba(45,212,191,0.12)', paddingHorizontal: 14, paddingVertical: 4, borderRadius: borderRadius.sm, marginTop: spacing.sm },
  plateText: { ...typography.label, color: colors.accent.primary },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: spacing.lg },
  statCard: { width: '48%', alignItems: 'center', paddingVertical: spacing.lg, marginBottom: spacing.md, position: 'relative' },
  statActive: { borderColor: colors.status.success + '40', borderWidth: 1 },
  statInactive: { borderColor: colors.text.tertiary + '40', borderWidth: 1 },
  statLabel: { ...typography.caption, color: colors.text.tertiary, marginTop: spacing.sm },
  statValue: { ...typography.label, color: colors.text.primary, marginTop: 4 },
  inlineInput: { ...typography.label, color: colors.accent.primary, marginTop: 4, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: colors.accent.primary, minWidth: 60, paddingBottom: 2 },
  editIconHint: { position: 'absolute', top: 10, right: 10, opacity: 0.6 },
  loadingSpinner: { position: 'absolute', top: 10, left: 10 },
  sectionTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right', marginBottom: spacing.md },
  actions: { marginTop: spacing.xl },
});

export default CarDetailsScreen;
