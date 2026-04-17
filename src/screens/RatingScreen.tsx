// AutoGo - Rating Screen (Design Image 33)
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { rateOrder } from '../store/slices/ordersSlice';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import StarRating from '../components/StarRating';
import { mockDriver } from '../data/mockData';
import { TouchableOpacity } from 'react-native';
import type { RootState } from '../types';
import { useAppDispatch } from '../hooks';

const tags = ['دقة الموعد', 'احترافية السائق', 'نظافة المركبة', 'تواصل ممتاز', 'سعر مناسب'];

const RatingScreen = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState(['دقة الموعد']);
  const [comment, setComment] = useState('');

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSubmit = () => {
    dispatch(rateOrder({ orderId: route?.params?.orderId || 'SOS-8921', rating, comment }));
    navigation.navigate('MainTabs');
  };

  return (
    <LinearGradient colors={colors.gradient.primary} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>تقييم الخدمة</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Driver */}
        <View style={styles.driverSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.text.secondary} />
          </View>
          <Text style={styles.driverName}>{mockDriver.name}</Text>
          <Text style={styles.orderInfo}>تم إكمال طلب الونش #SOS-8921</Text>
        </View>

        {/* Stars */}
        <Text style={styles.question}>كيف تقيم الخدمة؟</Text>
        <StarRating rating={rating} onChange={setRating} size={42} />

        {/* Tags */}
        <Text style={styles.tagsTitle}>ما الذي أعجبك؟</Text>
        <View style={styles.tagsGrid}>
          {tags.map((tag) => (
            <TouchableOpacity key={tag} style={[styles.tagChip, selectedTags.includes(tag) && styles.tagSelected]} onPress={() => toggleTag(tag)}>
              <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Comment */}
        <Text style={styles.commentTitle}>ملاحظات إضافية</Text>
        <Input
          value={comment}
          onChangeText={setComment}
          placeholder="هل لديك أي ملاحظات أخرى تود مشاركتها؟"
          multiline
          maxLength={200}
          style={{ marginBottom: 0 }}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Button title="إرسال التقييم" onPress={handleSubmit} icon="send-outline" iconPosition="right" />
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={styles.skipLink}>
          <Text style={styles.skipText}>تخطي التقييم</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.base, paddingTop: 55 },
  headerTitle: { ...typography.h4, color: colors.text.primary, flex: 1, textAlign: 'center' },
  closeBtn: { width: 44, height: 44, borderRadius: borderRadius.md, backgroundColor: colors.background.glass, borderWidth: 1, borderColor: colors.background.glassBorder, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: spacing.xl },
  driverSection: { alignItems: 'center', marginVertical: spacing.xl },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 2, borderColor: colors.accent.primary + '40', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  driverName: { ...typography.h3, color: colors.text.primary },
  orderInfo: { ...typography.bodySmall, color: colors.text.tertiary, marginTop: 4 },
  question: { ...typography.h4, color: colors.accent.primary, textAlign: 'center', marginBottom: spacing.lg },
  tagsTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right', marginTop: spacing.xl, marginBottom: spacing.md },
  tagsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: spacing.sm },
  tagChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: borderRadius.full, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  tagSelected: { backgroundColor: 'rgba(45,212,191,0.15)', borderColor: colors.accent.primary },
  tagText: { ...typography.bodySmall, color: colors.text.secondary },
  tagTextSelected: { color: colors.accent.primary },
  commentTitle: { ...typography.h4, color: colors.text.primary, textAlign: 'right', marginTop: spacing.xl, marginBottom: spacing.md },
  bottomContainer: { paddingHorizontal: spacing.xl, paddingBottom: 30 },
  skipLink: { alignItems: 'center', marginTop: spacing.md },
  skipText: { ...typography.label, color: colors.text.muted },
});

export default RatingScreen;
