import React from "react";
import Image from "next/image";
import "./style.scss";

const MemoryBtns = ({ onColorSelect }) => {
  const colors = [
    { name: "blue", src: "/images/blue.png" },
    { name: "purple", src: "/images/purple.png" },
    { name: "pink", src: "/images/pink.png" },
    { name: "orange", src: "/images/orange.png" },
    { name: "green", src: "/images/green.png" },
    { name: "red", src: "/images/red.png" },
  ];

  return (
    <div className="colors">
      {colors.map(({ name, src }) => (
        <button
          key={name}
          data-color={name}
          onClick={() => onColorSelect(name)}>
          <Image
            className="img-btn"
            src={src}
            alt={name}
            width={50}
            height={50}
          />
        </button>
      ))}
    </div>
  );
};

export default MemoryBtns;
