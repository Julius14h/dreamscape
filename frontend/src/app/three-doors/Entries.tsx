"use client";
import React, { useState } from "react";

const Entries: React.FC = () => {
  const [openEntry, setOpenEntry] = useState<number | null>(null);

  const toggleEntry = (index: number) => {
    setOpenEntry((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      {/* Black Blur Background Box */}
      <div className="relative w-[60%] max-w-3xl min-w-[400px] p-6 rounded-lg bg-black/50 backdrop-blur-lg border border-[#D4AF37]/40 shadow-lg">
        {/* Entries Title */}
        <h1
          className="mb-6"
          style={{
            fontFamily: "Playfair Display",
            fontSize: "2.5rem",
            fontWeight: "600",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            letterSpacing: "0.05rem",
            color: "#D4AF37",
          }}
        >
          Entries
        </h1>

        {/* Entry List */}
        <div className="space-y-4">
          {["Entry 1", "Entry 2", "Entry 3", "Entry 4"].map((entry, index) => (
            <div key={index} className="relative">
              <div
                className="p-4 bg-black/30 border border-[#C0A080]/40 rounded-lg text-[#C0A080] hover:bg-black/40 transition-all duration-200 cursor-pointer flex justify-between"
                onClick={() => toggleEntry(index)}
              >
                <span>{entry}</span>
                <span className="text-sm text-[#C0A080]/70">Sample text {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Appears in the Center & Click to Close */}
      {openEntry !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40"
          onClick={() => setOpenEntry(null)} // Clicking outside the scroll closes it
        >
          <div className="relative w-96 h-[500px] animate-fade-in cursor-pointer">
            <img 
              src="/Scroll.png" 
              alt="Scroll Background" 
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-start justify-center overflow-y-auto">
              <div className="text-black px-12 pt-24 pb-16 max-w-[300px] text-left">
                Sample text for {`Entry ${openEntry + 1}`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button - Fixed to Bottom Right */}
      <button
        className="fixed bottom-6 right-6 px-5 py-3 bg-[#D4AF37] text-[#333] rounded-lg transition-all duration-200 hover:bg-[#D4AF37]/80 font-medium shadow-lg"
      >
        ←
      </button>
    </div>
  );
};

export default Entries;
