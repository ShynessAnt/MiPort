import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { Pagination } from '@/components/Pagination';
import { PostCard } from '@/components/PostCard';
import { SearchInput } from '@/components/SearchInput';
import { TagButton } from '@/components/Tag';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { getPostCategories, getPosts } from '@/lib/posts';
import styles from './Blog.module.css';

const PAGE_SIZE = 6;

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);

  const selectedCategory = params.get('categoria') ?? 'todos';
  const currentPage = Math.max(1, Number(params.get('pagina') ?? '1') || 1);

  const allPosts = useMemo(() => getPosts(), []);
  const categories = useMemo(() => getPostCategories(), []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'todos' ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      const normalizedQuery = debouncedQuery.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [allPosts, selectedCategory, debouncedQuery]);

  const { pageItems, totalPages } = usePagination(
    filteredPosts,
    PAGE_SIZE,
    currentPage,
  );

  const handleCategoryChange = (category: string): void => {
    const next = new URLSearchParams(params);
    if (category === 'todos') {
      next.delete('categoria');
    } else {
      next.set('categoria', category);
    }
    next.delete('pagina');
    setParams(next, { replace: true });
  };

  const handlePageChange = (page: number): void => {
    const next = new URLSearchParams(params);
    if (page <= 1) {
      next.delete('pagina');
    } else {
      next.set('pagina', page.toString());
    }
    setParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <PageMeta
        title="Blog"
        description="Artículos, notas técnicas y aprendizajes sobre desarrollo web y accesibilidad."
      />
      <header className={styles.header}>
        <h1>Blog</h1>
        <p className={styles.lead}>
          Notas breves sobre desarrollo web, accesibilidad y reflexiones de los
          proyectos que realizo.
        </p>
      </header>

      <div className={styles.controls}>
        <SearchInput
          id="buscar-posts"
          value={query}
          onChange={setQuery}
          label="Buscar artículos"
          placeholder="Buscar por título, contenido o etiqueta…"
        />

        <div
          className={styles.filters}
          role="group"
          aria-label="Filtrar por categoría"
        >
          <TagButton
            active={selectedCategory === 'todos'}
            aria-pressed={selectedCategory === 'todos'}
            onClick={() => {
              handleCategoryChange('todos');
            }}
          >
            Todos
          </TagButton>
          {categories.map((category) => (
            <TagButton
              key={category}
              active={selectedCategory.toLowerCase() === category.toLowerCase()}
              aria-pressed={
                selectedCategory.toLowerCase() === category.toLowerCase()
              }
              onClick={() => {
                handleCategoryChange(category);
              }}
            >
              {category}
            </TagButton>
          ))}
        </div>
      </div>

      {pageItems.length === 0 ? (
        <p className={styles.empty}>
          No se encontraron artículos con los criterios seleccionados.
        </p>
      ) : (
        <div className="grid grid-2 grid-3">
          {pageItems.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
