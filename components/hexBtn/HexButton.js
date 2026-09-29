import React from "react";
import "./style.scss";

const HexButton = ({ children, onClick, className = "" }) => {
  return (
    <div className='hexWrapper'>
    <button
      type="button"
      className={`hexBtn ${className}`}
      onClick={onClick}
      // set custom property for sizing
      //style={{ ["--size"]: size }}
    >
      <span>{children}</span>
    </button>
    </div>
  );
};

export default HexButton;
