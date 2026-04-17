// AutoGo - Reusable Button Component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { borderRadius } from '../theme/spacing';
import type { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return { bg: colors.button.secondary, text: colors.button.secondaryText, border: colors.background.glassBorder };
      case 'danger':
        return { bg: colors.button.danger, text: colors.button.dangerText, border: 'transparent' };
      case 'outline':
        return { bg: 'transparent', text: colors.accent.primary, border: colors.accent.primary };
      case 'ghost':
        return { bg: 'transparent', text: colors.accent.primary, border: 'transparent' };
      default:
        return { bg: colors.button.primary, text: colors.button.primaryText, border: 'transparent' };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small': return { height: 40, paddingHorizontal: 16, fontSize: 13 };
      case 'medium': return { height: 48, paddingHorizontal: 20, fontSize: 14 };
      default: return { height: 56, paddingHorizontal: 24, fontSize: 16 };
    }
  };

  const variantStyle = getVariantStyle();
  const sizeStyle = getSizeStyle();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.button.disabled : variantStyle.bg,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          borderColor: variantStyle.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon as any} size={20} color={disabled ? colors.button.disabledText : variantStyle.text} style={{ marginLeft: 8 }} />
          )}
          <Text style={[
            styles.text,
            { color: disabled ? colors.button.disabledText : variantStyle.text, fontSize: sizeStyle.fontSize },
            textStyle,
          ]}>
            {title}
          </Text>
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon as any} size={20} color={disabled ? colors.button.disabledText : variantStyle.text} style={{ marginRight: 8 }} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.button,
    textAlign: 'center',
  },
});

export default Button;
