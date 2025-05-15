
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/speech";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SpeechExerciseInputProps {
  onAddExercise: (name: string) => void;
}

export const SpeechExerciseInput: React.FC<SpeechExerciseInputProps> = ({ onAddExercise }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const { toast } = useToast();

  const {
    transcript,
    isListening,
    isSupported,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    initialValue: "",
    onTranscriptChange: setExerciseName,
    lang: "fa-IR"
  });

  const handleToggleListen = async () => {
    if (isListening) {
      stopListening();
    } else {
      try {
        await startListening();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast({
          title: "خطا",
          description: "خطا در شروع تشخیص گفتار. لطفاً دوباره تلاش کنید.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = () => {
    if (exerciseName.trim()) {
      onAddExercise(exerciseName.trim());
      resetTranscript();
      setExerciseName("");
      setIsDialogOpen(false);
      toast({
        title: "حرکت اضافه شد",
        description: `حرکت "${exerciseName.trim()}" به لیست اضافه شد.`
      });
    }
  };

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="gap-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-300"
        onClick={() => setIsDialogOpen(true)}
      >
        <Mic className="h-4 w-4" />
        افزودن با گفتار
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogTitle className="text-center mb-4">افزودن حرکت با گفتار</DialogTitle>
          
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="text-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {isListening ? "در حال گوش دادن..." : "برای شروع روی دکمه میکروفون کلیک کنید"}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  className={`flex-shrink-0 ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"}`}
                  onClick={handleToggleListen}
                  disabled={!isSupported}
                >
                  <AnimatePresence mode="wait">
                    {isListening ? (
                      <motion.div
                        key="mic-off"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <MicOff className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mic"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Mic className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
                
                <div className="flex-1 bg-white dark:bg-gray-900 border border-input rounded-md p-2 min-h-[40px] text-right">
                  {exerciseName || interimTranscript || 
                    <span className="text-muted-foreground">نام حرکت را بگویید...</span>}
                </div>
              </div>
              
              <AnimatePresence>
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <div className="text-xs text-center p-1 text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 rounded">
                      لطفاً نام حرکت را واضح بیان کنید
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex justify-between gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetTranscript();
                  setExerciseName("");
                }}
              >
                انصراف
              </Button>
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                disabled={!exerciseName.trim()}
                onClick={handleSubmit}
              >
                افزودن
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpeechExerciseInput;
