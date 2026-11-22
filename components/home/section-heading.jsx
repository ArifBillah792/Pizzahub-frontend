export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  center = false,
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-sm font-semibold tracking-widest text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
        {title}{" "}
        {highlight && (
          <span className="text-glow text-primary">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
