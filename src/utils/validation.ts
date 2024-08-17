import { REGEX_PATTERNS } from "@/constants/RegexPatterns";

// Type for validation result
type ValidationResult = {
  isValid: boolean;
  reason?: string;
};

// Email validation function
const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, reason: "Email is required." };
  }
  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return { isValid: false, reason: "Invalid email format." };
  }
  return { isValid: true };
};

// Phone number validation function
const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, reason: "Phone number is required." };
  }
  if (!REGEX_PATTERNS.PHONE.test(phone)) {
    return { isValid: false, reason: "Invalid phone number format." };
  }
  return { isValid: true };
};

// Password validation function
const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, reason: "Password is required." };
  }
  if (password.length < 8) {
    return { isValid: false, reason: "Password must be at least 8 characters long." };
  }
  if (!REGEX_PATTERNS.PASSWORD.test(password)) {
    return {
      isValid: false,
      reason:
        "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character."
    };
  }
  return { isValid: true };
};

// Name validation function
const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, reason: "Name is required." };
  }
  if (!REGEX_PATTERNS.NAME.test(name)) {
    return { isValid: false, reason: "Name can only contain letters and spaces." };
  }
  return { isValid: true };
};

// Number validation function
const validateNumber = (number: string): ValidationResult => {
  if (!number) {
    return { isValid: false, reason: "Number is required." };
  }
  if (!REGEX_PATTERNS.NUMBER.test(number)) {
    return { isValid: false, reason: "Number can only contain digits." };
  }
  return { isValid: true };
};

// Text validation function
const validateText = (text: string): ValidationResult => {
  if (!text) {
    return { isValid: false, reason: "Text is required." };
  }
  if (!REGEX_PATTERNS.TEXT.test(text)) {
    return { isValid: false, reason: "Text can only contain alphanumeric characters and spaces." };
  }
  return { isValid: true };
};

// Exporting all validation functions
export { validateEmail, validatePhoneNumber, validatePassword, validateName, validateNumber, validateText };
