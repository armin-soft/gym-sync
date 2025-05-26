
// تابع کمکی برای استخراج نام تمرین از آیدی
export function getExerciseName(exerciseId: number): string | undefined {
  try {
    // بررسی آیا اطلاعات تمرین‌ها در localStorage ذخیره شده‌اند
    const exercisesDataStr = localStorage.getItem('exercises');
    if (!exercisesDataStr) return undefined;
    
    const exercisesData = JSON.parse(exercisesDataStr);
    const exercise = exercisesData.find((ex: any) => ex.id === exerciseId);
    
    return exercise?.name;
  } catch (error) {
    console.error("خطا در گرفتن نام تمرین:", error);
    return undefined;
  }
}

// تابع کمکی برای استخراج نام غذا از آیدی
export function getMealName(mealId: number): string | undefined {
  try {
    // بررسی آیا اطلاعات غذاها در localStorage ذخیره شده‌اند
    const mealsDataStr = localStorage.getItem('meals');
    if (!mealsDataStr) return undefined;
    
    const mealsData = JSON.parse(mealsDataStr);
    const meal = mealsData.find((meal: any) => meal.id === mealId);
    
    return meal?.name;
  } catch (error) {
    console.error("خطا در گرفتن نام غذا:", error);
    return undefined;
  }
}

// تابع کمکی برای استخراج نوع غذا از آیدی
export function getMealType(mealId: number): string | undefined {
  try {
    // بررسی آیا اطلاعات غذاها در localStorage ذخیره شده‌اند
    const mealsDataStr = localStorage.getItem('meals');
    if (!mealsDataStr) return undefined;
    
    const mealsData = JSON.parse(mealsDataStr);
    const meal = mealsData.find((meal: any) => meal.id === mealId);
    
    return meal?.type;
  } catch (error) {
    console.error("خطا در گرفتن نوع غذا:", error);
    return undefined;
  }
}

// تابع کمکی برای استخراج نام مکمل از آیدی
export function getSupplementName(suppId: number): string | undefined {
  try {
    // بررسی آیا اطلاعات مکمل‌ها در localStorage ذخیره شده‌اند
    const supplementsDataStr = localStorage.getItem('supplements');
    if (!supplementsDataStr) return undefined;
    
    const supplementsData = JSON.parse(supplementsDataStr);
    const supplement = supplementsData.find((supp: any) => supp.id === suppId);
    
    return supplement?.name;
  } catch (error) {
    console.error("خطا در گرفتن نام مکمل:", error);
    return undefined;
  }
}

// تابع کمکی برای استخراج نوع مکمل از آیدی
export function getSupplementType(suppId: number): string | undefined {
  try {
    // بررسی آیا اطلاعات مکمل‌ها در localStorage ذخیره شده‌اند
    const supplementsDataStr = localStorage.getItem('supplements');
    if (!supplementsDataStr) return undefined;
    
    const supplementsData = JSON.parse(supplementsDataStr);
    const supplement = supplementsData.find((supp: any) => supp.id === suppId);
    
    return supplement?.category || supplement?.type;
  } catch (error) {
    console.error("خطا در گرفتن نوع مکمل:", error);
    return undefined;
  }
}

// تابع کمکی برای گرفتن وزن مناسب مصرف مکمل
export function getSupplementDosage(suppId: number): string {
  // این تابع می‌تواند در آینده برای اطلاعات واقعی دوز مکمل‌ها تکمیل شود
  return '1 عدد';
}

// تابع کمکی برای گرفتن زمان مصرف مناسب مکمل
export function getSupplementTiming(suppId: number): string {
  // این تابع می‌تواند در آینده برای اطلاعات واقعی زمان مصرف مکمل‌ها تکمیل شود
  return 'بعد از تمرین';
}
