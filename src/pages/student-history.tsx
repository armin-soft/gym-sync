
import React from "react";
import { StudentHistory } from "@/components/students/StudentHistory";
import { useStudents } from "@/hooks/students";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { PageContainer } from "@/components/ui/page-container";

const StudentHistoryPage = () => {
  const { students } = useStudents();
  const { historyEntries, clearHistory } = useStudentHistory();

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className="w-full h-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <StudentHistory 
          students={students}
          historyEntries={historyEntries}
          onClearHistory={clearHistory}
        />
      </div>
    </PageContainer>
  );
};

export default StudentHistoryPage;
