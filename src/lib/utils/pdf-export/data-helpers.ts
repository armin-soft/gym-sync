
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
    console.log(`در حال دریافت نام غذا برای ID: ${mealId}`);
    
    // بررسی آیا اطلاعات غذاها در localStorage ذخیره شده‌اند
    const mealsDataStr = localStorage.getItem('meals');
    if (!mealsDataStr) {
      console.warn('داده‌های غذایی در localStorage یافت نشد');
      return undefined;
    }
    
    const mealsData = JSON.parse(mealsDataStr);
    console.log('تعداد کل غذاها در localStorage:', mealsData.length);
    
    const meal = mealsData.find((meal: any) => meal.id === mealId);
    
    if (meal) {
      console.log(`غذا یافت شد: ID=${mealId}, نام=${meal.name}`);
      return meal.name;
    } else {
      console.warn(`غذا با ID ${mealId} یافت نشد در ${mealsData.length} غذای موجود`);
      // برای دیباگ، تمام ID هایی که در دیتابیس هست را نمایش بده
      const availableIds = mealsData.map((m: any) => m.id);
      console.log('ID های موجود در دیتابیس:', availableIds.slice(0, 10), '...');
      return undefined;
    }
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
    if (!mealsDataStr) {
      console.warn('داده‌های غذایی در localStorage یافت نشد برای نوع غذا');
      return undefined;
    }
    
    const mealsData = JSON.parse(mealsDataStr);
    const meal = mealsData.find((meal: any) => meal.id === mealId);
    
    if (meal) {
      console.log(`نوع غذا برای ${mealId}: ${meal.type}`);
      return meal.type;
    } else {
      console.warn(`نوع غذا برای ID ${mealId} یافت نشد`);
      return undefined;
    }
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
