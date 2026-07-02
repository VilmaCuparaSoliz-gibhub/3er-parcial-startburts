import miau1 from '../assets/img/miau1.png'
import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img className="header-flag" src={miau1} alt="Bandera" />
        <div className="titulo">
          <h1>VSIAF</h1>
          <p3>Sistema de Activos Fijos</p3>
        </div>
       </div>
       <div className="header-info">
        <p>USUARIO: admin</p>
        <p>BACKUPS: None</p>
      </div>
    </header>
  )
}

export default Header;