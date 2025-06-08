
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, X, RotateCcw, Check, AlertCircle } from "lucide-react";

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageData: string) => void;
}

export const CameraCapture = ({ isOpen, onClose, onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError('دسترسی به دوربین رد شد');
      } else if (err.name === 'NotFoundError') {
        setError('دوربینی پیدا نشد');
      } else {
        setError('خطا در دسترسی به دوربین');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
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
      setError('خطا در گرفتن عکس');
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setError(null);
    onClose();
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  useEffect(() => {
    if (isOpen && !stream && !capturedImage) {
      startCamera();
    }
    
    return () => {
      if (!isOpen) {
        stopCamera();
      }
    };
  }, [isOpen]);

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
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[4/3]">
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
                
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-gray-600">در حال دسترسی به دوربین...</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <img
                src={capturedImage}
                alt="عکس گرفته شده"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex justify-center gap-3">
            {!capturedImage && stream && !error && (
              <Button onClick={capturePhoto} className="bg-blue-500 hover:bg-blue-600">
                <Camera className="h-4 w-4 mr-2" />
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
