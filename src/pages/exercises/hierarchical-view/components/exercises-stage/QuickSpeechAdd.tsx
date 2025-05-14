
import React from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface QuickSpeechAddProps {
  selectedType?: any;
}

const QuickSpeechAdd: React.FC<QuickSpeechAddProps> = ({ selectedType }) => {
  // This is a placeholder component - actual implementation would require speech recognition
  const handleClick = () => {
    console.log("Quick speech add clicked for type:", selectedType);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-background/50 backdrop-blur-sm hover:bg-background/80"
      onClick={handleClick}
    >
      <Mic className="h-4 w-4" />
    </Button>
  );
};

export default QuickSpeechAdd;
