import miau1 from '../assets/img/miau1.png'
import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img className="header-flag" src={miau1} alt="Bandera" />
        <h1>VSIAF</h1>
      </div>
    </header>
  )
}

export default Header;
