
import { motion } from "framer-motion";
import { ExerciseTypes } from "@/components/exercises/ExerciseTypes";
import { ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

interface TypesTabContentProps {
  exerciseTypes: string[];
  selectedType: string;
  onSelectType: (type: string) => void;
  onAddType: () => void;
  onEditType: (type: string) => void;
  onDeleteType: (type: string) => void;
  categories: ExerciseCategory[];
}

export const TypesTabContent = ({
  exerciseTypes,
  selectedType,
  onSelectType,
  onAddType,
  onEditType,
  onDeleteType,
  categories
}: TypesTabContentProps) => {
  const { toast } = useToast();

  const handleDeleteType = (type: string) => {
    if (categories.some(cat => cat.type === type)) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید تمام دسته بندی های این نوع حرکت را حذف کنید"
      });
      return;
    }
    onDeleteType(type);
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-4 flex-shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ExerciseTypes
        types={exerciseTypes}
        selectedType={selectedType}
        onSelectType={onSelectType}
        onAddType={onAddType}
        onEditType={onEditType}
        onDeleteType={handleDeleteType}
      />
    </motion.div>
  );
};
