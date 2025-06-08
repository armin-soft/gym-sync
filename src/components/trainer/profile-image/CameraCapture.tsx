
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, X, RotateCcw, Check } from "lucide-react";
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

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
    setCapturedImage(null);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      console.log('Starting camera...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      console.log('Camera stream obtained');
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          setIsStreaming(true);
        };
      }
    } catch (err) {
      console.error('خطا در دسترسی به دوربین:', err);
      setError('دسترسی به دوربین امکان‌پذیر نیست. لطفاً اجازه دسترسی را بدهید.');
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current && isStreaming) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        console.log('Photo captured');
      }
    }
  }, [isStreaming]);

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  const handleClose = () => {
    console.log('Closing camera dialog');
    stopCamera();
    setError(null);
    onClose();
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  // Effect to handle camera when dialog opens/closes
  useEffect(() => {
    if (isOpen && !isStreaming && !capturedImage) {
      console.log('Dialog opened, starting camera...');
      startCamera();
    }
    
    // Cleanup when dialog closes
    return () => {
      if (!isOpen) {
        console.log('Dialog closed, stopping camera...');
        stopCamera();
      }
    };
  }, [isOpen, startCamera, stopCamera, isStreaming, capturedImage]);

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
              <p className="text-sm text-destructive text-center">{error}</p>
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
                
                {!isStreaming && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <div className="text-center">
                      <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-300">در حال بارگذاری دوربین...</p>
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

            {!isStreaming && !capturedImage && error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button onClick={startCamera} variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  تلاش مجدد
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3">
            {!capturedImage && isStreaming && (
              <Button
                onClick={capturePhoto}
                size="lg"
                className="bg-indigo-500 hover:bg-indigo-600"
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
