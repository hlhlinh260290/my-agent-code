"use client";

// Vietnam flag SVG as a small circle
export default function VietnamFlag() {
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0">
      <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="30" height="20" fill="#DA251D" />
        <polygon
          fill="#FFFF00"
          points="15,3 16.5,8 21.5,8 17.5,11 19,16 15,13 11,16 12.5,11 8.5,8 13.5,8"
        />
      </svg>
    </div>
  );
}
