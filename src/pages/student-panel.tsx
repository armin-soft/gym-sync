
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLogin } from "@/components/student-panel/StudentLogin";
import { PageContainer } from "@/components/ui/page-container";
import { useStudents } from "@/hooks/students";
import { Student } from "@/components/students/StudentTypes";

const StudentPanel = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { students } = useStudents();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  useEffect(() => {
    // Check if student is logged in
    const studentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");

    if (studentLoggedIn && loggedInStudentId) {
      // Find the logged in student
      const student = students.find(s => s.id.toString() === loggedInStudentId);
      if (student) {
        setCurrentStudent(student);
        setIsLoggedIn(true);
        
        // If we have a student ID in URL, make sure it matches the logged in student
        if (studentId && studentId !== loggedInStudentId) {
          navigate(`/Students/dashboard/${loggedInStudentId}`, { replace: true });
        }
      } else {
        // Student not found, clear login state
        localStorage.removeItem("studentLoggedIn");
        localStorage.removeItem("loggedInStudentId");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [students, studentId, navigate]);

  // If not logged in, show login form
  if (!isLoggedIn) {
    return <StudentLogin />;
  }

  // If logged in, show student dashboard
  return (
    <PageContainer withBackground fullHeight>
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            خوش آمدید {currentStudent?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            این داشبورد شخصی شما است.
          </p>
          
          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("studentLoggedIn");
              localStorage.removeItem("loggedInStudentId");
              navigate("/Students");
            }}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            خروج
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default StudentPanel;
