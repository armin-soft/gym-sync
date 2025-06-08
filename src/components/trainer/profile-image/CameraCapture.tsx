
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, X, RotateCcw, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageData: string) => void;
}

export const CameraCapture = ({ isOpen, onClose, onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stopCamera = useCallback(() => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
      }
      setIsStreaming(false);
      setCapturedImage(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Error stopping camera:', err);
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (isLoading || isStreaming) return;
    
    try {
      setError(null);
      setIsLoading(true);

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('دوربین در این مرورگر پشتیبانی نمی‌شود');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });
      
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        videoRef.current.onloadedmetadata = () => {
          setIsStreaming(true);
          setIsLoading(false);
        };

        videoRef.current.onerror = () => {
          setError('خطا در بارگذاری ویدیو');
          setIsLoading(false);
        };
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setIsLoading(false);
      
      if (err.name === 'NotAllowedError') {
        setError('دسترسی به دوربین رد شد. لطفاً در تنظیمات مرورگر اجازه دسترسی را بدهید.');
      } else if (err.name === 'NotFoundError') {
        setError('دوربینی پیدا نشد. لطفاً اطمینان حاصل کنید که دوربین متصل است.');
      } else if (err.name === 'NotReadableError') {
        setError('دوربین در حال استفاده توسط برنامه دیگری است.');
      } else {
        setError(err.message || 'خطا در دسترسی به دوربین. لطفاً دوباره تلاش کنید.');
      }
    }
  }, [isLoading, isStreaming]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;
    
    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
      }
    } catch (err) {
      console.error('Error capturing photo:', err);
      setError('خطا در گرفتن عکس. لطفاً دوباره تلاش کنید.');
    }
  }, [isStreaming]);

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  const handleClose = () => {
    stopCamera();
    setError(null);
    onClose();
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  useEffect(() => {
    if (isOpen && !isStreaming && !capturedImage && !isLoading) {
      // Add a small delay to ensure dialog is fully rendered
      const timer = setTimeout(() => {
        startCamera();
      }, 100);
      
      return () => clearTimeout(timer);
    }
    
    return () => {
      if (!isOpen) {
        stopCamera();
      }
    };
  }, [isOpen, startCamera, stopCamera, isStreaming, capturedImage, isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            گرفتن عکس با دوربین
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          )}

          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-[4/3]">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {(isLoading || (!isStreaming && !error)) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-2"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {isLoading ? 'در حال دسترسی به دوربین...' : 'در حال بارگذاری دوربین...'}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <motion.img
                src={capturedImage}
                alt="عکس گرفته شده"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {error && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="text-center p-4">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2 text-red-500" />
                  <Button onClick={startCamera} variant="outline" disabled={isLoading}>
                    <Camera className="h-4 w-4 mr-2" />
                    تلاش مجدد
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3">
            {!capturedImage && isStreaming && !error && (
              <Button
                onClick={capturePhoto}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600"
                disabled={isLoading}
              >
                <Camera className="h-5 w-5 mr-2" />
                گرفتن عکس
              </Button>
            )}

            {capturedImage && (
              <>
                <Button onClick={handleRetake} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  عکس جدید
                </Button>
                <Button onClick={handleConfirm} className="bg-green-500 hover:bg-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  تایید
                </Button>
              </>
            )}

            <Button onClick={handleClose} variant="outline">
              <X className="h-4 w-4 mr-2" />
              لغو
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
