
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { StudentExercises } from "../components/StudentExercises";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";

const StudentExercisesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [student, setStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);
        const studentsData = localStorage.getItem('students');
        if (studentsData) {
          const parsedStudents = JSON.parse(studentsData);
          setStudents(parsedStudents);
          
          if (id) {
            const studentId = parseInt(id);
            const foundStudent = parsedStudents.find((s: Student) => s.id === studentId);
            
            if (foundStudent) {
              setStudent(foundStudent);
            } else {
              toast({
                variant: "destructive",
                title: "خطا",
                description: "شاگرد مورد نظر یافت نشد"
              });
              navigate("/students");
            }
          }
        }
      } catch (error) {
        console.error("Error loading student data:", error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری",
          description: "مشکلی در بارگذاری اطلاعات شاگرد پیش آمد"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate, toast]);

  const handleBackToStudents = () => {
    navigate("/students");
  };

  return (
    <PageContainer withBackground fullScreen className="w-full h-full min-h-screen overflow-hidden">
      <div className="w-full h-full flex flex-col px-4 py-4 sm:px-6 sm:py-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToStudents}
          className="w-fit mb-6 hover:bg-background"
        >
          <ChevronRight className="mr-1 h-4 w-4" />
          <span>بازگشت به لیست شاگردان</span>
        </Button>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <span className="text-muted-foreground">در حال بارگذاری...</span>
            </div>
          </div>
        ) : (
          student && (
            <StudentExercises
              student={student}
              students={students}
              setStudents={setStudents}
            />
          )
        )}
      </div>
    </PageContainer>
  );
};

export default StudentExercisesPage;
