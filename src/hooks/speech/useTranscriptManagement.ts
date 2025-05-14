
import { useState, useCallback } from 'react';
import { correctPersianWords } from "@/utils/persian-word-correction";

interface UseTranscriptManagementProps {
  initialValue: string;
  onTranscriptChange: (transcript: string) => void;
  multiLine?: boolean;
  onInterimTranscriptChange?: (transcript: string, confidenceScore?: number) => void;
}

export function useTranscriptManagement({
  initialValue,
  onTranscriptChange,
  multiLine = false,
  onInterimTranscriptChange
}: UseTranscriptManagementProps) {
  const [transcript, setTranscript] = useState(initialValue);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [confidenceScore, setConfidenceScore] = useState(0);

  // Reset transcript function
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setConfidenceScore(0);
    onTranscriptChange("");
    if (onInterimTranscriptChange) {
      onInterimTranscriptChange("", 0);
    }
  }, [onTranscriptChange, onInterimTranscriptChange]);

  // Update transcript with new content
  const updateTranscript = useCallback((newText: string, isFinal: boolean, confidence?: number) => {
    if (isFinal) {
      let processedText = newText.trim();
      
      // Correct Persian words
      processedText = correctPersianWords(processedText);
      
      // Clean up whitespace
      processedText = processedText.replace(/\s+/g, " ")
                           .replace(/\n +/g, "\n")
                           .replace(/\n+/g, "\n")
                           .trim();
      
      // For multi-line, preserve line breaks, otherwise flatten
      if (!multiLine) {
        processedText = processedText.replace(/\n/g, " ");
      }
      
      const updatedTranscript = transcript + (transcript ? " " : "") + processedText;
      setTranscript(updatedTranscript);
      onTranscriptChange(updatedTranscript);
    } else {
      setInterimTranscript(newText);
      if (onInterimTranscriptChange) {
        onInterimTranscriptChange(newText, confidence);
      }
      
      if (confidence !== undefined) {
        setConfidenceScore(confidence);
      }
    }
  }, [transcript, onTranscriptChange, multiLine, onInterimTranscriptChange]);

  return {
    transcript,
    interimTranscript,
    confidenceScore,
    setTranscript,
    setInterimTranscript,
    setConfidenceScore,
    resetTranscript,
    updateTranscript
  };
}
