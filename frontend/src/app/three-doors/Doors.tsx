"use client";
import React, { useState } from "react";

const Doors: React.FC = () => {
  const [selectedDoor, setSelectedDoor] = useState<string | null>(null);

  const handleDoorClick = (door: string) => {
    setSelectedDoor(door);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Choose a Dream Door</h1>
      <div className="flex space-x-4">
        <button
          className="p-4 bg-blue-500 text-white rounded-lg"
          onClick={() => handleDoorClick("mind")}
        >
          🧠 Mind Door
        </button>
        <button
          className="p-4 bg-purple-500 text-white rounded-lg"
          onClick={() => handleDoorClick("spirit")}
        >
          🔮 Spirit Door
        </button>
        <button
          className="p-4 bg-green-500 text-white rounded-lg"
          onClick={() => handleDoorClick("action")}
        >
          🚀 Action Door
        </button>
      </div>

      {selectedDoor && (
        <div className="mt-4 p-4 bg-gray-200 rounded text-black">
          <h2 className="text-xl font-semibold">You chose the {selectedDoor} door!</h2>
          <p>
            {selectedDoor === "mind"
              ? "This represents logical & psychological insights."
              : selectedDoor === "spirit"
              ? "This represents symbolic & mystical meaning."
              : "This represents a real-world action challenge."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Doors;
