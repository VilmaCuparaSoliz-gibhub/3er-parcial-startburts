import { Link } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import UnidadAdministrativa from "../pages/unidadAdministrativa";

function Navbar() {
  return (
    <nav className="navbar">
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/unidad-administrativa">Unidad Adm</Link> |
        <Link to="/administrativa">Administrativa</Link> |
        <Link to="/recursos">Recursos</Link> |
        <Link to="/activos-fijos">Activos</Link> |
        <Link to="/transferencia">Transferencia</Link> |
        <Link to="/oficina">Oficinas</Link> |
        <Link to="/grupo-contable">Grupo Contable</Link>
      </nav>
    </nav>
  );
}

export default Navbar;
