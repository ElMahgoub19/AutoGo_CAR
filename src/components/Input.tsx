// AutoGo - Reusable Input Component
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { borderRadius, spacing } from '../theme/spacing';
import type { InputProps } from '../types';

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  rightIcon,
  onRightIconPress,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  maxLength,
  error,
  editable = true,
  style,
  inputStyle,
  labelStyle,
  hint,
  prefix,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputFocused,
        error && styles.inputError,
        multiline && { height: 100, alignItems: 'flex-start' as const, paddingTop: 12 },
      ]}>
        {icon && (
          <Ionicons name={icon as any} size={20} color={colors.text.tertiary} style={{ marginLeft: 12 }} />
        )}
        {prefix && (
          <Text style={styles.prefix}>{prefix}</Text>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.input.placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            { writingDirection: 'rtl', textAlign: 'right' },
            multiline && { textAlignVertical: 'top' as const },
            inputStyle,
          ]}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{ marginRight: 12 }}>
            <Ionicons name={rightIcon as any} size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>
      {maxLength && multiline && (
        <Text style={styles.counter}>{value?.length || 0}/{maxLength}</Text>
      )}
      {hint && <Text style={styles.hint}>{hint}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: spacing.base },
  label: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input.background,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.input.border,
    height: 52,
  },
  inputFocused: {
    borderColor: colors.input.borderFocused,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: colors.emergency.primary,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.input.text,
    paddingHorizontal: spacing.base,
    height: '100%',
  },
  prefix: {
    ...typography.body,
    color: colors.text.secondary,
    paddingLeft: spacing.base,
    borderLeftWidth: 1,
    borderLeftColor: colors.divider,
    paddingRight: spacing.sm,
    marginLeft: spacing.sm,
  },
  hint: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  counter: {
    ...typography.caption,
    color: colors.text.muted,
    marginTop: spacing.xs,
    textAlign: 'left',
  },
  error: {
    ...typography.caption,
    color: colors.emergency.primary,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
});

export default Input;
