"use client";

import { useState, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

interface SpeechToTextProps {
  onTranscriptChange: (text: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-US";

        recog.onstart = () => {
          setIsRecording(true);
          onTranscriptChange(""); // Clear previous transcript
        };

        recog.onresult = (event) => {
          let text = "";
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript + " ";
          }
          onTranscriptChange(text.trim());
        };

        recog.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          if (event.error === "no-speech") {
            alert("No speech detected. Try speaking louder or check microphone permissions.");
          }
          setIsRecording(false);
        };

        recog.onend = () => {
          setIsRecording(false);
        };

        setRecognition(recog);
      } else {
        console.error("Speech Recognition API not supported in this browser.");
      }
    }
  }, [onTranscriptChange]);

  const startRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    recognition.abort();
    recognition.start();
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="relative inline-block">
      {!isRecording ? (
        <button
          className="p-3 bg-[#111111]/80 border border-[#C0A080]/50 rounded-lg text-[#C0A080] hover:text-[#C0A080]/70 transition-colors"
          onClick={startRecording}
        >
          <FaMicrophone className="text-2xl" />
        </button>
      ) : (
        <button
          className="p-3 bg-[#C0A080]/80 border border-[#C0A080]/50 rounded-lg text-white hover:bg-[#C0A080]/60 transition-colors"
          onClick={stopRecording}
        >
          <FaStop className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default SpeechToText;
