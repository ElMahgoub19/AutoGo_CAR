// AutoGo Design System - Colors
// Extracted from the design reference images

export const colors = {
  // Primary backgrounds
  background: {
    primary: '#0A1F2E',
    secondary: '#0D2B2D',
    card: 'rgba(13, 59, 58, 0.6)',
    cardBorder: 'rgba(45, 212, 191, 0.2)',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    dark: '#0A1520',
    darkCard: '#111D2A',
  },

  // Gradient backgrounds
  gradient: {
    primary: ['#0A1F2E', '#0D3B3A', '#0A1F2E'] as const,
    splash: ['#0A2525', '#0D3B3A', '#0A2020'] as const,
    card: ['rgba(13, 59, 58, 0.8)', 'rgba(10, 31, 46, 0.8)'] as const,
    header: ['#0A1F2E', 'rgba(10, 31, 46, 0.0)'] as const,
  },

  // Accent colors
  accent: {
    primary: '#2DD4BF',      // Main cyan/teal
    secondary: '#00E5CC',    // Bright cyan
    light: '#5EEAD4',        // Light teal
    dark: '#0D9488',         // Dark teal
    glow: 'rgba(45, 212, 191, 0.3)',
  },

  // Emergency / SOS
  emergency: {
    primary: '#E53E3E',
    secondary: '#C53030',
    dark: '#9B2C2C',
    light: '#FC8181',
    glow: 'rgba(229, 62, 62, 0.3)',
    background: '#1A1A2E',
  },

  // Status colors
  status: {
    success: '#38A169',
    warning: '#D69E2E',
    error: '#E53E3E',
    info: '#3182CE',
    active: '#2DD4BF',
    pending: '#D69E2E',
    completed: '#38A169',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    accent: '#2DD4BF',
    dark: '#1A202C',
    muted: 'rgba(255, 255, 255, 0.4)',
  },

  // Input fields
  input: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(45, 212, 191, 0.3)',
    borderFocused: '#2DD4BF',
    placeholder: 'rgba(255, 255, 255, 0.4)',
    text: '#FFFFFF',
  },

  // Buttons
  button: {
    primary: '#2DD4BF',
    primaryText: '#0A1F2E',
    secondary: 'rgba(255, 255, 255, 0.1)',
    secondaryText: '#FFFFFF',
    danger: '#E53E3E',
    dangerText: '#FFFFFF',
    disabled: 'rgba(45, 212, 191, 0.3)',
    disabledText: 'rgba(255, 255, 255, 0.5)',
  },

  // Bottom tab
  tab: {
    background: '#111D2A',
    active: '#2DD4BF',
    inactive: 'rgba(255, 255, 255, 0.4)',
    indicator: '#2DD4BF',
  },

  // Rating
  rating: {
    filled: '#2DD4BF',
    empty: 'rgba(255, 255, 255, 0.2)',
    gold: '#F6AD55',
  },

  // White card (for light sections like car details)
  whiteCard: {
    background: '#FFFFFF',
    text: '#1A202C',
    subtitle: '#718096',
    border: '#E2E8F0',
  },

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  divider: 'rgba(255, 255, 255, 0.1)',
} as const;

export default colors;
