import type { Publication } from "../data/siteContent";

export function PublicationItem({
  publication,
  compact = false,
}: {
  publication: Publication;
  compact?: boolean;
}) {
  const linkLabel = publication.linkLabel ?? "DOI";

  return (
    <article
      className={`publication${compact ? " publication--compact" : ""}`}
    >
      <div className="publication__meta">
        <span>{publication.year}</span>
        {publication.note ? <small>{publication.note}</small> : null}
      </div>
      <div className="publication__copy">
        <p className="publication__authors">{publication.authors}</p>
        <h3 className="publication__title">{publication.title}</h3>
        <p className="publication__venue">{publication.venue}</p>
      </div>
      <div className="publication__action">
        {publication.link ? (
          <a
            href={publication.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${linkLabel} for ${publication.title}`}
          >
            <span>{linkLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span aria-label="No external link available">—</span>
        )}
      </div>
    </article>
  );
}
