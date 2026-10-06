import { profile } from '@/data/profile';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          © {year} {profile.name}. Portafolio de ejemplo para Programación Web.
        </p>
        <nav className={styles.links} aria-label="Redes y currículum">
          <a href={profile.githubUrl} rel="noreferrer noopener" target="_blank">
            GitHub
          </a>
          <a
            href={profile.linkedinUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Correo</a>
          <a href={profile.cvPath} download>
            Descargar CV
          </a>
        </nav>
      </div>
    </footer>
  );
}
