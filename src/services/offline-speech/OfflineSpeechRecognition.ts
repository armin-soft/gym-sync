
import { pipeline, Pipeline } from '@huggingface/transformers';
import { toast } from '@/hooks/use-toast';

// نوع مدل تشخیص گفتار
type WhisperModel = 'Xenova/whisper-tiny' | 'Xenova/whisper-small' | 'Xenova/whisper-base' | 'Xenova/whisper-small.en';

// کلاس مدیریت تشخیص گفتار آفلاین
export class OfflineSpeechRecognition {
  private static instance: OfflineSpeechRecognition;
  private recognizer: Pipeline | null = null;
  private isLoading: boolean = false;
  private modelLoaded: boolean = false;
  private downloadProgress: number = 0;
  private modelName: WhisperModel = 'Xenova/whisper-tiny';
  private onProgressCallback: ((progress: number) => void) | null = null;
  private onLoadedCallback: (() => void) | null = null;
  private onErrorCallback: ((error: any) => void) | null = null;

  // الگوی Singleton برای اطمینان از وجود تنها یک نمونه از کلاس
  public static getInstance(): OfflineSpeechRecognition {
    if (!this.instance) {
      this.instance = new OfflineSpeechRecognition();
    }
    return this.instance;
  }

  private constructor() {
    // سازنده خصوصی برای جلوگیری از ایجاد نمونه‌های متعدد
  }

  // تابع تنظیم مدل
  public setModel(model: WhisperModel): void {
    this.modelName = model;
    this.modelLoaded = false;
    this.recognizer = null;
  }

  // تنظیم callback برای پیشرفت دانلود
  public onProgress(callback: (progress: number) => void): void {
    this.onProgressCallback = callback;
  }

  // تنظیم callback برای بارگذاری کامل مدل
  public onLoaded(callback: () => void): void {
    this.onLoadedCallback = callback;
    if (this.modelLoaded && callback) {
      callback();
    }
  }

  // تنظیم callback برای خطا
  public onError(callback: (error: any) => void): void {
    this.onErrorCallback = callback;
  }

  // بررسی آیا مدل در حال بارگذاری است
  public isModelLoading(): boolean {
    return this.isLoading;
  }

  // بررسی آیا مدل بارگذاری شده است
  public isModelLoaded(): boolean {
    return this.modelLoaded;
  }

  // بارگذاری مدل
  public async loadModel(): Promise<void> {
    if (this.modelLoaded || this.isLoading) return;

    this.isLoading = true;
    this.downloadProgress = 0;
    
    if (this.onProgressCallback) {
      this.onProgressCallback(0);
    }

    try {
      // بارگذاری مدل با نمایش پیشرفت دانلود
      this.recognizer = await pipeline(
        'automatic-speech-recognition',
        this.modelName,
        {
          quantized: true, // مدل فشرده برای کارایی بهتر
          progress_callback: (progress: any) => {
            // پیشرفت بارگذاری مدل را محاسبه می‌کنیم
            if (progress.status === 'progress' && progress.total > 0) {
              const percent = Math.round((progress.loaded / progress.total) * 100);
              this.downloadProgress = percent;
              
              if (this.onProgressCallback) {
                this.onProgressCallback(percent);
              }
            }
          }
        }
      );

      this.modelLoaded = true;
      this.isLoading = false;
      
      // اعلان موفقیت
      toast({
        title: "مدل تشخیص گفتار آفلاین",
        description: "مدل با موفقیت بارگذاری شد. اکنون می‌توانید بدون نیاز به اینترنت از تشخیص گفتار استفاده کنید.",
      });
      
      if (this.onLoadedCallback) {
        this.onLoadedCallback();
      }

    } catch (error) {
      this.isLoading = false;
      console.error("خطا در بارگذاری مدل تشخیص گفتار آفلاین:", error);
      
      toast({
        title: "خطا در بارگذاری مدل",
        description: "نتوانستیم مدل تشخیص گفتار آفلاین را بارگذاری کنیم. اتصال اینترنت خود را بررسی کنید یا از قابلیت آنلاین استفاده نمایید.",
        variant: "destructive",
      });
      
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    }
  }

  // تبدیل فایل صوتی به متن
  public async transcribeAudio(audioData: Blob): Promise<string> {
    if (!this.modelLoaded || !this.recognizer) {
      throw new Error("مدل هنوز بارگذاری نشده است. ابتدا باید مدل را بارگذاری کنید.");
    }

    try {
      const result = await this.recognizer(audioData, {
        language: "fa", // تنظیم زبان به فارسی
        chunk_length_s: 30, // طول قطعات صوتی برای پردازش (ثانیه)
        stride_length_s: 5, // میزان همپوشانی بین قطعات (ثانیه)
      });

      return result.text || '';
    } catch (error) {
      console.error("خطا در تشخیص گفتار آفلاین:", error);
      throw error;
    }
  }

  // ضبط صدا و تبدیل به متن
  public async recordAndTranscribe(
    durationMs: number = 5000, // مدت زمان ضبط به میلی‌ثانیه
    onProgress?: (progress: number) => void, // callback برای نمایش پیشرفت ضبط
  ): Promise<string> {
    if (!this.modelLoaded || !this.recognizer) {
      throw new Error("مدل هنوز بارگذاری نشده است. ابتدا باید مدل را بارگذاری کنید.");
    }

    try {
      // درخواست دسترسی به میکروفون
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      // شروع ضبط
      mediaRecorder.start();
      const startTime = Date.now();

      // نمایش پیشرفت ضبط
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, Math.round((elapsed / durationMs) * 100));
        
        if (onProgress) {
          onProgress(progress);
        }
        
        if (elapsed >= durationMs) {
          clearInterval(progressInterval);
        }
      }, 100);

      return new Promise((resolve, reject) => {
        // جمع‌آوری داده‌های صوتی
        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        });

        // وقتی ضبط تمام شد
        mediaRecorder.addEventListener("stop", async () => {
          clearInterval(progressInterval);
          
          // آزاد کردن میکروفون
          stream.getTracks().forEach(track => track.stop());
          
          // ساخت بلاب صوتی
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          
          try {
            // تبدیل صدا به متن با مدل
            const transcript = await this.transcribeAudio(audioBlob);
            resolve(transcript);
          } catch (error) {
            reject(error);
          }
        });

        // خطای ضبط
        mediaRecorder.addEventListener("error", (error) => {
          clearInterval(progressInterval);
          stream.getTracks().forEach(track => track.stop());
          reject(error);
        });

        // متوقف کردن ضبط پس از زمان مشخص شده
        setTimeout(() => {
          if (mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
          }
        }, durationMs);
      });
    } catch (error) {
      console.error("خطا در ضبط صدا:", error);
      throw error;
    }
  }

  // دریافت میزان پیشرفت دانلود
  public getDownloadProgress(): number {
    return this.downloadProgress;
  }
}

// صادر کردن یک نمونه singleton
export const offlineSpeechRecognition = OfflineSpeechRecognition.getInstance();
