import { NavLink } from 'react-router';

function getLinkClassName({ isActive }: { isActive: boolean }): string {
  return ['app-navigation__link', isActive ? 'app-navigation__link--active' : '']
    .filter(Boolean)
    .join(' ');
}

export function AppNavigation() {
  return (
    <nav className="app-navigation" aria-label="Navegación principal">
      <ul className="app-navigation__list">
        <li>
          <NavLink to="/" end className={getLinkClassName}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={getLinkClassName}>
            Tareas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
