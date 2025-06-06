
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrainerProfile } from "@/types/trainer";
import { TrainerProfileImage } from "./TrainerProfileImage";
import { User, Building, Phone, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainerProfileSidebarProps {
  profile: TrainerProfile;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onImageChange: (image: string) => void;
}

const sections = [
  { id: "personal", label: "اطلاعات شخصی", icon: User, color: "from-violet-500 to-purple-600" },
  { id: "gym", label: "اطلاعات باشگاه", icon: Building, color: "from-indigo-500 to-blue-600" },
  { id: "social", label: "شبکه‌های اجتماعی", icon: Phone, color: "from-purple-500 to-pink-600" }
];

export const TrainerProfileSidebar = ({
  profile,
  activeSection,
  onSectionChange,
  onImageChange
}: TrainerProfileSidebarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Profile card */}
      <Card className="border-0 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl shadow-2xl">
        <div className="p-8 text-center">
          <TrainerProfileImage
            image={profile.image}
            onImageChange={onImageChange}
          />
          
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {profile.name || "نام مربی"}
              </h3>
              {profile.phone && (
                <p className="text-gray-600 dark:text-gray-400 mt-2" dir="ltr">
                  {profile.phone}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                پروفایل فعال
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation tabs */}
      <Card className="border-0 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl shadow-2xl">
        <div className="p-6">
          <div className="space-y-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Button
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => onSectionChange(section.id)}
                  className={cn(
                    "w-full justify-start gap-3 p-4 h-auto transition-all duration-300",
                    activeSection === section.id
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg hover:shadow-xl`
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
