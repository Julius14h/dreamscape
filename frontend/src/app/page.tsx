"use client";
import DreamInput from "./three-doors/DreamInput";
import Doors from "./three-doors/Doors";
import Login from "./three-doors/loginpage";

export default function Home() {
  return (
    <main
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-repeat bg-center"
      style={{
        backgroundImage: "url('/medieval-bricks.jpg')",
        backgroundSize: "400px 400px",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0,0,0,0.75)",
      }}
    >
      <div className="relative z-10">
        <DreamInput />
      </div>
    </main>
  );
}
