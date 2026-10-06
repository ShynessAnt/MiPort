import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { PageMeta } from '@/components/PageMeta';
import { Tag } from '@/components/Tag';
import { getPostBySlug } from '@/lib/posts';
import styles from './PostDetail.module.css';

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className={styles.notFound}>
        <PageMeta
          title="Artículo no encontrado"
          description="La entrada que buscas no existe o ha sido movida."
        />
        <h1>Artículo no encontrado</h1>
        <p>
          No se encontró ninguna entrada de blog con el identificador indicado.
        </p>
        <div>
          <Link to="/blog" className={styles.backLink}>
            ← Volver al listado del blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.article}>
      <PageMeta title={post.title} description={post.excerpt} />

      <header className={styles.header}>
        <div>
          <Link to="/blog" className={styles.backLink}>
            ← Volver al blog
          </Link>
        </div>

        <div className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.category}</span>
          <span>·</span>
          <span>{post.readingTimeMin} min de lectura</span>
        </div>

        <h1>{post.title}</h1>
        <p className={styles.lead}>{post.excerpt}</p>

        {post.tags.length > 0 ? (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </header>

      {post.cover ? (
        <img
          className={styles.cover}
          src={post.cover}
          alt={`Portada de ${post.title}`}
          loading="lazy"
        />
      ) : null}

      <div className={`prose ${styles.content}`}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
