import { DongyangOldStoriesLayout } from '../../DongyangOldStoriesBlog';
import { publicPath } from '../../../utils/publicPath';

export default function DongyangArchivePost({
  title,
  time,
  note,
  images,
  sections,
}) {
  const shouldNumberImages = images.length === 2;

  return (
    <DongyangOldStoriesLayout>
      <article className="dy-card">
        <div className="dy-card-body">
          <h1>{title}</h1>
          <div className="dy-post-time">{time}</div>
          {note ? <p>{note}</p> : null}

          <div className="dy-investigation-photos">
            {images.map((image, index) => (
              <figure className="dy-investigation-photo" key={image.src}>
                <img src={publicPath(image.src)} alt={image.alt || `${title} 图片 ${index + 1}`} />
                {image.caption || shouldNumberImages ? (
                  <figcaption>{image.caption || `1/${index + 1}`}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>

          {sections.map((section) => (
            <section className="dy-archive-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.lines.map((line, index) => (
                line ? <p key={`${section.heading}-${index}`}>{line}</p> : <br key={`${section.heading}-${index}`} />
              ))}
            </section>
          ))}
        </div>
      </article>
    </DongyangOldStoriesLayout>
  );
}
