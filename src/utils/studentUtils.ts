
// Format payment value with thousands separator
export const formatPayment = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Calculate student progress based on their data
export const getStudentProgress = (student: any): number => {
  let totalPoints = 0;
  let earnedPoints = 0;
  
  // Basic info
  if (student.name) earnedPoints += 1;
  if (student.phone) earnedPoints += 1;
  if (student.height) earnedPoints += 1;
  if (student.weight) earnedPoints += 1;
  if (student.payment) earnedPoints += 1;
  totalPoints += 5;
  
  // Exercise program
  if (student.exercises?.length || 
      student.exercisesDay1?.length || 
      student.exercisesDay2?.length || 
      student.exercisesDay3?.length || 
      student.exercisesDay4?.length) {
    earnedPoints += 3;
  }
  totalPoints += 3;
  
  // Diet program
  if (student.meals?.length) {
    earnedPoints += 2;
  }
  totalPoints += 2;
  
  // Supplements
  if (student.supplements?.length || student.vitamins?.length) {
    earnedPoints += 2;
  }
  totalPoints += 2;
  
  // Calculate percentage
  return Math.round((earnedPoints / totalPoints) * 100);
};

// Get color for progress bar based on percentage
export const getProgressColor = (progress: number): string => {
  if (progress < 30) return "text-red-500";
  if (progress < 60) return "text-amber-500";
  if (progress < 90) return "text-sky-500";
  return "text-emerald-500";
};
