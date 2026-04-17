// AutoGo - Forgot Password Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import Input from '../components/Input';

const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const [method, setMethod] = useState('phone'); // 'phone' or 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const isValid = method === 'phone' ? phone.length >= 10 : email.includes('@');

  const handleReset = async () => {
    if (!isValid) return;
    const value = method === 'phone' ? phone : email;
    const result = await dispatch(resetPassword({ method, value }));
    if (resetPassword.fulfilled.match(result)) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <LinearGradient colors={colors.gradient.primary} style={styles.container}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color={colors.accent.primary} />
          </View>
          <Text style={styles.successTitle}>تم الإرسال بنجاح!</Text>
          <Text style={styles.successSubtitle}>
            {method === 'phone'
              ? `تم إرسال رمز التحقق إلى الرقم المنتهي بـ ${phone.slice(-3)}`
              : `تم إرسال رابط إعادة التعيين إلى ${email}`}
          </Text>

          <Button
            title="التحقق الآن"
            onPress={() => navigation.navigate('OTP', { phone, isReset: true })}
            style={{ marginTop: spacing.xxl, width: '100%' }}
          />

          <TouchableOpacity style={styles.resendRow} onPress={() => setSent(false)}>
            <Ionicons name="refresh" size={16} color={colors.accent.primary} />
            <Text style={styles.resendText}>إعادة الإرسال</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-forward" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="lock-open-outline" size={40} color={colors.accent.primary} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>نسيت كلمة المرور؟</Text>
          <Text style={styles.subtitle}>
            لا تقلق! اختر طريقة الاسترداد وسنساعدك في استعادة حسابك
          </Text>

          {/* Method toggle */}
          <View style={styles.methodToggle}>
            <TouchableOpacity
              style={[styles.methodBtn, method === 'email' && styles.methodBtnActive]}
              onPress={() => setMethod('email')}
            >
              <Ionicons name="mail-outline" size={18} color={method === 'email' ? colors.button.primaryText : colors.text.secondary} />
              <Text style={[styles.methodText, method === 'email' && styles.methodTextActive]}>البريد الإلكتروني</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodBtn, method === 'phone' && styles.methodBtnActive]}
              onPress={() => setMethod('phone')}
            >
              <Ionicons name="call-outline" size={18} color={method === 'phone' ? colors.button.primaryText : colors.text.secondary} />
              <Text style={[styles.methodText, method === 'phone' && styles.methodTextActive]}>رقم الموبايل</Text>
            </TouchableOpacity>
          </View>

          {/* Input */}
          <View style={styles.formContainer}>
            {method === 'phone' ? (
              <Input
                label="رقم الموبايل المسجل"
                value={phone}
                onChangeText={setPhone}
                placeholder="1X XXXX XXXX"
                keyboardType="phone-pad"
                prefix="+20"
                maxLength={10}
              />
            ) : (
              <Input
                label="البريد الإلكتروني المسجل"
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                keyboardType="email-address"
                icon="mail-outline"
              />
            )}

            <Button
              title="إرسال رمز التحقق"
              onPress={handleReset}
              loading={isLoading}
              disabled={!isValid}
              style={{ marginTop: spacing.lg }}
            />
          </View>

          {/* Help note */}
          <View style={styles.helpCard}>
            <View style={styles.helpIconWrap}>
              <Ionicons name="information-circle-outline" size={20} color={colors.accent.primary} />
            </View>
            <Text style={styles.helpText}>
              إذا لم تتمكن من الوصول إلى رقمك أو بريدك المسجل، يرجى التواصل مع فريق الدعم
            </Text>
          </View>

          <TouchableOpacity style={styles.supportLink} onPress={() => navigation.navigate('Support')}>
            <Ionicons name="arrow-back" size={16} color={colors.accent.primary} />
            <Text style={styles.supportText}>تواصل مع الدعم</Text>
          </TouchableOpacity>
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
    marginBottom: spacing.xl,
  },
  iconContainer: { alignItems: 'center', marginBottom: spacing.lg },
  iconCircle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: 'rgba(45,212,191,0.08)',
    borderWidth: 1.5, borderColor: 'rgba(45,212,191,0.2)',
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
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  methodToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: borderRadius.sm,
    padding: 4,
    marginBottom: spacing.xl,
  },
  methodBtn: {
    flex: 1, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: 12,
    borderRadius: borderRadius.sm - 2,
  },
  methodBtnActive: {
    backgroundColor: colors.accent.primary,
  },
  methodText: { ...typography.labelSmall, color: colors.text.secondary },
  methodTextActive: { color: colors.button.primaryText },
  formContainer: { marginBottom: spacing.xl },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: 'rgba(45,212,191,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.15)',
    borderRadius: borderRadius.md,
    padding: spacing.base,
  },
  helpIconWrap: { marginTop: 2 },
  helpText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    flex: 1,
    textAlign: 'right',
    lineHeight: 20,
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  supportText: { ...typography.label, color: colors.accent.primary },
  // Success state
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIcon: { marginBottom: spacing.xl },
  successTitle: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  successSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xl,
  },
  resendText: { ...typography.label, color: colors.accent.primary },
});

export default ForgotPasswordScreen;
