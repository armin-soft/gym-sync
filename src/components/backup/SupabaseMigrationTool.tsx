
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Upload, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MigrationStep {
  name: string;
  completed: boolean;
  error?: string;
  count?: number;
}

export const SupabaseMigrationTool: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [migrationSteps, setMigrationSteps] = useState<MigrationStep[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const updateStep = (stepName: string, updates: Partial<MigrationStep>) => {
    setMigrationSteps(prev => prev.map(step => 
      step.name === stepName ? { ...step, ...updates } : step
    ));
  };

  const migrateTrainerProfile = async () => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (!savedProfile) return { count: 0 };

      const profile = JSON.parse(savedProfile);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('کاربر وارد نشده است');

      const { error } = await supabase
        .from('trainer_profiles')
        .upsert({
          user_id: user.id,
          name: profile.name || '',
          phone: profile.phone || '',
          email: profile.email || user.email || '',
          gym_name: profile.gymName || '',
          gym_address: profile.gymAddress || '',
          bio: profile.bio || '',
          experience: profile.experience || '',
          specialties: profile.specialties || '',
          certifications: profile.certifications || ''
        });

      if (error) throw error;
      return { count: 1 };
    } catch (error) {
      console.error('خطا در انتقال پروفایل مربی:', error);
      throw error;
    }
  };

  const migrateStudents = async () => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (!savedStudents) return { count: 0 };

      const students = JSON.parse(savedStudents);
      if (!Array.isArray(students)) return { count: 0 };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('کاربر وارد نشده است');

      const studentsData = students.map(student => ({
        trainer_id: user.id,
        name: student.name || '',
        phone: student.phone || '',
        height: student.height?.toString() || '',
        weight: student.weight?.toString() || '',
        age: student.age?.toString() || '',
        grade: student.grade || '',
        group_name: student.groupName || '',
        gender: student.gender || 'male',
        payment: student.payment || student.paymentStatus || '',
        image: student.image || student.profileImage || '',
        progress: student.progress || 0
      }));

      const { error } = await supabase
        .from('students')
        .insert(studentsData);

      if (error) throw error;
      return { count: students.length };
    } catch (error) {
      console.error('خطا در انتقال شاگردان:', error);
      throw error;
    }
  };

  const migrateExerciseCategories = async () => {
    try {
      const savedCategories = localStorage.getItem('exerciseCategories');
      if (!savedCategories) return { count: 0 };

      const categories = JSON.parse(savedCategories);
      if (!Array.isArray(categories)) return { count: 0 };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('کاربر وارد نشده است');

      const categoriesData = categories.map(category => ({
        trainer_id: user.id,
        name: category.name || '',
        description: category.description || ''
      }));

      const { error } = await supabase
        .from('exercise_categories')
        .insert(categoriesData);

      if (error) throw error;
      return { count: categories.length };
    } catch (error) {
      console.error('خطا در انتقال دسته‌بندی تمرینات:', error);
      throw error;
    }
  };

  const migrateExerciseTypes = async () => {
    try {
      const savedTypes = localStorage.getItem('exerciseTypes');
      if (!savedTypes) return { count: 0 };

      const types = JSON.parse(savedTypes);
      if (!Array.isArray(types)) return { count: 0 };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('کاربر وارد نشده است');

      const typesData = types.map(type => ({
        trainer_id: user.id,
        name: type.name || '',
        description: type.description || ''
      }));

      const { error } = await supabase
        .from('exercise_types')
        .insert(typesData);

      if (error) throw error;
      return { count: types.length };
    } catch (error) {
      console.error('خطا در انتقال انواع تمرینات:', error);
      throw error;
    }
  };

  const migrateExercises = async () => {
    try {
      const savedExercises = localStorage.getItem('exercises');
      if (!savedExercises) return { count: 0 };

      const exercises = JSON.parse(savedExercises);
      if (!Array.isArray(exercises)) return { count: 0 };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('کاربر وارد نشده است');

      const exercisesData = exercises.map(exercise => ({
        trainer_id: user.id,
        name: exercise.name || '',
        description: exercise.description || '',
        muscle_groups: exercise.targetMuscle || exercise.muscles?.join(', ') || '',
        equipment: exercise.equipment || '',
        difficulty_level: exercise.difficulty || ''
      }));

      const { error } = await supabase
        .from('exercises')
        .insert(exercisesData);

      if (error) throw error;
      return { count: exercises.length };
    } catch (error) {
      console.error('خطا در انتقال تمرینات:', error);
      throw error;
    }
  };

  const migrateMeals = async () => {
    try {
      const savedMeals = localStorage.getItem('meals');
      if (!savedMeals) return { count: 0 };

      const meals = JSON.parse(savedMeals);
      if (!Array.isArray(meals)) return { count: 0 };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('کاربر وارد نشده است');

      const mealsData = meals.map(meal => ({
        trainer_id: user.id,
        name: meal.name || '',
        type: meal.type || '',
        description: meal.description || '',
        calories: meal.calories ? parseInt(meal.calories) : null,
        protein: meal.protein ? parseFloat(meal.protein) : null,
        carbs: meal.carbs ? parseFloat(meal.carbs) : null,
        fat: meal.fat ? parseFloat(meal.fat) : null
      }));

      const { error } = await supabase
        .from('meals')
        .insert(mealsData);

      if (error) throw error;
      return { count: meals.length };
    } catch (error) {
      console.error('خطا در انتقال وعده‌های غذایی:', error);
      throw error;
    }
  };

  const migrateSupplements = async () => {
    try {
      const savedSupplements = localStorage.getItem('supplements');
      if (!savedSupplements) return { count: 0 };

      const supplements = JSON.parse(savedSupplements);
      if (!Array.isArray(supplements)) return { count: 0 };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('کاربر وارد نشده است');

      const supplementsData = supplements.map(supplement => ({
        trainer_id: user.id,
        name: supplement.name || '',
        description: supplement.description || '',
        dosage: supplement.dosage || '',
        timing: supplement.timing || ''
      }));

      const { error } = await supabase
        .from('supplements')
        .insert(supplementsData);

      if (error) throw error;
      return { count: supplements.length };
    } catch (error) {
      console.error('خطا در انتقال مکمل‌ها:', error);
      throw error;
    }
  };

  const startMigration = async () => {
    setIsLoading(true);
    setProgress(0);
    setIsCompleted(false);
    
    const steps: MigrationStep[] = [
      { name: 'پروفایل مربی', completed: false },
      { name: 'شاگردان', completed: false },
      { name: 'دسته‌بندی تمرینات', completed: false },
      { name: 'انواع تمرینات', completed: false },
      { name: 'تمرینات', completed: false },
      { name: 'وعده‌های غذایی', completed: false },
      { name: 'مکمل‌ها', completed: false }
    ];
    
    setMigrationSteps(steps);

    const migrationFunctions = [
      { name: 'پروفایل مربی', fn: migrateTrainerProfile },
      { name: 'شاگردان', fn: migrateStudents },
      { name: 'دسته‌بندی تمرینات', fn: migrateExerciseCategories },
      { name: 'انواع تمرینات', fn: migrateExerciseTypes },
      { name: 'تمرینات', fn: migrateExercises },
      { name: 'وعده‌های غذایی', fn: migrateMeals },
      { name: 'مکمل‌ها', fn: migrateSupplements }
    ];

    let completedSteps = 0;
    let totalMigrated = 0;

    for (const { name, fn } of migrationFunctions) {
      try {
        const result = await fn();
        updateStep(name, { completed: true, count: result.count });
        totalMigrated += result.count || 0;
        completedSteps++;
        setProgress((completedSteps / migrationFunctions.length) * 100);
        
        // شبیه‌سازی تاخیر برای نمایش بهتر پیشرفت
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        updateStep(name, { 
          completed: false, 
          error: error instanceof Error ? error.message : 'خطای نامشخص' 
        });
        console.error(`خطا در ${name}:`, error);
      }
    }

    setIsCompleted(true);
    setIsLoading(false);
    
    toast({
      title: "انتقال تکمیل شد",
      description: `${totalMigrated} رکورد با موفقیت منتقل شد`,
      className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto" dir="rtl">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Database className="w-8 h-8 text-emerald-600" />
          <h2 className="text-2xl font-bold">انتقال داده‌ها به Supabase</h2>
        </div>
        <p className="text-gray-600">
          تمام داده‌های محلی شما به پایگاه داده Supabase منتقل می‌شود
        </p>
      </div>

      {!isCompleted && (
        <Button
          onClick={startMigration}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white mb-6"
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>در حال انتقال...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              <span>شروع انتقال داده‌ها</span>
            </div>
          )}
        </Button>
      )}

      {isLoading && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>پیشرفت کلی</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {migrationSteps.length > 0 && (
        <div className="space-y-3">
          {migrationSteps.map((step) => (
            <div
              key={step.name}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                step.completed 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : step.error 
                  ? 'bg-red-50 border-red-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {step.completed ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : step.error ? (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                )}
                <span className="font-medium">{step.name}</span>
                {step.count !== undefined && step.count > 0 && (
                  <span className="text-sm text-gray-500">({step.count} مورد)</span>
                )}
              </div>
              
              {step.error && (
                <span className="text-sm text-red-600">{step.error}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {isCompleted && (
        <Alert className="mt-6 bg-gradient-to-r from-emerald-50 to-sky-50 border-emerald-200">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <AlertDescription className="text-emerald-800">
            انتقال داده‌ها با موفقیت تکمیل شد! حالا تمام اطلاعات شما در Supabase ذخیره شده و از همه مرورگرها قابل دسترسی است.
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
};
