import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/sideBar.module.css'

function SideBar() {
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/unidad-administrativa', label: 'Unidad Administrativa' },
    { to: '/administrativa', label: 'Administrativa' },
    { to: '/recursos', label: 'Recursos' },
    { to: '/activos-fijos', label: 'Activos Fijos' },
    { to: '/transferencia', label: 'Transferencia' },
    { to: '/oficina', label: 'Oficinas' },
  ]

  return (
    <>
      <button
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((s) => !s)}
      >
        <span className={styles.hamburger} aria-hidden="true" />
      </button>

      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.brand}>
          <h2>My App</h2>
        </div>

        <nav id="primary-navigation" className={styles.nav} aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles['footer-note']}>v1.0 · Navegación</div>
      </aside>
    </>
  )
}

export default SideBar

