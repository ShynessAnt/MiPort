import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <PageMeta
        title="404 - Página no encontrada"
        description="La página que buscas no existe o ha sido movida."
      />
      <div className={styles.code}>404</div>
      <h1>Página no encontrada</h1>
      <p className={styles.lead}>
        Lo sentimos, la dirección a la que intentas acceder no existe, ha
        cambiado de ubicación o está temporalmente fuera de servicio.
      </p>
      <Link to="/" className={styles.homeLink}>
        Volver a la página principal
      </Link>
    </div>
  );
}
