// AutoGo Design System - Typography
import { Platform } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'System' : 'Roboto';

export const typography = {
  // Headings
  h1: {
    fontFamily,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 42,
  },
  h2: {
    fontFamily,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
  },
  h3: {
    fontFamily,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
  },
  h4: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },

  // Body
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },

  // Labels
  label: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  labelSmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },

  // Button text
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  buttonSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },

  // Caption
  caption: {
    fontFamily,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
  },

  // Numbers / Prices
  price: {
    fontFamily,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
  },
  priceSmall: {
    fontFamily,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
};

export default typography;
