"use client";

interface HotlineButtonProps {
  phone?: string;
  onClick?: () => void;
}

export default function HotlineButton({
  phone = "02877778989",
  onClick,
}: HotlineButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-full text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: "linear-gradient(135deg, #e85d75 0%, #c2415a 30%, #9b3099 70%, #7b2d8b 100%)",
        boxShadow: "0 4px 20px rgba(200, 60, 120, 0.4)",
      }}
    >
      {/* Phone icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 9.82 19.79 19.79 0 01.87 1.18 2 2 0 012.87 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.65a16 16 0 006.29 6.29l1.02-1.02a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
      <span>Hotline {phone}</span>
    </button>
  );
}
