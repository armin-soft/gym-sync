
import { getDayName } from "@/lib/utils";

// Helper functions to get name information from IDs
export function getExerciseName(exerciseId: number): string {
  try {
    const exercisesStr = localStorage.getItem('exercises');
    if (!exercisesStr) return '';
    
    const exercises = JSON.parse(exercisesStr);
    const exercise = exercises.find((ex: any) => ex.id === exerciseId);
    return exercise ? exercise.name : '';
  } catch (e) {
    console.error("Error getting exercise name:", e);
    return '';
  }
}

export function getMealName(mealId: number): string {
  try {
    const mealsStr = localStorage.getItem('meals');
    if (!mealsStr) return '';
    
    const meals = JSON.parse(mealsStr);
    const meal = meals.find((m: any) => m.id === mealId);
    return meal ? meal.name : '';
  } catch (e) {
    console.error("Error getting meal name:", e);
    return '';
  }
}

export function getMealType(mealId: number): string {
  try {
    const mealsStr = localStorage.getItem('meals');
    if (!mealsStr) return '';
    
    const meals = JSON.parse(mealsStr);
    const meal = meals.find((m: any) => m.id === mealId);
    return meal ? meal.type : '';
  } catch (e) {
    console.error("Error getting meal type:", e);
    return '';
  }
}

export function getSupplementName(supplementId: number): string {
  try {
    const supplementsStr = localStorage.getItem('supplements');
    if (!supplementsStr) return '';
    
    const supplements = JSON.parse(supplementsStr);
    const supplement = supplements.find((s: any) => s.id === supplementId);
    return supplement ? supplement.name : '';
  } catch (e) {
    console.error("Error getting supplement name:", e);
    return '';
  }
}

export function getSupplementType(supplementId: number): string {
  try {
    const supplementsStr = localStorage.getItem('supplements');
    if (!supplementsStr) return '';
    
    const supplements = JSON.parse(supplementsStr);
    const supplement = supplements.find((s: any) => s.id === supplementId);
    return supplement ? supplement.type : '';
  } catch (e) {
    console.error("Error getting supplement type:", e);
    return '';
  }
}
