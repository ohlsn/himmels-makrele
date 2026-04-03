interface CloudAnimationProps {
  className?: string;
  slow?: boolean;
}

export default function CloudAnimation({ className = "", slow = false }: CloudAnimationProps) {
  return (
    <div className={`pointer-events-none absolute ${slow ? "animate-drift-slow" : "animate-drift"} ${className}`}>
      <svg
        width="200"
        height="80"
        viewBox="0 0 200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="70" cy="50" rx="60" ry="25" fill="white" opacity="0.6" />
        <ellipse cx="100" cy="40" rx="50" ry="30" fill="white" opacity="0.5" />
        <ellipse cx="140" cy="50" rx="45" ry="22" fill="white" opacity="0.6" />
        <ellipse cx="110" cy="55" rx="40" ry="18" fill="white" opacity="0.4" />
      </svg>
    </div>
  );
}
