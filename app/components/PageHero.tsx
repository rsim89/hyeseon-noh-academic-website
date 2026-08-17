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
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero__index" aria-hidden="true">
        <span>{index}</span>
      </div>
      <header className="page-hero__copy">
        <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p className="page-hero__intro">{intro}</p>
        {children ? <div className="page-hero__actions">{children}</div> : null}
      </header>
    </section>
  );
}
