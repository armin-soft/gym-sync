
import { AddStudentButton } from "./AddStudentButton";

interface StudentsHeaderProps {
  onAddStudent?: () => void;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({ onAddStudent }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">مدیریت شاگردان</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          افزودن، ویرایش و مدیریت اطلاعات شاگردان
        </p>
      </div>
      
      {onAddStudent ? (
        <AddStudentButton
          variant="accent"
          onClick={onAddStudent}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
        />
      ) : (
        <AddStudentButton 
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
        />
      )}
    </div>
  );
};
