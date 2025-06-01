
import { TrainerProfile } from "@/types/trainer";

export const validateField = (
  key: keyof TrainerProfile,
  value: string,
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>
) => {
  let isValid = true;
  let error = '';

  switch (key) {
    case 'name':
      if (!value.trim()) {
        isValid = false;
        error = 'نام و نام خانوادگی الزامی است';
      } else if (value.trim().length < 2) {
        isValid = false;
        error = 'نام باید حداقل ۲ کاراکتر باشد';
      }
      break;
      
    case 'phone':
      const phoneRegex = /^(09|۰۹)[0-9۰-۹]{9}$/;
      if (!value.trim()) {
        isValid = false;
        error = 'شماره موبایل الزامی است';
      } else if (!phoneRegex.test(value)) {
        isValid = false;
        error = 'شماره موبایل معتبر نیست';
      }
      break;
      
    case 'gymName':
      if (!value.trim()) {
        isValid = false;
        error = 'نام باشگاه الزامی است';
      }
      break;
      
    case 'gymAddress':
      if (!value.trim()) {
        isValid = false;
        error = 'آدرس باشگاه الزامی است';
      }
      break;
      
    case 'instagram':
      if (value && !value.match(/^[a-zA-Z0-9._]+$/)) {
        isValid = false;
        error = 'نام کاربری اینستاگرام معتبر نیست';
      }
      break;
      
    case 'website':
      if (value && !value.match(/^https?:\/\/.+/)) {
        isValid = false;
        error = 'آدرس وب‌سایت باید با http:// یا https:// شروع شود';
      }
      break;
  }

  setValidFields(prev => ({ ...prev, [key]: isValid }));
  setErrors(prev => ({ ...prev, [key]: error }));
  
  return isValid;
};

export const validateAllFields = (
  profile: TrainerProfile,
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>
): boolean => {
  const requiredFields: (keyof TrainerProfile)[] = ['name', 'phone', 'gymName', 'gymAddress'];
  let hasErrors = false;

  requiredFields.forEach(field => {
    const isValid = validateField(field, profile[field], setValidFields, setErrors);
    if (!isValid) hasErrors = true;
  });

  // Validate optional fields if they have values
  if (profile.instagram) {
    const isValid = validateField('instagram', profile.instagram, setValidFields, setErrors);
    if (!isValid) hasErrors = true;
  }
  
  if (profile.website) {
    const isValid = validateField('website', profile.website, setValidFields, setErrors);
    if (!isValid) hasErrors = true;
  }

  return hasErrors;
};
