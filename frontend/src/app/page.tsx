"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SpeechToText from "./components/SpeechToText";

const DreamInput: React.FC = () => {
  const [dream, setDream] = useState("");
  const router = useRouter();

  const handleAnalyze = () => {
    if (!dream) return alert("Please enter a dream");
    router.push(`/three-doors?dreamText=${encodeURIComponent(dream)}`);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      <div className="fixed bottom-0 flex justify-center w-full">
        <div className="relative">
          <img
            src="/Door.png"
            alt="Medieval Door Frame"
            className="w-auto h-[95vh] max-h-screen object-contain pointer-events-none select-none"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center w-[80%] max-w-[400px] mx-auto top-[16%] px-4 space-y-4">
            <h1
              className="drop-shadow-lg text-center text-[8vw] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                fontFamily: "Playfair Display",
                fontWeight: "600",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                letterSpacing: "0.05rem",
                color: "#D4AF37",
              }}
            >
              DreamScape
            </h1>
            <textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              className="no-scrollbar w-72 p-4 bg-[#111111]/80 border border-[#C0A080]/50 rounded-lg text-[#C0A080] placeholder-[#C0A080]/50 focus:outline-none focus:ring-2 focus:ring-[#C0A080]/30 transition-colors resize-none h-52 overflow-y-auto"
              placeholder="Enter your dream details..."
            />
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAnalyze}
                className="px-6 py-3 bg-[#D4AF37] text-[#333] rounded-lg transition-all duration-200 hover:bg-[#D4AF37]/80 font-medium hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(212,175,55,0.3)]"
                style={{ boxShadow: "0 0 10px rgba(212, 175, 55, 0.2)" }}
              >
                Analyze
              </button>
              <div className="relative inline-block">
                <SpeechToText onTranscriptChange={setDream} />
              </div>
            </div>
            <button className="px-5 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm rounded-lg transition-all duration-200 hover:bg-[#D4AF37]/20 hover:scale-105">
              View Previous Entries
            </button>
            <button className="text-[#D4AF37] text-sm underline hover:text-[#D4AF37]/80 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamInput;
