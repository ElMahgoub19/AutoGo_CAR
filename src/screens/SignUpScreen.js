// AutoGo - Sign Up Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { signUpWithPhone } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import Input from '../components/Input';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isValid = name.length >= 2 && phone.length >= 10 && agreed;

  const handleSignUp = async () => {
    if (!isValid) return;
    const result = await dispatch(signUpWithPhone({ name, phone, email }));
    if (signUpWithPhone.fulfilled.match(result)) {
      navigation.navigate('OTP', { phone, isSignUp: true });
    }
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-forward" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={36} color={colors.accent.primary} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>إنشاء حساب جديد</Text>
          <Text style={styles.subtitle}>أدخل بياناتك لإنشاء حسابك في AUTOGO</Text>

          {/* Form */}
          <View style={styles.formContainer}>
            <Input
              label="الاسم الكامل"
              value={name}
              onChangeText={setName}
              placeholder="أدخل اسمك الكامل"
              icon="person-outline"
            />

            <Input
              label="رقم الموبايل"
              value={phone}
              onChangeText={setPhone}
              placeholder="1X XXXX XXXX"
              keyboardType="phone-pad"
              prefix="+20"
              maxLength={10}
            />

            <Input
              label="البريد الإلكتروني (اختياري)"
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              keyboardType="email-address"
              icon="mail-outline"
            />
          </View>

          {/* Terms checkbox */}
          <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
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

          {/* Sign up button */}
          <Button
            title="إنشاء الحساب"
            onPress={handleSignUp}
            loading={isLoading}
            disabled={!isValid}
            style={{ marginTop: spacing.lg }}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>أو</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social sign up */}
          <Button
            title="التسجيل باستخدام جوجل"
            onPress={() => navigation.navigate('ProfileSetup')}
            variant="secondary"
            icon="logo-google"
            iconPosition="right"
            style={styles.socialButton}
          />

          {/* Login link */}
          <View style={styles.loginContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>سجل دخول</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>{'  '}لديك حساب بالفعل؟{'  '}</Text>
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
    paddingTop: 50,
    paddingBottom: spacing.xxl,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  logoContainer: { alignItems: 'center', marginBottom: spacing.lg },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(45,212,191,0.1)',
    borderWidth: 1.5, borderColor: 'rgba(45,212,191,0.25)',
    alignItems: 'center', justifyContent: 'center',
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
    marginBottom: spacing.xl,
  },
  formContainer: { marginBottom: spacing.md },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
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
  checkLink: { color: colors.accent.primary, textDecorationLine: 'underline' },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.divider },
  dividerText: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
    marginHorizontal: spacing.base,
  },
  socialButton: { marginBottom: spacing.md },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  loginText: { ...typography.body, color: colors.text.secondary },
  loginLink: { ...typography.label, color: colors.accent.primary },
});

export default SignUpScreen;
