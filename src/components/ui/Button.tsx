import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-full font-heading font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-fish-gold text-ocean hover:bg-fish-orange hover:scale-105 focus:ring-fish-gold shadow-lg",
    secondary:
      "bg-white/80 text-ocean border-2 border-sky hover:bg-sky-light hover:scale-105 focus:ring-sky",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
