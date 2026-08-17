import type { Publication } from "../data/siteContent";

export function PublicationItem({
  publication,
  compact = false,
}: {
  publication: Publication;
  compact?: boolean;
}) {
  return (
    <article className={`publication ${compact ? "publication--compact" : ""}`}>
      <div className="publication__meta">
        <span>{publication.year}</span>
        {publication.note ? <small>{publication.note}</small> : null}
      </div>
      <div className="publication__copy">
        <p>{publication.authors}</p>
        <h4>{publication.title}</h4>
        <p className="publication__venue">{publication.venue}</p>
      </div>
      <div className="publication__action">
        {publication.link ? (
          <a
            href={publication.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${publication.linkLabel ?? "DOI"} for ${publication.title}`}
          >
            {publication.linkLabel ?? "DOI"} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span aria-label="No external link available">—</span>
        )}
      </div>
    </article>
  );
}
