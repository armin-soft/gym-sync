
export const getExerciseNameFromStorage = (exerciseId: number): string => {
  try {
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    const exercise = exercises.find((e: any) => e.id === exerciseId);
    return exercise?.name || 'تمرین نامشخص';
  } catch {
    return 'تمرین نامشخص';
  }
};

export const getMealNameFromStorage = (mealId: number): string => {
  try {
    const meals = JSON.parse(localStorage.getItem('meals') || '[]');
    const meal = meals.find((m: any) => m.id === mealId);
    return meal?.name || 'غذای نامشخص';
  } catch {
    return 'غذای نامشخص';
  }
};

export const getSupplementNameFromStorage = (supplementId: number): string => {
  try {
    const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
    const supplement = supplements.find((s: any) => s.id === supplementId);
    return supplement?.name || 'مکمل نامشخص';
  } catch {
    return 'مکمل نامشخص';
  }
};

export const getSupplementDosageFromStorage = (supplementId: number): string => {
  try {
    const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
    const supplement = supplements.find((s: any) => s.id === supplementId);
    return supplement?.dosage || '1 عدد';
  } catch {
    return '1 عدد';
  }
};

export const getSupplementTimingFromStorage = (supplementId: number): string => {
  try {
    const supplements = JSON.parse(localStorage.getItem('supplements') || '[]');
    const supplement = supplements.find((s: any) => s.id === supplementId);
    return supplement?.timing || 'صبح';
  } catch {
    return 'صبح';
  }
};
