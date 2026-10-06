import { Link } from 'react-router-dom';
import type { Post } from '@/types';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.category}</span>
        <span>{post.readingTimeMin} min de lectura</span>
      </div>
      <h2 className={styles.title}>
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </article>
  );
}
