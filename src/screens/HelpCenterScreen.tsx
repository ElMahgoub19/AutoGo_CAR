// AutoGo - Help Center Screen
import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Animated, LayoutAnimation, UIManager, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import type { RootState } from '../types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqData = [
  {
    category: 'الحساب والتسجيل',
    icon: 'person-outline',
    questions: [
      { q: 'كيف أنشئ حساب جديد؟', a: 'يمكنك إنشاء حساب جديد عبر الضغط على "إنشاء حساب" في شاشة تسجيل الدخول، ثم إدخال بياناتك الشخصية ورقم الجوال. ستصلك رسالة تحقق لتأكيد حسابك.' },
      { q: 'نسيت كلمة المرور، ماذا أفعل؟', a: 'اضغط على "نسيت كلمة المرور" في شاشة تسجيل الدخول، ثم اختر طريقة الاسترداد (رقم الجوال أو البريد الإلكتروني) واتبع التعليمات لإعادة تعيين كلمة المرور.' },
      { q: 'كيف أحذف حسابي؟', a: 'يمكنك طلب حذف حسابك من خلال الإعدادات > البيانات والتخزين > تنزيل بياناتي، أو التواصل مع فريق الدعم. سيتم حذف جميع بياناتك خلال 30 يوماً.' },
    ],
  },
  {
    category: 'الخدمات والحجز',
    icon: 'construct-outline',
    questions: [
      { q: 'كيف أحجز خدمة صيانة؟', a: 'من الشاشة الرئيسية، اختر نوع الخدمة المطلوبة > اختر الورشة > حدد الموعد والتاريخ > راجع التفاصيل وأكد الحجز. ستتلقى تأكيداً فورياً.' },
      { q: 'هل يمكنني إلغاء الحجز؟', a: 'نعم، يمكنك إلغاء الحجز من شاشة "طلباتي" قبل موعد الخدمة بساعتين على الأقل. في حالة الإلغاء المتأخر، قد يتم تطبيق رسوم إلغاء.' },
      { q: 'كيف أضيف سيارة جديدة؟', a: 'من تبويب "جراجي" > اضغط على "إضافة سيارة" > أدخل بيانات السيارة (الماركة، الموديل، سنة الصنع، رقم اللوحة). يمكنك إضافة حتى 5 سيارات.' },
    ],
  },
  {
    category: 'الدفع والمحفظة',
    icon: 'wallet-outline',
    questions: [
      { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل: البطاقات الائتمانية (فيزا، ماستركارد)، مدى، Apple Pay، المحفظة الرقمية، والدفع عند الاستلام لبعض الخدمات.' },
      { q: 'كيف أشحن المحفظة؟', a: 'من شاشة المحفظة > اضغط "شحن" > اختر المبلغ > اختر طريقة الدفع > أكد العملية. المبلغ يُضاف فوراً لرصيدك.' },
      { q: 'هل يمكنني استرداد المبلغ بعد الإلغاء؟', a: 'نعم، يتم استرداد المبلغ تلقائياً خلال 3-5 أيام عمل على نفس طريقة الدفع المستخدمة، أو فوراً إلى المحفظة الرقمية.' },
    ],
  },
  {
    category: 'خدمة الطوارئ (SOS)',
    icon: 'warning-outline',
    questions: [
      { q: 'كيف أطلب خدمة سحب عند الطوارئ؟', a: 'اضغط على زر الطوارئ (SOS) في التبويب السفلي > اختر نوع السحب > حدد موقعك > سيتم ربطك بأقرب سائق سحب متاح. متوسط وقت الوصول 15-30 دقيقة.' },
      { q: 'هل خدمة الطوارئ متاحة 24/7؟', a: 'نعم، خدمة الطوارئ والسحب متاحة على مدار الساعة، 7 أيام في الأسبوع، في جميع المدن المغطاة.' },
    ],
  },
];

const HelpCenterScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<any>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<any>(null);

  const toggleCategory = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCategory(expandedCategory === index ? null : index);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (catIdx, qIdx) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const key = `${catIdx}-${qIdx}`;
    setExpandedQuestion(expandedQuestion === key ? null : key);
  };

  const filteredData = searchQuery.length > 1
    ? faqData.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.includes(searchQuery) || q.a.includes(searchQuery)
        ),
      })).filter(cat => cat.questions.length > 0)
    : faqData;

  return (
    <LinearGradient colors={colors.gradient.primary} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Header title="مركز المساعدة" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.base, paddingBottom: 40 }}>
        {/* Hero section */}
        <Text style={{
          ...typography.h2, color: colors.text.primary,
          textAlign: 'right', marginBottom: spacing.sm,
        }}>
          كيف يمكننا{'\n'}<Text style={{ color: colors.accent.primary }}>مساعدتك؟</Text>
        </Text>
        <Text style={{
          ...typography.body, color: colors.text.secondary,
          textAlign: 'right', marginBottom: spacing.xl,
        }}>
          ابحث في الأسئلة الشائعة أو تواصل مع فريق الدعم
        </Text>

        {/* Search */}
        <Input
          placeholder="ابحث عن سؤال أو موضوع..."
          icon="search-outline"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ marginBottom: spacing.xl }}
        />

        {/* Quick actions */}
        <View style={{
          flexDirection: 'row', flexWrap: 'wrap',
          justifyContent: 'space-between', marginBottom: spacing.xl,
        }}>
          {[
            { icon: 'chatbubble-outline', label: 'محادثة مباشرة', screen: 'Chat' },
            { icon: 'call-outline', label: 'اتصل بنا', screen: 'Call' },
            { icon: 'mail-outline', label: 'بريد إلكتروني', screen: 'Support' },
            { icon: 'document-text-outline', label: 'الشروط', screen: 'Terms' },
          ].map((action, i) => (
            <TouchableOpacity
              key={i}
              style={{
                width: '48%', alignItems: 'center',
                marginBottom: spacing.md,
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                borderRadius: borderRadius.md,
                paddingVertical: spacing.lg,
              }}
              onPress={() => navigation.navigate(action.screen)}
            >
              <View style={{
                width: 48, height: 48, borderRadius: 24,
                backgroundColor: 'rgba(45,212,191,0.1)',
                borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: spacing.sm,
              }}>
                <Ionicons name={action.icon as any} size={22} color={colors.accent.primary} />
              </View>
              <Text style={{ ...typography.labelSmall, color: colors.text.secondary }}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ categories */}
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: spacing.md,
        }}>
          <View />
          <Text style={{ ...typography.h4, color: colors.text.primary }}>الأسئلة الشائعة</Text>
        </View>

        {filteredData.map((category, catIdx) => (
          <Card key={catIdx} style={{ marginBottom: spacing.md }}>
            {/* Category header */}
            <TouchableOpacity
              style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => toggleCategory(catIdx)}
            >
              <Ionicons
                name={expandedCategory === catIdx ? 'chevron-up' : 'chevron-down' as any}
                size={18}
                color={colors.accent.primary}
              />
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                gap: spacing.sm,
              }}>
                <Text style={{ ...typography.label, color: colors.text.primary }}>
                  {category.category}
                </Text>
                <View style={{
                  width: 32, height: 32, borderRadius: borderRadius.sm,
                  backgroundColor: 'rgba(45,212,191,0.08)',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ionicons name={category.icon as any} size={18} color={colors.accent.primary} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Questions */}
            {expandedCategory === catIdx && category.questions.map((item, qIdx) => (
              <View key={qIdx}>
                <View style={{ height: 1, backgroundColor: colors.divider, marginVertical: spacing.sm }} />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: spacing.sm,
                  }}
                  onPress={() => toggleQuestion(catIdx, qIdx)}
                >
                  <Ionicons
                    name={expandedQuestion === `${catIdx}-${qIdx}` ? 'remove-circle-outline' : 'add-circle-outline'}
                    size={20}
                    color={colors.accent.primary}
                  />
                  <Text style={{
                    ...typography.body, color: colors.text.primary,
                    flex: 1, textAlign: 'right', marginHorizontal: spacing.sm,
                  }}>
                    {item.q}
                  </Text>
                </TouchableOpacity>
                {expandedQuestion === `${catIdx}-${qIdx}` && (
                  <View style={{
                    backgroundColor: 'rgba(45,212,191,0.04)',
                    borderRadius: borderRadius.sm,
                    padding: spacing.md,
                    marginTop: spacing.xs,
                  }}>
                    <Text style={{
                      ...typography.body, color: colors.text.secondary,
                      textAlign: 'right', lineHeight: 24,
                    }}>
                      {item.a}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </Card>
        ))}

        {/* Still need help? */}
        <Card variant="accent" style={{ marginTop: spacing.md }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 56, height: 56, borderRadius: 28,
              backgroundColor: 'rgba(45,212,191,0.15)',
              alignItems: 'center', justifyContent: 'center',
              marginBottom: spacing.md,
            }}>
              <Ionicons name="headset-outline" size={28} color={colors.accent.primary} />
            </View>
            <Text style={{ ...typography.label, color: colors.text.primary, marginBottom: spacing.xs }}>
              لم تجد إجابتك؟
            </Text>
            <Text style={{
              ...typography.bodySmall, color: colors.text.secondary,
              textAlign: 'center', marginBottom: spacing.md,
            }}>
              فريق الدعم متاح لمساعدتك على مدار الساعة
            </Text>
            <Button
              title="تحدث مع فريق الدعم"
              onPress={() => navigation.navigate('Support')}
              size="medium"
              style={{ width: '100%' }}
            />
          </View>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

export default HelpCenterScreen;
