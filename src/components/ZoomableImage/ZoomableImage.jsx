import React, { useState, useRef } from "react";

function ZoomableImage({ src, alt }) {
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [bgPos, setBgPos] = useState({ x: "50%", y: "50%" });

  // При движении мыши рассчитываем позицию background
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setBgPos({ x: `${x}%`, y: `${y}%` });
  };

  // При наведении включаем зум
  const handleMouseEnter = () => {
    setZoomed(true);
  };

  // При уходе — убираем зум и возвращаем позицию по центру
  const handleMouseLeave = () => {
    setZoomed(false);
    setBgPos({ x: "50%", y: "50%" });
  };

  return (
    <div
      className={`zoom-container ${zoomed ? "zoomed" : ""}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${src})`,
        // Позиция фона зависит от положения курсора
        backgroundPosition: `${bgPos.x} ${bgPos.y}`,
      }}
    >
      <img src={src} alt={alt} style={{ opacity: 0 }} />
    </div>
  );
}

export default ZoomableImage;
