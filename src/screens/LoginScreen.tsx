// AutoGo - Login Screen (Design Image 02)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useDispatch } from 'react-redux';
import { setLoading, setError } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAppDispatch } from '../hooks';
import { formatEgyptianPhone, isValidEgyptianPhone } from '../utils/phone';

// Warm up the android browser to improve UX
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { signIn, setActive, isLoaded } = useSignIn();
  
  const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startAppleFlow } = useOAuth({ strategy: "oauth_apple" });

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleLogin = async () => {
    if (!isLoaded) return;
    
    const formattedPhone = formatEgyptianPhone(phone);
    console.log(`[AutoGo Auth] Login attempt raw phone: ${phone}, formatted phone: ${formattedPhone}`);
    
    if (isValidEgyptianPhone(phone) && agreed) {
      try {
        setIsLoading(true);
        console.log(`[AutoGo Auth] Sending signIn with identifier: ${formattedPhone}`);
        
        // Start the sign-in process using the phone number
        const { supportedFirstFactors } = await signIn.create({
          identifier: formattedPhone,
          strategy: 'phone_code', // Explicitly declare we are using phone code strategy
        });

        // Find the phone code factor
        const isPhoneCodeFactor = (factor: any) => factor.strategy === 'phone_code';
        const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor) as any;

        if (phoneCodeFactor) {
          // Send the OTP
          await signIn.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId: phoneCodeFactor.phoneNumberId,
          });
          
          console.log(`[AutoGo Auth] Sent OTP to ${formattedPhone}`);
          navigation.navigate('OTP', { phone: formattedPhone, isSignUp: false });
        } else {
            dispatch(setError('لا يمكن إرسال الرمز إلى هذا الرقم.'));
        }
      } catch (err: any) {
        console.error('[AutoGo Auth] Clerk SignIn Error:', JSON.stringify(err, null, 2));
        
        const clerkError = err.errors?.[0];
        if (clerkError?.code === 'form_identifier_not_found') {
          dispatch(setError('هذا الرقم غير مسجل، يرجى إنشاء حساب جديد.'));
        } else if (clerkError?.code === 'form_identifier_invalid' || clerkError?.message?.includes('invalid')) {
          dispatch(setError('رقم الهاتف غير صالح أو أن تسجيل الدخول برقم الهاتف غير مفعل.'));
        } else {
          dispatch(setError(clerkError?.message || 'حدث خطأ في تسجيل الدخول'));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOAuth = async (strategy: 'google' | 'apple') => {
    if (!agreed) return;
    try {
      setIsLoading(true);
      const startFlow = strategy === 'google' ? startGoogleFlow : startAppleFlow;
      const { createdSessionId, setActive: setOAuthActive } = await startFlow({
        redirectUrl: Linking.createURL('/oauth-redirect', { scheme: 'autogo' }),
      });

      if (createdSessionId && setOAuthActive) {
        await setOAuthActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp returned from startOAuthFlow for next steps if needed
      }
    } catch (err: any) {
      dispatch(setError(err.errors?.[0]?.message || 'حدث خطأ في تسجيل الدخول'));
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
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
            onPress={() => handleOAuth('google')}
            variant="secondary"
            icon="logo-google"
            iconPosition="right"
            style={styles.socialButton}
            disabled={!agreed || isLoading}
          />
          <Button
            title="المتابعة باستخدام أبل"
            onPress={() => handleOAuth('apple')}
            variant="secondary"
            icon="logo-apple"
            iconPosition="right"
            style={styles.socialButton}
            disabled={!agreed || isLoading}
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
