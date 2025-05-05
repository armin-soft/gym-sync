
import { FlaskConical, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabHeaderProps {
  activeTab: 'supplement' | 'vitamin';
}

export const TabHeader: React.FC<TabHeaderProps> = ({ activeTab }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <TabsList className="grid w-full grid-cols-2 h-10 sm:h-12 md:h-14 mb-4 sm:mb-6">
        <TabsTrigger 
          value="supplement" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-500/10 data-[state=active]:text-purple-600 transition-all duration-300 text-sm sm:text-base"
        >
          <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          مکمل ها
        </TabsTrigger>
        <TabsTrigger 
          value="vitamin" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-500/10 data-[state=active]:text-blue-600 transition-all duration-300 text-sm sm:text-base"
        >
          <Pill className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          ویتامین ها
        </TabsTrigger>
      </TabsList>
    </motion.div>
  );
};
