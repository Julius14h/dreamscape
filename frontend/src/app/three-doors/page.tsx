"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MedievalSharp } from "next/font/google";

const medievalFont = MedievalSharp({ subsets: ["latin"], weight: "400" });

const Door = ({
  name,
  emoji,
  interpretation,
  isOpen,
  toggle,
}: {
  name: string;
  emoji: string;
  interpretation: string;
  isOpen: boolean;
  toggle: () => void;
}) => {
  return (
    <div className="relative w-[280px] md:w-[320px]">
      <img src="/3Doors.png" alt={`${name} Door`} className="w-full h-auto object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[40%] flex items-center justify-center group cursor-pointer" onClick={toggle}>
          {isOpen ? (
            <div className="relative w-full max-w-[95%] translate-y-[-5%]">
              <img src="/Scroll.png" alt={`${name} Scroll`} className="w-full h-[60vh] object-contain" />
              <div
                className="absolute inset-0 flex items-start justify-center overflow-y-auto no-scrollbar"
                style={{
                  paddingTop: "6vh",
                  paddingBottom: "6vh",
                  maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                }}
              >
                <div
                  className={`${medievalFont.className} text-[#4a2c15] text-sm md:text-base px-8 pt-2 pb-2 max-w-[240px] text-left tracking-wide leading-relaxed`}
                >
                  {interpretation}
                </div>
              </div>
            </div>
          ) : (
            <span className="text-[#C0A080] text-lg md:text-2xl font-semibold drop-shadow-lg transition-all duration-300 group-hover:scale-110">
              {emoji} {name} Door
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ThreeDoors = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dreamText = searchParams.get("dreamText");
  const [interpretations, setInterpretations] = useState<{ mind: string; spirit: string; action: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDoor, setOpenDoor] = useState<string | null>(null);

  useEffect(() => {
    if (!dreamText) {
      setError("No dream text provided.");
      setLoading(false);
      return;
    }

    const fetchInterpretations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dreams/analyze-dream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dreamText }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setInterpretations(data.interpretations);
      } catch (err) {
        setError("Error fetching dream interpretations.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterpretations();
  }, [dreamText]);

  if (loading) return <p>Loading dream analysis...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
      <div className="absolute top-6 text-center text-[#D4AF37] text-lg md:text-xl lg:text-2xl font-semibold drop-shadow-lg space-y-2">
        <p className="text-md md:text-lg lg:text-xl">✨ Choose a Door to Uncover Your Dream’s Meaning ✨</p>
        <p className="text-xs md:text-sm text-[#C0A080] max-w-[600px] mx-auto">
          🧠 <strong>Mind Door:</strong> Logical and psychological interpretation of your dream.
          <br />
          🔮 <strong>Spirit Door:</strong> Spiritual and symbolic meaning tied to your subconscious.
          <br />
          ⚡ <strong>Action Door:</strong> Practical insights and advice on what to do next.
        </p>
      </div>

      <div className="absolute bottom-0 flex justify-center gap-32 w-full translate-y-[5%]">
        <Door
          name="Mind"
          emoji="🧠"
          interpretation={interpretations?.mind || ""}
          isOpen={openDoor === "mind"}
          toggle={() => setOpenDoor(openDoor === "mind" ? null : "mind")}
        />
        <Door
          name="Spirit"
          emoji="🔮"
          interpretation={interpretations?.spirit || ""}
          isOpen={openDoor === "spirit"}
          toggle={() => setOpenDoor(openDoor === "spirit" ? null : "spirit")}
        />
        <Door
          name="Action"
          emoji="⚡"
          interpretation={interpretations?.action || ""}
          isOpen={openDoor === "action"}
          toggle={() => setOpenDoor(openDoor === "action" ? null : "action")}
        />
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed bottom-6 right-6 px-5 py-3 bg-[#D4AF37] text-[#333] rounded-lg transition-all duration-200 hover:bg-[#D4AF37]/80 font-medium shadow-lg"
      >
        ← Back
      </button>
    </div>
  );
};

export default ThreeDoors;
