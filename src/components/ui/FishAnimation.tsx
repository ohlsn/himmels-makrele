"use client";

interface FishAnimationProps {
  className?: string;
  delay?: number;
  size?: number;
}

export default function FishAnimation({
  className = "",
  delay = 0,
  size = 60,
}: FishAnimationProps) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <svg
        width={size}
        height={size * 0.5}
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-swim"
        style={{ animationDelay: `${delay}s` }}
      >
        {/* Mackerel body */}
        <ellipse cx="55" cy="30" rx="40" ry="18" fill="#38BDF8" />
        {/* Darker stripes */}
        <path d="M35 15C40 25 40 35 35 45" stroke="#0369A1" strokeWidth="2" opacity="0.5" />
        <path d="M45 13C50 25 50 35 45 47" stroke="#0369A1" strokeWidth="2" opacity="0.5" />
        <path d="M55 12C60 25 60 35 55 48" stroke="#0369A1" strokeWidth="2" opacity="0.5" />
        <path d="M65 14C70 25 70 35 65 46" stroke="#0369A1" strokeWidth="2" opacity="0.5" />
        {/* Tail */}
        <path d="M95 30L115 15L115 45Z" fill="#0369A1" opacity="0.7" />
        {/* Eye */}
        <circle cx="25" cy="27" r="5" fill="white" />
        <circle cx="24" cy="26" r="2.5" fill="#164E63" />
        {/* Belly highlight */}
        <ellipse cx="50" cy="38" rx="25" ry="6" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}
