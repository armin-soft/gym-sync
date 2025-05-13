
import { useToast } from "@/hooks/use-toast";

export function useSpeechRecognitionErrors() {
  const { toast } = useToast();
  
  const handleRecognitionError = (error: string) => {
    if (error === "not-allowed") {
      toast({
        title: "دسترسی به میکروفون",
        description: "لطفاً به مرورگر اجازه دسترسی به میکروفون را بدهید.",
        variant: "destructive",
      });
    } else if (error === "audio-capture") {
      toast({
        title: "خطا",
        description: "میکروفون قابل دسترسی نیست یا در حال استفاده توسط برنامه دیگری است.",
        variant: "destructive",
      });
    } else if (error === "network") {
      toast({
        title: "خطای شبکه",
        description: "مشکلی در ارتباط با سرویس تشخیص گفتار وجود دارد.",
        variant: "destructive",
      });
    } else if (error !== "aborted") {
      toast({
        title: "خطا",
        description: "خطا در تشخیص گفتار. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
  };
  
  const showRecordingStartedToast = () => {
    toast({
      title: "ضبط صدا",
      description: "در حال گوش دادن به صحبت شما...",
    });
  };
  
  const showRecordingStoppedToast = () => {
    toast({
      title: "ضبط صدا متوقف شد",
      description: "متن گفتار شما ثبت شد.",
    });
  };
  
  return {
    handleRecognitionError,
    showRecordingStartedToast,
    showRecordingStoppedToast
  };
}
