// Define a constant object holding various regex patterns
export const REGEX_PATTERNS = {
  // Email address pattern
  // Matches standard email addresses like "example@example.com"
  // Valid: "user@example.com", "test.email+alex@leetcode.com"
  // Invalid: "user@.com", "user@com", "user@com."
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Phone number pattern
  // Matches phone numbers with an optional leading '+' and allows up to 15 digits
  // Valid: "+1234567890", "1234567890", "+1 (234) 567-8900"
  // Invalid: "12345", "+123-45-6789-01234", "abcd1234"
  PHONE: /^\+?[1-9]\d{1,14}$/,

  // Password pattern
  // Ensures at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters
  // Valid: "Password1!", "P@ssw0rd", "1234Abc@"
  // Invalid: "password", "PASSWORD", "12345678", "abc123"
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Name pattern
  // Matches names consisting of letters and spaces only
  // Valid: "John Doe", "Jane Smith", "A B"
  // Invalid: "John123", "Jane@Smith", "John Doe!"
  NAME: /^[a-zA-Z\s]*$/,

  // Number pattern
  // Matches numeric values including zero, and allows optional leading zeros
  // Valid: "123", "0", "00001234"
  // Invalid: "12.34", "abc", "123abc"
  NUMBER: /^[0-9]*$/,

  // Text pattern
  // Matches alphanumeric text with spaces allowed
  // Valid: "Hello World", "abc123", "A1 B2 C3"
  // Invalid: "@hello", "123#", "hello!"
  TEXT: /^[a-zA-Z0-9\s]*$/
} as const;

// Define a TypeScript type that infers the shape of the REGEX_PATTERNS object
export type RegexPatterns = typeof REGEX_PATTERNS;
export default REGEX_PATTERNS;
