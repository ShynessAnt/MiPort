export type ProjectCategory = 'web' | 'movil' | 'academico';

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  category: ProjectCategory;
  technologies: string[];
  role: string;
  images: ProjectImage[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: number;
}
