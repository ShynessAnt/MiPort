import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { PostCard } from '@/components/PostCard';
import { ProjectCard } from '@/components/ProjectCard';
import { profile } from '@/data/profile';
import { getFeaturedProjects } from '@/data/projects';
import { getLatestPosts } from '@/lib/posts';
import styles from './Home.module.css';

export default function Home() {
  const featured = getFeaturedProjects();
  const posts = getLatestPosts(3);

  return (
    <div className={styles.page}>
      <PageMeta
        title="Inicio"
        description={`${profile.name}: portafolio profesional y blog personal.`}
      />
      <section className={styles.hero} aria-labelledby="presentacion">
        <img
          className={styles.photo}
          src={profile.photo.src}
          alt={profile.photo.alt}
          width={profile.photo.width}
          height={profile.photo.height}
        />
        <div>
          <p className={styles.role}>{profile.role}</p>
          <h1 id="presentacion">{profile.name}</h1>
          <p className={styles.lead}>{profile.tagline}</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/proyectos">
            Ver proyectos
          </Link>
          <a className={styles.secondary} href={profile.cvPath} download>
            Descargar CV
          </a>
        </div>
      </section>

      <section aria-labelledby="proyectos-destacados">
        <div className={styles.sectionHeader}>
          <h2 id="proyectos-destacados">Proyectos destacados</h2>
          <Link to="/proyectos">Ver todos</Link>
        </div>
        <div className="grid grid-2 grid-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="ultimas-entradas">
        <div className={styles.sectionHeader}>
          <h2 id="ultimas-entradas">Últimas entradas</h2>
          <Link to="/blog">Ir al blog</Link>
        </div>
        <div className="grid grid-2 grid-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
