import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import { useAppDispatch } from '../hooks';
import { sendOTP, mockSocialLogin } from '../store/slices/authSlice';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // التحقق من صحة رقم الهاتف المصري (10 أرقام بدون كود الدولة)
  const isValidPhone = phone.replace(/\s/g, '').length === 10;

  const handleSendOTP = async () => {
    if (!isValidPhone) {
      Alert.alert('خطأ', 'يرجى إدخال رقم هاتف مصري صحيح (10 أرقام)');
      return;
    }

    const fullPhone = `+20${phone.replace(/\s/g, '')}`;
    
    try {
      setIsLoading(true);
      await dispatch(sendOTP(fullPhone)).unwrap();
      navigation.navigate('OTP', { phone: fullPhone });
    } catch (err: any) {
      // حتى لو فشل الـ API، ننتقل لشاشة الـ OTP (وضع صوري)
      console.log('[AutoGo] Mock mode - navigating to OTP');
      navigation.navigate('OTP', { phone: fullPhone });
    } finally {
      setIsLoading(false);
    }
  };

  // تسجيل الدخول بجوجل (صوري)
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await dispatch(mockSocialLogin({
        provider: 'google',
        name: 'مستخدم جوجل',
        email: 'user@gmail.com',
        avatarUrl: undefined,
      })).unwrap();
      console.log('[AutoGo] Mock Google login success');
    } catch (err) {
      console.error('[AutoGo] Google login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // تسجيل الدخول بأبل (صوري)
  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      await dispatch(mockSocialLogin({
        provider: 'apple',
        name: 'مستخدم أبل',
        email: 'user@icloud.com',
        avatarUrl: undefined,
      })).unwrap();
      console.log('[AutoGo] Mock Apple login success');
    } catch (err) {
      console.error('[AutoGo] Apple login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // تنسيق رقم الهاتف أثناء الكتابة
  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
  };

  return (
    <LinearGradient colors={colors.gradient.primary as unknown as string[]} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* الشعار (Logo) */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="car-sport" size={40} color={colors.text.primary} />
              <View style={styles.logoBolt}>
                <Ionicons name="flash" size={12} color="#F6AD55" />
              </View>
            </View>
          </View>

          <Text style={styles.title}>
            مرحباً بك في <Text style={styles.titleAccent}>AUTOGO</Text>
          </Text>
          <Text style={styles.subtitle}>سجل دخولك لتبدأ العناية بسيارتك</Text>

          {/* حقل إدخال رقم الهاتف */}
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>رقم الهاتف</Text>
            <View style={styles.phoneInputContainer}>
              {/* حقل الإدخال */}
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={formatPhoneNumber}
                placeholder="1XX XXXX XXX"
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="phone-pad"
                maxLength={10}
                textAlign="left"
              />
              {/* بادئة الدولة +20 */}
              <View style={styles.countryCode}>
                <Text style={styles.flagEmoji}>🇪🇬</Text>
                <Text style={styles.countryCodeText}>20+</Text>
              </View>
            </View>

            {/* زر تسجيل الدخول */}
            <Button
              title="تسجيل الدخول"
              onPress={handleSendOTP}
              loading={isLoading}
              disabled={!isValidPhone}
              style={{ marginTop: spacing.xl }}
            />
          </View>

          {/* فاصل */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>أو</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* أزرار تسجيل الدخول الاجتماعي */}
          <View style={styles.socialContainer}>
            {/* Google Button */}
            <TouchableOpacity 
              style={styles.googleButton} 
              onPress={handleGoogleLogin} 
              disabled={isLoading}
            >
              <Text style={styles.googleButtonText}>المتابعة باستخدام جوجل</Text>
              <Ionicons name="logo-google" size={24} color="#4285F4" style={styles.socialIcon} />
            </TouchableOpacity>

            {/* Apple Button */}
            <TouchableOpacity 
              style={styles.appleButton} 
              onPress={handleAppleLogin} 
              disabled={isLoading}
            >
              <Text style={styles.appleButtonText}>المتابعة باستخدام أبل</Text>
              <Ionicons name="logo-apple" size={24} color="#FFFFFF" style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          {/* روابط إضافية */}
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.linkText}>
                ليس لديك حساب؟ <Text style={styles.linkAccent}>سجل الآن</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* الشروط والأحكام */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              باستمرارك، فإنك توافق على{' '}
              <Text style={styles.termsLink} onPress={() => navigation.navigate('Terms')}>شروط الخدمة</Text>
              {' '}و{' '}
              <Text style={styles.termsLink} onPress={() => navigation.navigate('Terms')}>سياسة الخصوصية</Text>
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
    paddingBottom: 40,
  },
  logoContainer: { alignItems: 'center', marginBottom: spacing.xl },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  logoBolt: { position: 'absolute', bottom: 18, right: 18 },
  title: {
    ...typography.h2, color: colors.text.primary,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  titleAccent: { color: '#00b4d8' },
  subtitle: {
    ...typography.body, color: colors.text.secondary,
    textAlign: 'center', marginBottom: spacing.xxl,
  },
  formContainer: { marginBottom: spacing.md },
  inputLabel: {
    ...typography.label,
    color: colors.text.secondary,
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    height: 60,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.12)',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  flagEmoji: {
    fontSize: 20,
    marginLeft: spacing.xs,
  },
  countryCodeText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.md,
    ...typography.h4,
    color: colors.text.primary,
    letterSpacing: 1.5,
  },
  dividerContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dividerText: {
    ...typography.bodySmall, color: 'rgba(255,255,255,0.6)',
    paddingHorizontal: spacing.md,
  },
  socialContainer: {
    flexDirection: 'column', gap: spacing.md,
  },
  googleButton: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg, paddingVertical: spacing.md,
    height: 56,
  },
  googleButtonText: {
    ...typography.button, color: '#000000',
    marginRight: spacing.sm,
    fontWeight: '700',
  },
  appleButton: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#000000',
    borderRadius: borderRadius.lg, paddingVertical: spacing.md,
    height: 56,
  },
  appleButtonText: {
    ...typography.button, color: '#FFFFFF',
    marginRight: spacing.sm,
    fontWeight: '700',
  },
  socialIcon: {
    marginLeft: spacing.sm,
  },
  linksContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  linkText: {
    ...typography.body, color: colors.text.secondary,
  },
  linkAccent: {
    color: '#00b4d8', fontWeight: '700',
  },
  termsContainer: {
    marginTop: 'auto', paddingTop: spacing.xl,
  },
  termsText: {
    ...typography.caption, color: 'rgba(255,255,255,0.5)',
    textAlign: 'center', lineHeight: 22,
  },
  termsLink: {
    color: '#00b4d8', textDecorationLine: 'underline',
  },
});

export default LoginScreen;
