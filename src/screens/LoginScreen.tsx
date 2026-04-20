// AutoGo - Login Screen (Design Image 02)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { sendOTP, setError } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAppDispatch } from '../hooks';
import { formatEgyptianPhone, isValidEgyptianPhone } from '../utils/phone';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleLogin = async () => {
    const formattedPhone = formatEgyptianPhone(phone);
    console.log(`[AutoGo Debug] Attempting login with: ${formattedPhone}`);
    
    if (isValidEgyptianPhone(phone) && agreed) {
      try {
        setIsLoading(true);
        console.log(`[AutoGo Debug] Dispatching sendOTP...`);
        const result = await dispatch(sendOTP(formattedPhone)).unwrap();
        console.log(`[AutoGo Debug] sendOTP success:`, result);
        
        console.log(`[AutoGo Debug] Navigating to OTP screen...`);
        navigation.navigate('OTP', { phone: formattedPhone, isSignUp: false });
      } catch (err: any) {
        console.error(`[AutoGo Debug] Login error:`, err);
        dispatch(setError(err || 'حدث خطأ في إرسال رمز التحقق'));
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn(`[AutoGo Debug] Validation failed: isValid=${isValidEgyptianPhone(phone)}, agreed=${agreed}`);
    }
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="car-sport" size={40} color={colors.text.primary} />
              <View style={styles.logoBolt}>
                <Ionicons name="flash" size={12} color="#F6AD55" />
              </View>
            </View>
          </View>

          {/* Welcome text */}
          <Text style={styles.title}>
            مرحباً بك في <Text style={styles.titleAccent}>AUTOGO</Text>
          </Text>
          <Text style={styles.subtitle}>سجل دخولك لتبدأ العناية بسيارتك</Text>

          {/* Phone input */}
          <View style={styles.formContainer}>
            <Input
              label="رقم الموبايل"
              value={phone}
              onChangeText={setPhone}
              placeholder="1X XXXX XXXX"
              keyboardType="phone-pad"
              prefix="+20"
              maxLength={10}
            />

            {/* Terms checkbox */}
            <TouchableOpacity 
              style={styles.checkRow} 
              onPress={() => setAgreed(!agreed)}
              activeOpacity={0.7}
            >
              <Text style={styles.checkText}>
                أوافق على{' '}
                <Text style={styles.checkLink} onPress={() => navigation.navigate('Terms')}>شروط الخدمة</Text>
                {' '}و{' '}
                <Text style={styles.checkLink} onPress={() => navigation.navigate('Terms')}>سياسة الخصوصية</Text>
              </Text>
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Ionicons name="checkmark" size={14} color={colors.button.primaryText} />}
              </View>
            </TouchableOpacity>

            <Button
              title="متابعة"
              onPress={handleLogin}
              loading={isLoading}
              disabled={phone.length < 10 || !agreed}
              style={{ marginTop: spacing.base }}
            />
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              باستمرارك، فإنك توافق على{' '}
              <Text style={styles.termsLink}>شروط الخدمة</Text>
              {' '}و{' '}
              <Text style={styles.termsLink}>سياسة الخصوصية</Text>
              {' '}الخاصة بنا.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
  },
  logoContainer: { alignItems: 'center', marginBottom: spacing.xl },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBolt: { position: 'absolute', bottom: 18, right: 18 },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  titleAccent: { color: colors.accent.primary },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  formContainer: { marginBottom: spacing.lg },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  checkText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    flex: 1,
    textAlign: 'right',
  },
  checkLink: { 
    color: colors.accent.primary, 
    textDecorationLine: 'underline' 
  },
  termsContainer: {
    marginTop: 'auto',
    paddingBottom: spacing.xxl,
    paddingTop: spacing.lg,
  },
  termsText: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: colors.accent.primary,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
