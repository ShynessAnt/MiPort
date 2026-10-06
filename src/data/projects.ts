import { withBase } from '@/lib/paths';
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'campus-connect',
    title: 'Campus Connect',
    summary:
      'Sitio para consultar avisos, horarios y recursos de un campus universitario de ejemplo.',
    problem:
      'La información académica estaba dispersa en carteles y archivos sueltos. Esta aplicación agrupa avisos y horarios en una sola vista de lectura.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'CSS Modules'],
    role: 'Diseño de interfaz y desarrollo frontend',
    images: [
      {
        src: withBase('images/projects/campus-connect.svg'),
        alt: 'Captura ilustrada del listado de avisos de Campus Connect',
        width: 960,
        height: 540,
      },
    ],
    demoUrl: 'https://ejemplo.com/campus-connect',
    repoUrl: 'https://github.com/tu-usuario/campus-connect',
    featured: true,
    year: 2026,
  },
  {
    slug: 'study-track',
    title: 'Study Track',
    summary:
      'Prototipo móvil para registrar sesiones de estudio y ver el avance semanal.',
    problem:
      'Costaba saber cuánto tiempo se dedicaba a cada materia. El prototipo muestra un registro simple y un resumen por semana.',
    category: 'movil',
    technologies: ['React', 'TypeScript', 'Vite'],
    role: 'Prototipado y desarrollo de la interfaz',
    images: [
      {
        src: withBase('images/projects/study-track.svg'),
        alt: 'Captura ilustrada de la pantalla de sesiones de Study Track',
        width: 960,
        height: 540,
      },
    ],
    demoUrl: 'https://ejemplo.com/study-track',
    repoUrl: 'https://github.com/tu-usuario/study-track',
    featured: true,
    year: 2025,
  },
  {
    slug: 'simulador-redes',
    title: 'Simulador de redes',
    summary:
      'Herramienta académica para visualizar un recorrido básico de paquetes en una red pequeña.',
    problem:
      'Los diagramas estáticos no ayudaban a ver el orden de los hops. La simulación anima un camino de ejemplo, sin servidor.',
    category: 'academico',
    technologies: ['TypeScript', 'SVG', 'Vite'],
    role: 'Modelado del ejemplo y visualización',
    images: [
      {
        src: withBase('images/projects/simulador-redes.svg'),
        alt: 'Captura ilustrada del diagrama del simulador de redes',
        width: 960,
        height: 540,
      },
    ],
    repoUrl: 'https://github.com/tu-usuario/simulador-redes',
    featured: true,
    year: 2025,
  },
  {
    slug: 'guia-css',
    title: 'Guía visual de CSS',
    summary:
      'Páginas de referencia con ejemplos de espaciado, tipografía y color para tareas de clase.',
    problem:
      'Reutilizar estilos a ojo generaba inconsistencias. Esta guía documenta un sistema mínimo de tokens.',
    category: 'web',
    technologies: ['HTML', 'CSS', 'Markdown'],
    role: 'Redacción y maquetación',
    images: [
      {
        src: withBase('images/projects/guia-css.svg'),
        alt: 'Captura ilustrada de la guía visual de CSS',
        width: 960,
        height: 540,
      },
    ],
    demoUrl: 'https://ejemplo.com/guia-css',
    featured: false,
    year: 2024,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured).slice(0, 3);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(
  category: Project['category'] | 'todos',
): Project[] {
  if (category === 'todos') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}
