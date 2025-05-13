
export interface UseSpeechRecognitionProps {
  lang?: string;
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
  multiLine?: boolean;
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

export interface RecognitionState {
  transcript: string;
  interimTranscript: string;
  isRecording: boolean;
  isStopped: boolean;
  autoRestart: boolean;
  error: string;
  startTime: number;
}

export interface RecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
  error?: string;
}

declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}
