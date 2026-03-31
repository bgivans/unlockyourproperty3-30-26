interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  center = false,
  className = "",
}: SectionHeadingProps) => (
  <div className={`${center ? "text-center" : ""} ${className}`.trim()}>
    {eyebrow && (
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
