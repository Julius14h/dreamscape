"use client";
import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const DreamInput: React.FC = () => {
  const [dream, setDream] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      <div className="fixed bottom-0 flex justify-center w-full">
        <div className="relative">
          <img
            src="/Door.png"
            alt="Medieval Door Frame"
            className="w-auto h-[95vh] max-h-screen object-contain pointer-events-none select-none"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center w-[80%] max-w-[400px] mx-auto top-[5%] px-4">
            <h1
              className="mb-6 drop-shadow-lg"
              style={{
                fontFamily: "Playfair Display",
                fontSize: "3.5rem",
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
              className="w-full p-4 bg-[#111111]/80 border border-[#C0A080]/50 rounded-lg text-[#C0A080] placeholder-[#C0A080]/50 focus:outline-none focus:ring-2 focus:ring-[#C0A080]/30 transition-colors resize-none h-24"
              placeholder="Enter your dream details..."
            />

            <div className="flex items-center mt-6">
              {/* Analyze button does nothing for now */}
              <button
                className="px-6 py-3 bg-[#D4AF37] text-[#333] rounded-lg transition-all duration-200 hover:bg-[#D4AF37]/80 font-medium mr-3 hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(212,175,55,0.3)]"
                style={{ boxShadow: "0 0 10px rgba(212, 175, 55, 0.2)" }}
              >
                ANALYZE
              </button>

              <div
                className="relative inline-block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  className="p-3 bg-[#111111]/80 border border-[#C0A080]/50 rounded-lg text-[#C0A080] hover:text-[#C0A080]/70 transition-colors"
                  onClick={() => {
                    console.log("Microphone button clicked");
                  }}
                >
                  <FaMicrophone className="text-2xl" />
                </button>
                {showTooltip && (
                  <div
                    className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-center rounded-md text-sm whitespace-nowrap"
                    style={{
                      fontFamily: "Roboto",
                      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Use voice input
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamInput;
