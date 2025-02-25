
export const isValidPersianName = (name: string) => /^[\u0600-\u06FF\s]+$/.test(name);
export const isValidIranianMobile = (phone: string) => /^(09|۰۹)[0-9۰-۹]{9}$/.test(phone);
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = (password: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
export const isValidPrice = (price: string) => /^[0-9۰-۹]+$/.test(price);
