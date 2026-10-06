import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.nav} aria-label="Paginación">
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage <= 1}
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.button} ${page === currentPage ? styles.current : ''}`}
          onClick={() => {
            onPageChange(page);
          }}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage >= totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
}
