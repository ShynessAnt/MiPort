import { ContactForm } from '@/components/ContactForm';
import { PageMeta } from '@/components/PageMeta';
import { profile } from '@/data/profile';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.page}>
      <PageMeta
        title="Contacto"
        description={`Ponte en contacto con ${profile.name}.`}
      />

      <header className={styles.header}>
        <h1>Contacto</h1>
        <p className={styles.lead}>
          ¿Tienes alguna duda sobre mis proyectos, quieres charlar sobre
          desarrollo web o explorar una colaboración? Escríbeme a través del
          siguiente formulario o en mis redes.
        </p>
      </header>

      <section className={styles.channels} aria-labelledby="medios-directos">
        <h2 id="medios-directos">Medios directos</h2>
        <ul className={styles.channelsList}>
          <li className={styles.channelItem}>
            <strong>Correo:</strong>{' '}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li className={styles.channelItem}>
            <strong>GitHub:</strong>{' '}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {profile.githubUrl}
            </a>
          </li>
          <li className={styles.channelItem}>
            <strong>LinkedIn:</strong>{' '}
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {profile.linkedinUrl}
            </a>
          </li>
        </ul>
      </section>

      <section className={styles.formSection} aria-labelledby="envio-mensaje">
        <h2 id="envio-mensaje">Envíame un mensaje</h2>
        <ContactForm />
      </section>
    </div>
  );
}
