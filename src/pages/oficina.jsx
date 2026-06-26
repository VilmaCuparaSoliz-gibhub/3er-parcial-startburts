import { useEffect, useState } from "react";

function Oficina() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('https://fuerza-g-grupo-1-9lb7.onrender.com/oficinas');
        let jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="oficina-container">
      <h1>Oficinas</h1>
      <table className="data-grid">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="active-row">
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.ubicacion}</td>
                <td>{item.telefono}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Oficina;
