"use client";
import React from "react";
import MemoryBtns from "@/components/memoryBtns/MemoryBtns";
import "./style.scss";

const Memory = () => {
  const [platformColors, setPlatformColors] = React.useState(
    Array(12).fill("")
  );

  const updateColor = (index, color) => {
    setPlatformColors((prev) => {
      const updated = [...prev];
      updated[index] = color;
      return updated;
    });
  };

  const resetAllColors = () => {
    setPlatformColors(Array(12).fill(""));
  };

  return (
    <div className="memory-container">
      <button className="reset-btn" onClick={resetAllColors}>
        Reset
      </button>
      <div className="platform-container">
        {platformColors.map((color, index) => (
          <div
            key={index}
            className={`memory-platform p${index + 1}`}
            data-bg={color}>
            <div className="platform-bg"></div>
            <MemoryBtns onColorSelect={(color) => updateColor(index, color)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memory;
