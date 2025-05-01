
import { Student } from "@/components/students/StudentTypes";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { StudentHistory } from "@/components/students/StudentHistory";

interface StudentHistoryTabProps {
  students: Student[];
  historyEntries: HistoryEntry[];
}

export const StudentHistoryTab: React.FC<StudentHistoryTabProps> = ({
  students,
  historyEntries
}) => {
  return (
    <StudentHistory 
      students={students} 
      historyEntries={historyEntries} 
    />
  );
};
