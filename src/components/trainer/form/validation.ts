
import { TrainerProfile } from "@/types/trainer";
import { isValidEmail, isValidIranianMobile, isValidPassword, isValidPersianName } from "@/utils/validation";

export const validateField = (
  key: keyof TrainerProfile,
  value: string,
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>
) => {
  let isValid = false;
  let error = '';

  switch (key) {
    case 'name':
      isValid = isValidPersianName(value);
      error = !value ? "نام و نام خانوادگی اجباری است" : 
              !isValid ? "لطفاً نام را به فارسی وارد کنید" : '';
      break;
    case 'bio':
      isValid = !!value;
      error = !isValid ? "بیوگرافی اجباری است" : '';
      break;
    case 'phone':
      isValid = isValidIranianMobile(value);
      error = !value ? "شماره موبایل اجباری است" :
              !isValid ? "شماره موبایل معتبر نیست" : '';
      break;
    case 'email':
      isValid = isValidEmail(value);
      error = !value ? "ایمیل اجباری است" :
              !isValid ? "ایمیل معتبر نیست" : '';
      break;
    case 'password':
      isValid = isValidPassword(value);
      error = !value ? "گذرواژه اجباری است" :
              !isValid ? "گذرواژه باید شامل حروف انگلیسی و اعداد باشد (حداقل ۸ کاراکتر)" : '';
      break;
    case 'gymName':
      isValid = !!value;
      error = !isValid ? "نام باشگاه اجباری است" : '';
      break;
    case 'gymDescription':
      isValid = !!value;
      error = !isValid ? "توضیحات باشگاه اجباری است" : '';
      break;
    case 'gymAddress':
      isValid = !!value;
      error = !isValid ? "آدرس باشگاه اجباری است" : '';
      break;
    case 'instagram':
      // اینستاگرام اختیاری است
      isValid = true;
      break;
    case 'website':
      // وب‌سایت اختیاری است
      isValid = true;
      break;
    default:
      isValid = true;
  }

  setValidFields((prev) => ({ ...prev, [key]: isValid }));
  setErrors((prev) => ({ ...prev, [key]: error }));
  
  return { isValid, error };
};

export const validateAllFields = (
  profile: TrainerProfile,
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>
) => {
  let hasErrors = false;
  
  Object.entries(profile).forEach(([key, value]) => {
    if (key !== 'image' && key !== 'profileImage' && key !== 'socialMedia') {
      const { isValid, error } = validateField(key as keyof TrainerProfile, value, setValidFields, setErrors);
      if (!value || error) {
        hasErrors = true;
      }
    }
  });
  
  return hasErrors;
};
