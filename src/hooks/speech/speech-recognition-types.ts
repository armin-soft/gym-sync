
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
}

// Web Speech API definitions
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}
