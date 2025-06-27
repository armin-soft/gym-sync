
-- Add public access policies for data migration
-- Allow public access to trainer_profiles for migration
CREATE POLICY "Allow public insert for migration" ON public.trainer_profiles
  FOR INSERT WITH CHECK (true);

-- Allow public access to students for migration  
CREATE POLICY "Allow public insert for migration" ON public.students
  FOR INSERT WITH CHECK (true);

-- Allow public access to exercise_categories for migration
CREATE POLICY "Allow public insert for migration" ON public.exercise_categories
  FOR INSERT WITH CHECK (true);

-- Allow public access to exercise_types for migration
CREATE POLICY "Allow public insert for migration" ON public.exercise_types
  FOR INSERT WITH CHECK (true);

-- Allow public access to exercises for migration
CREATE POLICY "Allow public insert for migration" ON public.exercises
  FOR INSERT WITH CHECK (true);

-- Allow public access to meals for migration
CREATE POLICY "Allow public insert for migration" ON public.meals
  FOR INSERT WITH CHECK (true);

-- Allow public access to supplements for migration
CREATE POLICY "Allow public insert for migration" ON public.supplements
  FOR INSERT WITH CHECK (true);
