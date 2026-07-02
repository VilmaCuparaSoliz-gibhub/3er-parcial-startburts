import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
    { to: '/grupo-contable', label: 'Grupo Contable' },
  ]

  const navigate = useNavigate()
  const location = useLocation()

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
          <h2>  MENU PRINCIPAL</h2>
        </div>

        <nav id="primary-navigation" className={styles.nav} aria-label="Primary">
          <ul>
            {links.map((l) => {
              const active = location.pathname === l.to
              return (
                <li key={l.to}>
                  <button
                    type="button"
                    className={active ? styles.active : ''}
                    onClick={() => {
                      navigate(l.to)
                      setOpen(false)
                    }}
                  >
                    {l.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles['footer-note']}>NAVEGACION.STARTBURST</div>
      </aside>
    </>
  )
}

export default SideBar

