import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { Particles } from './Particles';
import { SkipLink } from './SkipLink';

export function Layout() {
  return (
    <>
      <Particles moveParticlesOnHover />
      <div className="site-shell">
        <SkipLink />
        <Navbar />
        <main id="contenido">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
