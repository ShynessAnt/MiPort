import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { Tag } from '@/components/Tag';
import { getProjectBySlug } from '@/data/projects';
import type { Project } from '@/types';
import styles from './ProjectDetail.module.css';

const categoryLabels: Record<Project['category'], string> = {
  web: 'Web',
  movil: 'Móvil',
  academico: 'Académico',
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className={styles.notFound}>
        <PageMeta
          title="Proyecto no encontrado"
          description="El proyecto solicitado no existe o ha sido modificado."
        />
        <h1>Proyecto no encontrado</h1>
        <p>
          No se encontró ningún proyecto con el identificador proporcionado.
        </p>
        <div>
          <Link to="/proyectos" className={styles.backLink}>
            ← Volver al catálogo de proyectos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.page}>
      <PageMeta title={project.title} description={project.summary} />

      <header className={styles.header}>
        <div>
          <Link to="/proyectos" className={styles.backLink}>
            ← Volver a proyectos
          </Link>
        </div>

        <div className={styles.meta}>
          <span>{project.year}</span>
          <span>·</span>
          <span>{categoryLabels[project.category]}</span>
        </div>

        <h1>{project.title}</h1>
        <p className={styles.lead}>{project.summary}</p>

        <div className={styles.actions}>
          {project.demoUrl ? (
            <a
              className={styles.primary}
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Ver demo en vivo
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              className={styles.secondary}
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Código en GitHub
            </a>
          ) : null}
        </div>
      </header>

      {project.images.length > 0 ? (
        <section className={styles.images} aria-label="Capturas del proyecto">
          {project.images.map((img, idx) => (
            <img
              key={img.src + idx}
              className={styles.image}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
            />
          ))}
        </section>
      ) : null}

      <section
        className={styles.section}
        aria-labelledby="descripcion-problema"
      >
        <h2 id="descripcion-problema">El reto o problema</h2>
        <p>{project.problem}</p>
      </section>

      <section className={styles.section} aria-labelledby="rol-desarrollo">
        <h2 id="rol-desarrollo">Mi rol y aportes</h2>
        <p>{project.role}</p>
      </section>

      <section className={styles.section} aria-labelledby="tecnologias">
        <h2 id="tecnologias">Tecnologías empleadas</h2>
        <div className={styles.technologies}>
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </section>
    </article>
  );
}
