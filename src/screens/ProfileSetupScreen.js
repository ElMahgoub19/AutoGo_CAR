// AutoGo - Profile Setup Screen (Design Image 11)
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setProfileComplete } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const ProfileSetupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    dispatch(setProfileComplete({ name: name || 'محمد العتيبي', city: city || 'الرياض' }));
  };

  const handleSkip = () => {
    dispatch(setProfileComplete({ name: 'مستخدم', city: 'الرياض' }));
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="" onBack={() => navigation.goBack()} />

      {/* Skip */}
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>تخطي</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>أهلاً بك! لنعرفك أكثر</Text>
        <Text style={styles.subtitle}>
          أكمل بياناتك لنقدم لك أفضل تجربة مخصصة{'\n'}لسيارتك
        </Text>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={50} color={colors.text.tertiary} />
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={18} color={colors.accent.primary} />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <Input
          label="الاسم الكامل"
          value={name}
          onChangeText={setName}
          placeholder="أدخل اسمك هنا"
          icon="person-outline"
        />

        <Input
          label="المدينة"
          value={city}
          onChangeText={setCity}
          placeholder="اختر مدينتك"
          icon="location-outline"
          rightIcon="chevron-down"
        />

        <Button
          title="بدء الاستخدام"
          onPress={handleSubmit}
          icon="arrow-forward"
          iconPosition="left"
          style={{ marginTop: spacing.lg }}
        />
      </View>

      <Text style={styles.copyright}>AUTOGO SMART TECH © 2024</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  skipButton: {
    position: 'absolute',
    top: 55,
    left: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: { ...typography.label, color: colors.accent.primary },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 2,
    borderColor: colors.accent.primary + '40',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '32%',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background.primary,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
    paddingBottom: spacing.xxl,
    letterSpacing: 2,
  },
});

export default ProfileSetupScreen;
