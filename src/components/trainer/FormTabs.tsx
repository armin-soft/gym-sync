
import { motion } from "framer-motion";
import { Dumbbell, Globe, UserRound } from "lucide-react";

interface FormTabsProps {
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const FormTabs = ({ activeSection, onTabChange }: FormTabsProps) => {
  const sections = [
    { id: "personal", label: "اطلاعات شخصی", icon: <UserRound className="h-5 w-5" /> },
    { id: "gym", label: "اطلاعات باشگاه", icon: <Dumbbell className="h-5 w-5" /> },
    { id: "social", label: "شبکه‌های اجتماعی", icon: <Globe className="h-5 w-5" /> }
  ];

  const tabVariants = {
    active: { 
      backgroundColor: "hsl(var(--primary))", 
      color: "hsl(var(--primary-foreground))",
      scale: 1.05,
      boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", duration: 0.5 }
    },
    inactive: { 
      backgroundColor: "hsl(var(--muted) / 0.5)", 
      color: "hsl(var(--muted-foreground))",
      scale: 1,
      boxShadow: "none",
      transition: { type: "spring", duration: 0.5 }
    }
  };

  return (
    <div className="hidden lg:flex mb-6 gap-4">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => onTabChange(section.id)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm"
          variants={tabVariants}
          animate={activeSection === section.id ? "active" : "inactive"}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {section.icon}
          {section.label}
        </motion.button>
      ))}
    </div>
  );
};
