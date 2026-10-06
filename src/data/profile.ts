import { withBase } from '@/lib/paths';

export const profile = {
  name: 'Antonio De Jesús Soto Sánchez',
  role: 'Estudiante de Ingeniería en Sistemas Computacionales | Cloude Computer',
  tagline:
    'Diseño y construyo sitios sistemas claros, accesibles y fáciles de mantener.',
  photo: {
    src: withBase('images/avatar.svg'),
    alt: 'Foto de perfil de AntOnix',
    width: 160,
    height: 160,
  },
  email: 'antoniosotosnz@gmail.com',
  githubUrl: 'https://github.com/ShynessAnt',
  linkedinUrl: '#',
  cvPath: withBase('cv.pdf'),
  bio: 'Soy Antonix , estudiante de Ingenieria en Sistemas Computacionales y Desarrollo Web. Me interesa crear interfaces sencillas, con HTML semántico, CSS predecible y JavaScript (o TypeScript) bien organizado. Este sitio reúne proyectos de clase, experimentos personales y notas de lo que voy aprendiendo.',
  education: [
    {
      title: 'Licenciatura en Informática (en curso)',
      place: '[Tu universidad]',
      period: '2023 — actualidad',
    },
    {
      title: 'Curso de fundamentos de la web',
      place: '[Tu institución o plataforma]',
      period: '2022',
    },
  ],
  technicalSkills: [
    'HTML semántico',
    'CSS (módulos y variables)',
    'JavaScript / TypeScript',
    'React',
    'Git',
    'Accesibilidad básica',
  ],
  softSkills: [
    'Comunicación clara',
    'Organización',
    'Trabajo en equipo',
    'Aprendizaje autónomo',
  ],
  timeline: [
    {
      year: '2024',
      title: 'Primeros proyectos con React',
      description:
        'Construí interfaces con componentes reutilizables y enrutamiento para tareas de clase.',
    },
    {
      year: '2025',
      title: 'Enfoque en accesibilidad',
      description:
        'Empecé a aplicar semántica, foco visible y formularios comprensibles en todos los entregables.',
    },
    {
      year: '2026',
      title: 'Portafolio y blog personal',
      description:
        'Reuní proyectos y notas en este sitio estático, pensado para explicar el código en una exposición.',
    },
  ],
} as const;
