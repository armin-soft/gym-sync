
import { Student } from "@/components/students/StudentTypes";
import { Supplement } from "@/types/supplement";

export interface StudentListViewProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger?: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  viewMode: 'table' | 'grid' | 'cards';
  isProfileComplete: boolean;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (field: string) => void;
  exercises?: any[]; // Add exercises prop
  meals?: any[]; // Add meals prop
  supplements?: any[]; // Add supplements prop
}

export interface StudentCardListProps extends StudentListViewProps {}
