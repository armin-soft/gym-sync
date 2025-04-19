
import { motion } from "framer-motion";
import { StudentActions } from "./StudentActions";

interface StudentHeaderProps {
  onAddStudent: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const StudentHeader = ({
  onAddStudent,
  showFilters,
  onToggleFilters
}: StudentHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">شاگردان</h1>
        <p className="text-muted-foreground">
          مدیریت و پیگیری پیشرفت شاگردان باگاه
        </p>
      </div>
      
      <StudentActions 
        onAddStudent={onAddStudent}
        showFilters={showFilters}
        onToggleFilters={onToggleFilters}
      />
    </motion.div>
  );
};
