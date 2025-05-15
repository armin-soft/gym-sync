
import { useState, useEffect, useCallback } from 'react';
import { offlineSpeechRecognition } from '@/services/offline-speech/OfflineSpeechRecognition';
import { useToast } from '@/hooks/use-toast';

interface UseOfflineSpeechRecognitionProps {
  onTranscriptChange?: (transcript: string) => void;
  initialValue?: string;
}

export function useOfflineSpeechRecognition({
  onTranscriptChange,
  initialValue = '',
}: UseOfflineSpeechRecognitionProps = {}) {
  const [transcript, setTranscript] = useState(initialValue);
  const [isRecording, setIsRecording] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const { toast } = useToast();

  // تنظیم callback‌های دانلود مدل
  useEffect(() => {
    offlineSpeechRecognition.onProgress((progress) => {
      setDownloadProgress(progress);
    });

    offlineSpeechRecognition.onLoaded(() => {
      setIsModelLoaded(true);
      setIsModelLoading(false);
    });

    offlineSpeechRecognition.onError((error) => {
      setIsModelLoading(false);
      console.error("خطا در بارگذاری مدل:", error);
    });

    // بررسی وضعیت فعلی مدل
    setIsModelLoaded(offlineSpeechRecognition.isModelLoaded());
    setIsModelLoading(offlineSpeechRecognition.isModelLoading());
    setDownloadProgress(offlineSpeechRecognition.getDownloadProgress());

    return () => {
      // پاکسازی callback‌ها
      offlineSpeechRecognition.onProgress(() => {});
      offlineSpeechRecognition.onLoaded(() => {});
      offlineSpeechRecognition.onError(() => {});
    };
  }, []);

  // بارگذاری مدل
  const loadModel = useCallback(async () => {
    if (isModelLoaded || isModelLoading) return;
    
    setIsModelLoading(true);
    
    try {
      await offlineSpeechRecognition.loadModel();
    } catch (error) {
      console.error("خطا در بارگذاری مدل:", error);
      setIsModelLoading(false);
      
      toast({
        title: "خطا در بارگذاری",
        description: "نتوانستیم مدل تشخیص گفتار را بارگذاری کنیم. لطفا اتصال اینترنت خود را بررسی کنید.",
        variant: "destructive",
      });
    }
  }, [isModelLoaded, isModelLoading, toast]);

  // شروع ضبط و تبدیل به متن
  const startRecording = useCallback(async (durationMs = 5000) => {
    if (!isModelLoaded) {
      toast({
        title: "مدل بارگذاری نشده",
        description: "ابتدا باید مدل تشخیص گفتار را بارگذاری کنید.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) return;

    setIsRecording(true);
    setRecordingProgress(0);
    
    try {
      const result = await offlineSpeechRecognition.recordAndTranscribe(
        durationMs,
        (progress) => {
          setRecordingProgress(progress);
        }
      );
      
      // ترکیب متن جدید با متن قبلی
      const newTranscript = transcript ? `${transcript} ${result}` : result;
      setTranscript(newTranscript);
      
      if (onTranscriptChange) {
        onTranscriptChange(newTranscript);
      }
      
      toast({
        title: "تشخیص گفتار آفلاین",
        description: "تبدیل صدا به متن با موفقیت انجام شد.",
      });
    } catch (error) {
      console.error("خطا در ضبط صدا:", error);
      
      toast({
        title: "خطا در ضبط صدا",
        description: "نتوانستیم صدای شما را ضبط یا تبدیل کنیم. لطفا مجدد تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsRecording(false);
      setRecordingProgress(0);
    }
  }, [isModelLoaded, isRecording, transcript, onTranscriptChange, toast]);

  // پاک کردن متن
  const resetTranscript = useCallback(() => {
    setTranscript('');
    if (onTranscriptChange) {
      onTranscriptChange('');
    }
  }, [onTranscriptChange]);

  return {
    transcript,
    isRecording,
    isModelLoaded,
    isModelLoading,
    downloadProgress,
    recordingProgress,
    loadModel,
    startRecording,
    resetTranscript
  };
}
