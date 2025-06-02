
import { LOGIN_CONSTANTS } from "../constants";

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return "لطفاً شماره موبایل خود را وارد کنید";
  }
  
  if (phone.length !== LOGIN_CONSTANTS.PHONE_LENGTH) {
    return "شماره موبایل باید ۱۱ رقم باشد";
  }
  
  return null;
};

export const validatePhoneAccess = (phone: string, allowedPhone: string): string | null => {
  if (phone !== allowedPhone) {
    return "شماره موبایل وارد شده مجاز نیست";
  }
  
  return null;
};

export const validateCode = (code: string): string | null => {
  if (code.length !== LOGIN_CONSTANTS.CODE_LENGTH) {
    return "کد تأیید باید ۶ رقم باشد";
  }
  
  return null;
};

export const isValidCode = (code: string): boolean => {
  return code === LOGIN_CONSTANTS.VALID_CODE;
};
