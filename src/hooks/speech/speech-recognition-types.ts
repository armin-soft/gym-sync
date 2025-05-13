
export interface UseSpeechRecognitionProps {
  lang?: string;
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
}

export interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  interimTranscript: string;
  startListening: () => Promise<void>;
  stopListening: () => void;
  resetTranscript: () => void;
  addNewLine: () => void; // اضافه کردن متد جدید برای افزودن خط جدید
}
