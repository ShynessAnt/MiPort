import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import styles from './ProjectCard.module.css';

const categoryLabel: Record<Project['category'], string> = {
  web: 'Web',
  movil: 'Móvil',
  academico: 'Académicos',
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.images[0];

  return (
    <article className={styles.card}>
      {image ? (
        <Link to={`/proyectos/${project.slug}`}>
          <img
            className={styles.image}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
          />
        </Link>
      ) : null}
      <div className={styles.meta}>
        <span>{project.year}</span>
        <span>{categoryLabel[project.category]}</span>
      </div>
      <h2 className={styles.title}>
        <Link to={`/proyectos/${project.slug}`}>{project.title}</Link>
      </h2>
      <p className={styles.summary}>{project.summary}</p>
    </article>
  );
}
