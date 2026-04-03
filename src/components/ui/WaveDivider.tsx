interface WaveDividerProps {
  colorFrom?: string;
  colorTo?: string;
  flip?: boolean;
}

export default function WaveDivider({
  colorFrom = "#F8FAFC",
  colorTo = "#E0F2FE",
  flip = false,
}: WaveDividerProps) {
  return (
    <div className={`wave-divider ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
          fill={colorTo}
        />
        <rect width="1440" height="60" fill={colorFrom} />
      </svg>
    </div>
  );
}
