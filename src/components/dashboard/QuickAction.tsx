
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  title: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
  description: string;
  index: number;
}

export const QuickAction = ({ 
  title, 
  icon: Icon, 
  gradient, 
  href, 
  description,
  index 
}: QuickActionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
    >
      <Card className="overflow-hidden group relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <Link to={href} className="block p-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-100">
                {title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            </div>
            <Button
              variant="ghost" 
              size="sm" 
              className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary"
            >
              مشاهده
            </Button>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};
