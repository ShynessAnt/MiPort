import { PageMeta } from '@/components/PageMeta';
import { Tag } from '@/components/Tag';
import { profile } from '@/data/profile';
import styles from './About.module.css';

export default function About() {
  return (
    <article className={styles.page}>
      <PageMeta
        title="Sobre mí"
        description={`Biografía, formación y habilidades de ${profile.name}.`}
      />
      <header>
        <h1>Sobre mí</h1>
        <p className={styles.lead}>{profile.bio}</p>
      </header>

      <section aria-labelledby="formacion">
        <h2 id="formacion">Formación</h2>
        <ul className={styles.list}>
          {profile.education.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <br />
              {item.place} · {item.period}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="habilidades-tecnicas">
        <h2 id="habilidades-tecnicas">Habilidades técnicas</h2>
        <div className={styles.skills}>
          {profile.technicalSkills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </section>

      <section aria-labelledby="habilidades-blandas">
        <h2 id="habilidades-blandas">Habilidades blandas</h2>
        <div className={styles.skills}>
          {profile.softSkills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </section>

      <section aria-labelledby="linea-de-tiempo">
        <h2 id="linea-de-tiempo">Línea de tiempo</h2>
        <ol className={styles.timeline}>
          {profile.timeline.map((item) => (
            <li key={item.year + item.title}>
              <p className={styles.year}>{item.year}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
