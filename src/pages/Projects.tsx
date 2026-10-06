import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { ProjectCard } from '@/components/ProjectCard';
import { TagButton } from '@/components/Tag';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/types';
import styles from './Projects.module.css';

type FilterValue = 'todos' | ProjectCategory;

const filters: { value: FilterValue; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'web', label: 'Web' },
  { value: 'movil', label: 'Móvil' },
  { value: 'academico', label: 'Académicos' },
];

function isFilterValue(value: string | null): value is FilterValue {
  return (
    value === 'todos' ||
    value === 'web' ||
    value === 'movil' ||
    value === 'academico'
  );
}

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const selected = isFilterValue(params.get('categoria'))
    ? params.get('categoria')
    : 'todos';

  const visible = useMemo(() => {
    if (selected === 'todos') {
      return projects;
    }
    return projects.filter((project) => project.category === selected);
  }, [selected]);

  const setFilter = (value: FilterValue): void => {
    const next = new URLSearchParams(params);
    if (value === 'todos') {
      next.delete('categoria');
    } else {
      next.set('categoria', value);
    }
    setParams(next, { replace: true });
  };

  return (
    <div>
      <PageMeta
        title="Proyectos"
        description="Catálogo de proyectos web, móviles y académicos."
      />
      <header className={styles.header}>
        <h1>Proyectos</h1>
        <p className={styles.lead}>
          Una selección de trabajos de ejemplo. Filtra por categoría para ver el
          catálogo por tipo.
        </p>
      </header>

      <div
        className={styles.filters}
        role="group"
        aria-label="Filtrar por categoría"
      >
        {filters.map((filter) => (
          <TagButton
            key={filter.value}
            active={selected === filter.value}
            aria-pressed={selected === filter.value}
            onClick={() => {
              setFilter(filter.value);
            }}
          >
            {filter.label}
          </TagButton>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>No se encontraron proyectos.</p>
      ) : (
        <div className="grid grid-2 grid-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
