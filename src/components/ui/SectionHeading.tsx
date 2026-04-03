interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`font-heading text-3xl md:text-4xl font-bold text-ocean text-center mb-8 ${className}`}
    >
      {children}
      <span className="block w-16 h-1 bg-fish-gold mx-auto mt-3 rounded-full" />
    </h2>
  );
}
