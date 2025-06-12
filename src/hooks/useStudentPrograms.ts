
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export interface StudentProgram {
  studentId: number;
  exercises: any[];
  diet: any[];
  supplements: any[];
  vitamins: any[];
}

export function useStudentPrograms(studentId?: number) {
  const [programs, setPrograms] = useState<StudentProgram[]>([]);
  const [currentStudentProgram, setCurrentStudentProgram] = useState<StudentProgram | null>(null);

  useEffect(() => {
    // Load programs from localStorage
    try {
      const savedPrograms = localStorage.getItem('studentPrograms');
      if (savedPrograms) {
        const parsedPrograms = JSON.parse(savedPrograms);
        setPrograms(Array.isArray(parsedPrograms) ? parsedPrograms : []);
      }
    } catch (error) {
      console.error('Error loading student programs:', error);
      setPrograms([]);
    }
  }, []);

  useEffect(() => {
    if (studentId && programs.length > 0) {
      const program = programs.find(p => p.studentId === studentId);
      setCurrentStudentProgram(program || null);
    }
  }, [studentId, programs]);

  const getStudentProgram = (id: number): StudentProgram | null => {
    return programs.find(p => p.studentId === id) || null;
  };

  const updateStudentProgram = (studentId: number, programData: Partial<StudentProgram>) => {
    const updatedPrograms = programs.map(p => 
      p.studentId === studentId 
        ? { ...p, ...programData }
        : p
    );
    
    if (!programs.find(p => p.studentId === studentId)) {
      updatedPrograms.push({
        studentId,
        exercises: [],
        diet: [],
        supplements: [],
        vitamins: [],
        ...programData
      });
    }
    
    setPrograms(updatedPrograms);
    localStorage.setItem('studentPrograms', JSON.stringify(updatedPrograms));
  };

  return {
    programs,
    currentStudentProgram,
    getStudentProgram,
    updateStudentProgram
  };
}
