
-- جدول پروفایل مربی
CREATE TABLE public.trainer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  gym_name TEXT NOT NULL,
  gym_address TEXT NOT NULL,
  bio TEXT,
  experience TEXT,
  specialties TEXT,
  certifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول شاگردان
CREATE TABLE public.students (
  id SERIAL PRIMARY KEY,
  trainer_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  height TEXT,
  weight TEXT,
  age TEXT,
  grade TEXT,
  group_name TEXT,
  gender TEXT CHECK (gender IN ('male', 'female')),
  payment TEXT,
  image TEXT,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول دسته‌بندی تمرینات
CREATE TABLE public.exercise_categories (
  id SERIAL PRIMARY KEY,
  trainer_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول انواع تمرینات
CREATE TABLE public.exercise_types (
  id SERIAL PRIMARY KEY,
  trainer_id UUID REFERENCES auth.users,
  category_id INTEGER REFERENCES public.exercise_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول تمرینات
CREATE TABLE public.exercises (
  id SERIAL PRIMARY KEY,
  trainer_id UUID REFERENCES auth.users,
  category_id INTEGER REFERENCES public.exercise_categories(id) ON DELETE CASCADE,
  type_id INTEGER REFERENCES public.exercise_types(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  muscle_groups TEXT,
  equipment TEXT,
  difficulty_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول وعده‌های غذایی
CREATE TABLE public.meals (
  id SERIAL PRIMARY KEY,
  trainer_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  calories INTEGER,
  protein DECIMAL,
  carbs DECIMAL,
  fat DECIMAL,
  ingredients TEXT,
  preparation_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول دسته‌بندی مکمل‌ها
CREATE TABLE public.supplement_categories (
  id SERIAL PRIMARY KEY,
  trainer_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول مکمل‌ها
CREATE TABLE public.supplements (
  id SERIAL PRIMARY KEY,
  trainer_id UUID REFERENCES auth.users,
  category_id INTEGER REFERENCES public.supplement_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT,
  description TEXT,
  dosage TEXT,
  timing TEXT,
  benefits TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول برنامه تمرینی شاگردان
CREATE TABLE public.student_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id INTEGER REFERENCES public.students(id) ON DELETE CASCADE,
  exercise_id INTEGER REFERENCES public.exercises(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  sets INTEGER,
  reps TEXT,
  weight TEXT,
  rest_time TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول برنامه غذایی شاگردان
CREATE TABLE public.student_meals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id INTEGER REFERENCES public.students(id) ON DELETE CASCADE,
  meal_id INTEGER REFERENCES public.meals(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  meal_time TEXT,
  portion_size TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول مکمل‌های شاگردان
CREATE TABLE public.student_supplements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id INTEGER REFERENCES public.students(id) ON DELETE CASCADE,
  supplement_id INTEGER REFERENCES public.supplements(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  dosage TEXT,
  timing TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- فعال‌سازی Row Level Security
ALTER TABLE public.trainer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplement_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_supplements ENABLE ROW LEVEL SECURITY;

-- سیاست‌های دسترسی برای مربیان
CREATE POLICY "Trainers can manage their own profile" ON public.trainer_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Trainers can manage their students" ON public.students
  FOR ALL USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can manage their exercise categories" ON public.exercise_categories
  FOR ALL USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can manage their exercise types" ON public.exercise_types
  FOR ALL USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can manage their exercises" ON public.exercises
  FOR ALL USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can manage their meals" ON public.meals
  FOR ALL USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can manage their supplement categories" ON public.supplement_categories
  FOR ALL USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can manage their supplements" ON public.supplements
  FOR ALL USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can manage student exercises" ON public.student_exercises
  FOR ALL USING (auth.uid() = (SELECT trainer_id FROM public.students WHERE id = student_id));

CREATE POLICY "Trainers can manage student meals" ON public.student_meals
  FOR ALL USING (auth.uid() = (SELECT trainer_id FROM public.students WHERE id = student_id));

CREATE POLICY "Trainers can manage student supplements" ON public.student_supplements
  FOR ALL USING (auth.uid() = (SELECT trainer_id FROM public.students WHERE id = student_id));
