import { useEffect, useState } from "react";

function ShowRecursosAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('https://fuerza-g-grupo-1-9lb7.onrender.com/recursos');
        let jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="data-container">
      <h2>Recursos Administrativos</h2>
      <table className="data-grid">
        <thead>
          <tr>
            <th>ID</th>
            <th>Recurso</th>
            <th>Descripción</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="active-row">
                <td>{item.id}</td>
                <td>{item.recurso}</td>
                <td>{item.descripcion}</td>
                <td>{item.cantidad}</td>
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

export default ShowRecursosAdmin;
