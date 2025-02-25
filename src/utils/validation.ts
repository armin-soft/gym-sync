
export const isValidPersianName = (name: string) => /^[\u0600-\u06FF\s]+$/.test(name);
export const isValidIranianMobile = (phone: string) => /^(09|\u06F0\u06F9)[\u06F0-\u06F9]{9}$/.test(phone);
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = (password: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
export const isValidPrice = (price: string) => /^[\u06F0-\u06F9]+$/.test(price);
