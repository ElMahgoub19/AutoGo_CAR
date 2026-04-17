// AutoGo - Reusable Header Component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import type { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  rightIcon,
  onRightPress,
  leftIcon,
  onLeftPress,
  transparent = false,
  style,
}) => {
  return (
    <View style={[styles.container, transparent && styles.transparent, style]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/* Left side (Action/Menu Button) */}
      <View style={styles.side}>
        {(leftIcon || rightIcon) && (
          <TouchableOpacity onPress={onLeftPress || onRightPress} style={styles.iconButton}>
            <Ionicons name={(leftIcon || rightIcon) as any} size={22} color={colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>{title}</Text>

      {/* Right side (back button) */}
      <View style={styles.side}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.iconButton}>
            <Ionicons name="chevron-forward" size={22} color={colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + spacing.sm : 50,
    paddingBottom: spacing.md,
    backgroundColor: 'transparent',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  side: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
    textAlign: 'center',
    flex: 1,
  },
});

export default Header;
