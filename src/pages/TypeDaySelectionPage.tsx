
import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeDaySelection, ExerciseType, DayType } from "@/components/selection/TypeDaySelection";
import { useToast } from "@/hooks/use-toast";

const TypeDaySelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = (type: ExerciseType, day: DayType) => {
    // Save selection to localStorage
    localStorage.setItem('selectedExerciseType', type);
    localStorage.setItem('selectedDay', day.toString());
    
    toast({
      title: "انتخاب موفق",
      description: `نوع تمرین و روز شما با موفقیت انتخاب شد.`,
    });

    // Navigate to next page or dashboard
    navigate("/dashboard");
  };

  return (
    <TypeDaySelection 
      onComplete={handleComplete}
      // You can pass initial values if needed
      // initialType="strength"
      // initialDay={1}
    />
  );
};

export default TypeDaySelectionPage;
