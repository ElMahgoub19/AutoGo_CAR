// AutoGo - Phone Utility

/**
 * Formats a local Egyptian phone number to the international E.164 format.
 * Example inputs: '01012345678', '1012345678', '+201012345678'
 * Returns: '+201012345678'
 */
export const formatEgyptianPhone = (phone: string): string => {
  // Remove all non-numeric characters except the leading '+'
  let cleaned = phone.replace(/(?!^\+)\D/g, '');

  if (cleaned.startsWith('+20')) {
    return cleaned;
  }

  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  return `+20${cleaned}`;
};

/**
 * Validates an Egyptian phone number
 */
export const isValidEgyptianPhone = (phone: string): boolean => {
  const formatted = formatEgyptianPhone(phone);
  // An Egyptian mobile number in E.164 format should be +20 followed by 10 digits (e.g. 10xxxxxxxx)
  return /^\+201[0125][0-9]{8}$/.test(formatted);
};
