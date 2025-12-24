export function Footer() {
  return (
    <footer className="mt-auto w-full h-24 bg-card relative overflow-hidden flex items-end justify-center">
      <svg 
        className="absolute bottom-0 w-full h-full text-primary/10 fill-current" 
        preserveAspectRatio="none" 
        viewBox="0 0 1440 320"
      >
        <path d="M0,192L48,176C96,160,192,128,288,106.7C384,85,480,75,576,90.7C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
      <p className="relative z-10 text-text-sub text-sm font-medium pb-4">
        © 2025 Mental Arifmetika. Barcha huquqlar himoyalangan.
      </p>
    </footer>
  );
}
