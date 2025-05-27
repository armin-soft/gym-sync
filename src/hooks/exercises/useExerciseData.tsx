
import { useState, useEffect } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";

// Sample exercise types
const SAMPLE_EXERCISE_TYPES = [
  "قدرتی",
  "کارديو",
  "کششی",
  "تعادلی",
  "عملکردی"
];

// Sample exercise categories
const SAMPLE_EXERCISE_CATEGORIES: ExerciseCategory[] = [
  // قدرتی
  { id: 1, name: "سینه", type: "قدرتی", description: "تمرینات عضلات سینه" },
  { id: 2, name: "پشت", type: "قدرتی", description: "تمرینات عضلات پشت" },
  { id: 3, name: "شانه", type: "قدرتی", description: "تمرینات عضلات شانه" },
  { id: 4, name: "بازو", type: "قدرتی", description: "تمرینات عضلات بازو" },
  { id: 5, name: "ساعد", type: "قدرتی", description: "تمرینات عضلات ساعد" },
  { id: 6, name: "شکم", type: "قدرتی", description: "تمرینات عضلات شکم" },
  { id: 7, name: "پا", type: "قدرتی", description: "تمرینات عضلات پا" },
  
  // کاردیو
  { id: 8, name: "دویدن", type: "کارديو", description: "تمرینات دویدن و جاگینگ" },
  { id: 9, name: "دوچرخه", type: "کارديو", description: "تمرینات دوچرخه‌سواری" },
  { id: 10, name: "شنا", type: "کارديو", description: "تمرینات شنا" },
  { id: 11, name: "پیاده‌روی", type: "کارديو", description: "تمرینات پیاده‌روی" },
  
  // کششی
  { id: 12, name: "کش قدامی", type: "کششی", description: "کشش عضلات قدامی بدن" },
  { id: 13, name: "کش خلفی", type: "کششی", description: "کشش عضلات خلفی بدن" },
  { id: 14, name: "کش جانبی", type: "کششی", description: "کشش عضلات جانبی بدن" },
  
  // تعادلی
  { id: 15, name: "یوگا", type: "تعادلی", description: "تمرینات یوگا و تعادل" },
  { id: 16, name: "پیلاتس", type: "تعادلی", description: "تمرینات پیلاتس" },
  
  // عملکردی
  { id: 17, name: "کراس فیت", type: "عملکردی", description: "تمرینات کراس فیت" },
  { id: 18, name: "حرکات ترکیبی", type: "عملکردی", description: "تمرینات حرکات ترکیبی" }
];

// Sample exercises
const SAMPLE_EXERCISES: Exercise[] = [
  // سینه
  { id: 1, name: "پرس سینه با دمبل", categoryId: 1, description: "تمرین اصلی عضلات سینه", targetMuscle: "سینه" },
  { id: 2, name: "پرس سینه با هالتر", categoryId: 1, description: "تمرین کلاسیک سینه", targetMuscle: "سینه" },
  { id: 3, name: "فلای سینه", categoryId: 1, description: "تمرین جداسازی سینه", targetMuscle: "سینه" },
  
  // پشت
  { id: 4, name: "پول آپ", categoryId: 2, description: "تمرین وزن بدن برای پشت", targetMuscle: "پشت" },
  { id: 5, name: "رودینگ با دمبل", categoryId: 2, description: "تمرین پارویینگ پشت", targetMuscle: "پشت" },
  { id: 6, name: "لت پول داون", categoryId: 2, description: "تمرین ماشین پشت", targetMuscle: "پشت" },
  
  // شانه
  { id: 7, name: "پرس شانه نشسته", categoryId: 3, description: "تمرین اصلی شانه", targetMuscle: "شانه" },
  { id: 8, name: "رایز جانبی", categoryId: 3, description: "تمرین جداسازی شانه", targetMuscle: "شانه" },
  { id: 9, name: "رایز خلفی", categoryId: 3, description: "تمرین دلتوئید خلفی", targetMuscle: "شانه" },
  
  // بازو
  { id: 10, name: "بارفیکس", categoryId: 4, description: "تمرین دوسر بازو", targetMuscle: "دوسر بازو" },
  { id: 11, name: "حرکت مچ", categoryId: 4, description: "تمرین جلو بازو", targetMuscle: "جلو بازو" },
  { id: 12, name: "ترایسپس پشت سر", categoryId: 4, description: "تمرین سه‌سر بازو", targetMuscle: "سه‌سر بازو" },
  
  // شکم
  { id: 13, name: "کرانچ", categoryId: 6, description: "تمرین کلاسیک شکم", targetMuscle: "شکم" },
  { id: 14, name: "پلانک", categoryId: 6, description: "تمرین ثبات مرکزی", targetMuscle: "کور" },
  { id: 15, name: "دوچرخه هوایی", categoryId: 6, description: "تمرین شکم و اریب", targetMuscle: "شکم" },
  
  // پا
  { id: 16, name: "اسکوات", categoryId: 7, description: "تمرین اصلی پا", targetMuscle: "چهارسر ران" },
  { id: 17, name: "ددلیفت", categoryId: 7, description: "تمرین ترکیبی پا و پشت", targetMuscle: "همسترینگ" },
  { id: 18, name: "لانژ", categoryId: 7, description: "تمرین تک پای پا", targetMuscle: "پا" },
  
  // کاردیو
  { id: 19, name: "دویدن روی تردمیل", categoryId: 8, description: "دویدن در سالن", targetMuscle: "کل بدن" },
  { id: 20, name: "دوچرخه ثابت", categoryId: 9, description: "دوچرخه‌سواری در سالن", targetMuscle: "پا" },
  { id: 21, name: "پیاده‌روی سریع", categoryId: 11, description: "پیاده‌روی با سرعت بالا", targetMuscle: "پا" },
  
  // کششی
  { id: 22, name: "کشش همسترینگ", categoryId: 13, description: "کشش عضلات پشت ران", targetMuscle: "همسترینگ" },
  { id: 23, name: "کشش چهارسر", categoryId: 12, description: "کشش عضلات جلو ران", targetMuscle: "چهارسر" },
  { id: 24, name: "کشش کف پا", categoryId: 13, description: "کشش عضلات کف پا", targetMuscle: "کف پا" }
];

export const useExerciseData = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        // Load exercises from localStorage or use sample data
        const savedExercises = localStorage.getItem('exercises');
        const parsedExercises = savedExercises ? JSON.parse(savedExercises) : SAMPLE_EXERCISES;
        
        // Load categories from localStorage or use sample data
        const savedCategories = localStorage.getItem('exerciseCategories');
        const parsedCategories = savedCategories ? JSON.parse(savedCategories) : SAMPLE_EXERCISE_CATEGORIES;
        
        // Load exercise types from localStorage or use sample data
        const savedTypes = localStorage.getItem('exerciseTypes');
        const parsedTypes = savedTypes ? JSON.parse(savedTypes) : SAMPLE_EXERCISE_TYPES;
        
        console.log("Loading exercise data:");
        console.log("Exercises:", parsedExercises);
        console.log("Categories:", parsedCategories);
        console.log("Types:", parsedTypes);
        
        setExercises(parsedExercises);
        setCategories(parsedCategories);
        setExerciseTypes(parsedTypes);
        
        // Save sample data to localStorage if not exists
        if (!savedExercises) {
          localStorage.setItem('exercises', JSON.stringify(SAMPLE_EXERCISES));
        }
        if (!savedCategories) {
          localStorage.setItem('exerciseCategories', JSON.stringify(SAMPLE_EXERCISE_CATEGORIES));
        }
        if (!savedTypes) {
          localStorage.setItem('exerciseTypes', JSON.stringify(SAMPLE_EXERCISE_TYPES));
        }
        
      } catch (error) {
        console.error("Error loading exercise data:", error);
        // Fallback to sample data
        setExercises(SAMPLE_EXERCISES);
        setCategories(SAMPLE_EXERCISE_CATEGORIES);
        setExerciseTypes(SAMPLE_EXERCISE_TYPES);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    exercises,
    categories,
    exerciseTypes,
    isLoading,
    setExercises,
    setCategories,
    setExerciseTypes
  };
};
