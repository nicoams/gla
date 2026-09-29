import React from "react";
import "./hexB.scss";

const HexB = () => {
  return (
    <div className="hex-crystal">
      <svg
        className="hex-crystal-svg"
        viewBox="-5 -5 110 96.6"
        preserveAspectRatio="xMidYMid meet">
        <polygon
          className="hex-base"
          points="50 0 93 21.65 93 64.95 50 86.6 7 64.95 7 21.65"
        />
        <polygon
          className="hex-inner"
          points="50 5 88 23 88 63 50 81 12 63 12 23"
        />
      </svg>
    </div>
  );
};

export default HexB;
