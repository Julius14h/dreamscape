"use client";
import React, { useState } from "react";

const Doors = () => {
  const [openDoors, setOpenDoors] = useState({
    mind: false,
    spirit: false,
    action: false
  });

  const toggleDoor = (door: keyof typeof openDoors) => {
    setOpenDoors(prev => ({
      ...prev,
      [door]: !prev[door]
    }));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      <button className="fixed bottom-6 right-6 px-5 py-3 bg-[#D4AF37] text-[#333] rounded-lg transition-all duration-200 hover:bg-[#D4AF37]/80 font-medium shadow-lg z-10">
        ←
      </button>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full overflow-x-auto">
        <div className="flex justify-center gap-6 min-w-max">
          {/* Door 1 */}
          <div className="relative w-[500px]">
            <img
              src="/3Doors.png"
              alt="First Door"
              className="w-full h-[80vh] max-h-screen object-cover pointer-events-none select-none"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-full h-[40%] flex items-center justify-center group cursor-pointer"
                onClick={() => toggleDoor('mind')}
              >
                <div className={`animate-fade-in ${!openDoors.mind && 'hidden'}`}>
                  <div className="relative w-96 h-[500px]">
                    <img 
                      src="/Scroll.png" 
                      alt="Mind Scroll" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-start justify-center overflow-y-auto">
                      <div className="text-black px-12 pt-24 pb-16 max-w-[300px] text-left">
                        Sample text for mind door
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`text-[#C0A080] text-4xl font-semibold drop-shadow-lg transition-all duration-300 group-hover:scale-110 
                  ${openDoors.mind ? 'hidden' : 'animate-fade-in'}`}>
                  🧠 Mind Door
                </span>
              </div>
            </div>
          </div>

          {/* Door 2 */}
          <div className="relative w-[500px]">
            <img
              src="/3Doors.png"
              alt="Second Door"
              className="w-full h-[80vh] max-h-screen object-cover pointer-events-none select-none"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-full h-[40%] flex items-center justify-center group cursor-pointer"
                onClick={() => toggleDoor('spirit')}
              >
                <div className={`animate-fade-in ${!openDoors.spirit && 'hidden'}`}>
                  <div className="relative w-96 h-[500px]">
                    <img 
                      src="/Scroll.png" 
                      alt="Spirit Scroll" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-start justify-center overflow-y-auto">
                      <div className="text-black px-12 pt-24 pb-16 max-w-[300px] text-left">
                        Sample text for spirit door
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`text-[#C0A080] text-4xl font-semibold drop-shadow-lg transition-all duration-300 group-hover:scale-110 
                  ${openDoors.spirit ? 'hidden' : 'animate-fade-in'}`}>
                  🔮 Spirit Door
                </span>
              </div>
            </div>
          </div>

          {/* Door 3 */}
          <div className="relative w-[500px]">
            <img
              src="/3Doors.png"
              alt="Third Door"
              className="w-full h-[80vh] max-h-screen object-cover pointer-events-none select-none"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-full h-[40%] flex items-center justify-center group cursor-pointer"
                onClick={() => toggleDoor('action')}
              >
                <div className={`animate-fade-in ${!openDoors.action && 'hidden'}`}>
                  <div className="relative w-96 h-[500px]">
                    <img 
                      src="/Scroll.png" 
                      alt="Action Scroll" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-start justify-center overflow-y-auto">
                      <div className="text-black px-12 pt-24 pb-16 max-w-[300px] text-left">
                        Sample stext for action door
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`text-[#C0A080] text-4xl font-semibold drop-shadow-lg transition-all duration-300 group-hover:scale-110 
                  ${openDoors.action ? 'hidden' : 'animate-fade-in'}`}>
                  ⚡ Action Door
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doors;