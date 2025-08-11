"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Optional for auto sizing

export default function ConfettiPopExample() {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleCelebrate = () => {
    setShowConfetti(true);

    // Hide after 3 seconds
    setTimeout(() => setShowConfetti(false), 6000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Confetti Demo 🎉</h1>
      <button onClick={handleCelebrate}>Pop Confetti!</button>

      {showConfetti && (
        <Confetti width={width} height={height} style={{ zIndex: 100 }} />
      )}
    </div>
  );
}
