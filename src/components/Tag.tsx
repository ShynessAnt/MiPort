import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tag.module.css';

interface TagButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

interface TagLinkProps {
  children: ReactNode;
  to: string;
  active?: boolean;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}

export function TagButton({
  children,
  active = false,
  className,
  ...props
}: TagButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.tag} ${active ? styles.active : ''} ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export function TagLink({ children, to, active = false }: TagLinkProps) {
  return (
    <Link className={`${styles.tag} ${active ? styles.active : ''}`} to={to}>
      {children}
    </Link>
  );
}
