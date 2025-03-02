
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";

interface StudentsHeaderProps {
  onAddStudent: () => void;
}

export const StudentsHeader = ({ onAddStudent }: StudentsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 animate-fade-in">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            شاگردان
          </h2>
          <p className="text-muted-foreground">
            مدیریت و پیگیری پیشرفت شاگردان
          </p>
        </div>
      </div>
      <Button
        onClick={onAddStudent}
        size="lg"
        className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 animate-fade-in"
      >
        <Plus className="ml-2 h-5 w-5" />
        افزودن شاگرد جدید
      </Button>
    </div>
  );
};
