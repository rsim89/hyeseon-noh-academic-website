type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
};

export function PageHero({
  index,
  eyebrow,
  title,
  intro,
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__index" aria-hidden="true">
        {index}
      </div>
      <div className="page-hero__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        {children}
      </div>
    </section>
  );
}
