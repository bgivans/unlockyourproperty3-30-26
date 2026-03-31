export const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Large circle — top right */}
    <svg className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.08] animate-svg-float" viewBox="0 0 320 320" fill="none">
      <circle cx="160" cy="160" r="150" stroke="white" strokeWidth="1" />
      <circle cx="160" cy="160" r="100" stroke="white" strokeWidth="0.5" />
    </svg>

    {/* Diamond — left center */}
    <svg className="absolute top-1/3 -left-10 w-48 h-48 opacity-[0.08] animate-svg-float-reverse" viewBox="0 0 200 200" fill="none">
      <rect x="50" y="50" width="100" height="100" rx="4" transform="rotate(45 100 100)" stroke="white" strokeWidth="1" />
    </svg>

    {/* Small triangles — bottom */}
    <svg className="absolute bottom-20 right-1/4 w-32 h-32 opacity-[0.06] animate-svg-float" viewBox="0 0 120 120" fill="none">
      <polygon points="60,10 110,100 10,100" stroke="white" strokeWidth="1" />
    </svg>

    {/* Dotted arc — top left */}
    <svg className="absolute top-1/4 left-1/4 w-60 h-60 opacity-[0.05] animate-svg-float-slow" viewBox="0 0 240 240" fill="none">
      <path d="M40 200 A 120 120 0 0 1 200 40" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
    </svg>

    {/* Horizontal lines — bottom left */}
    <svg className="absolute bottom-1/3 left-10 w-40 h-20 opacity-[0.08] animate-svg-float-reverse" viewBox="0 0 160 80" fill="none">
      <line x1="0" y1="20" x2="160" y2="20" stroke="white" strokeWidth="0.5" />
      <line x1="20" y1="40" x2="140" y2="40" stroke="white" strokeWidth="0.5" />
      <line x1="40" y1="60" x2="120" y2="60" stroke="white" strokeWidth="0.5" />
    </svg>
  </div>
);
