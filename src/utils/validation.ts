export const isValidPersianName = (name: string) => /^[\u0600-\u06FF\s]+$/.test(name);
export const isValidIranianMobile = (phone: string) => /^(09|۰۹)[0-9۰-۹]{9}$/.test(phone);
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = (password: string) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
export const isValidPrice = (price: string) => /^[0-9۰-۹]+$/.test(price);
