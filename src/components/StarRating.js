// AutoGo - Star Rating Component
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const StarRating = ({ rating = 0, onChange, size = 36, showLabel = true, readonly = false }) => {
  const labels = ['', 'سيء', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز'];

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].reverse().map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => !readonly && onChange?.(star)}
            disabled={readonly}
            activeOpacity={0.7}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={size}
              color={star <= rating ? colors.rating.filled : colors.rating.empty}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
      {showLabel && rating > 0 && (
        <Text style={styles.label}>{labels[rating]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  stars: { flexDirection: 'row', justifyContent: 'center' },
  label: {
    ...typography.label,
    color: colors.accent.primary,
    marginTop: spacing.sm,
  },
});

export default StarRating;
