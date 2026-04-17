// AutoGo - Login Screen (Design Image 02)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPhone } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import Input from '../components/Input';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleLogin = async () => {
    if (phone.length >= 10 && agreed) {
      const result = await dispatch(loginWithPhone(phone));
      if (loginWithPhone.fulfilled.match(result)) {
        navigation.navigate('OTP', { phone });
      }
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

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>أو المتابعة عبر</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social login */}
          <Button
            title="المتابعة باستخدام جوجل"
            onPress={() => navigation.navigate('ProfileSetup')}
            variant="secondary"
            icon="logo-google"
            iconPosition="right"
            style={styles.socialButton}
          />
          <Button
            title="المتابعة باستخدام أبل"
            onPress={() => navigation.navigate('ProfileSetup')}
            variant="secondary"
            icon="logo-apple"
            iconPosition="right"
            style={styles.socialButton}
          />

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
