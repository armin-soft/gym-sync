
export const prepareGenderData = (students: any[]) => {
  const maleStudents = students.filter(s => s.gender === 'male').length;
  const femaleStudents = students.filter(s => s.gender === 'female').length;
  const totalStudents = students.length;

  if (totalStudents === 0) return [];

  return [
    { 
      name: "آقایان", 
      value: maleStudents,
      percentage: Math.round((maleStudents / totalStudents) * 100),
      color: "#3b82f6" 
    },
    { 
      name: "بانوان", 
      value: femaleStudents,
      percentage: Math.round((femaleStudents / totalStudents) * 100),
      color: "#8b5cf6" 
    }
  ];
};

export const prepareActivityData = (students: any[]) => {
  return [
    { 
      name: "تمرینات", 
      value: students.filter(s => s.exercises && Object.keys(s.exercises).length > 0).length, 
      color: "#10b981" 
    },
    { 
      name: "تغذیه", 
      value: students.filter(s => s.meals && s.meals.length > 0).length, 
      color: "#f59e0b" 
    },
    { 
      name: "مکمل‌ها", 
      value: students.filter(s => s.supplements && s.supplements.length > 0).length, 
      color: "#8b5cf6" 
    }
  ];
};

export const prepareWeeklyData = (totalStudents: number) => {
  return [
    { week: "هفته ۱", students: Math.max(0, totalStudents - 15), sessions: Math.max(0, (totalStudents - 15) * 3) },
    { week: "هفته ۲", students: Math.max(0, totalStudents - 10), sessions: Math.max(0, (totalStudents - 10) * 3) },
    { week: "هفته ۳", students: Math.max(0, totalStudents - 5), sessions: Math.max(0, (totalStudents - 5) * 3) },
    { week: "هفته ۴", students: totalStudents, sessions: totalStudents * 3 }
  ];
};
