// AutoGo - Reusable Card Component
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';
import type { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ children, onPress, style, variant = 'glass', padding = true }) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'solid':
        return { backgroundColor: colors.background.darkCard, borderColor: colors.divider };
      case 'white':
        return { backgroundColor: colors.whiteCard.background, borderColor: colors.whiteCard.border };
      case 'accent':
        return { backgroundColor: 'rgba(45, 212, 191, 0.1)', borderColor: colors.accent.primary + '40' };
      case 'danger':
        return { backgroundColor: 'rgba(229, 62, 62, 0.1)', borderColor: colors.emergency.primary + '40' };
      case 'warning':
        return { backgroundColor: 'rgba(214, 158, 46, 0.15)', borderColor: '#D69E2E40' };
      default: // glass
        return { backgroundColor: colors.background.card, borderColor: colors.background.cardBorder };
    }
  };

  const variantStyle = getVariantStyle();
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.card,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
        },
        padding && styles.padding,
        style,
      ]}
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padding: {
    padding: spacing.base,
  },
});

export default Card;
