// AutoGo - OTP Verification Screen (Design Image 03)
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';

const OTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const phone = route?.params?.phone || '5X XXX XXXX';
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(55);
  const inputs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length === 4) {
      const result = await dispatch(verifyOTP({ phone, otp: code }));
      if (verifyOTP.fulfilled.match(result)) {
        navigation.replace('ProfileSetup');
      }
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>رمز التحقق</Text>
        <Text style={styles.subtitle}>أدخل الرمز المكون من 4 أرقام المرسل إلى الرقم</Text>
        <Text style={styles.phone}>+966 {phone}</Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputs.current[index] = ref}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={value => handleOtpChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectionColor={colors.accent.primary}
            />
          ))}
        </View>

        <Button
          title="تأكيد الرمز"
          onPress={handleVerify}
          loading={isLoading}
          disabled={otp.some(d => !d)}
          style={{ marginTop: spacing.xxl }}
        />

        {/* Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>لم يصلك الرمز؟</Text>
          <View style={styles.resendRow}>
            <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(55)}>
              <Text style={[styles.resendLink, timer > 0 && styles.resendDisabled]}>
                إعادة إرسال الرمز
              </Text>
            </TouchableOpacity>
            {timer > 0 && (
              <View style={styles.timerBadge}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  phone: {
    ...typography.h4,
    color: colors.accent.primary,
    textAlign: 'center',
    marginTop: spacing.sm,
    letterSpacing: 2,
    marginBottom: spacing.xxl,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.input.background,
    borderWidth: 1.5,
    borderColor: colors.input.border,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  otpInputFilled: {
    borderColor: colors.accent.primary,
    backgroundColor: 'rgba(45, 212, 191, 0.08)',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  resendText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  resendLink: {
    ...typography.label,
    color: colors.accent.primary,
  },
  resendDisabled: {
    opacity: 0.5,
  },
  timerBadge: {
    backgroundColor: 'rgba(45, 212, 191, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  timerText: {
    ...typography.labelSmall,
    color: colors.accent.primary,
  },
});

export default OTPScreen;
