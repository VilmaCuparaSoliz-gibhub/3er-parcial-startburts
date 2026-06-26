import { useEffect, useState } from "react";

function ShowUnidadAdministrativa() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('https://fuerza-g-grupo-1-9lb7.onrender.com/unidadadmin');
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
      <h2>Unidades Administrativas</h2>
      <table className="data-grid">
        <thead>
          <tr>
            <th style={{ width: '20%' }}>UNIDAD</th>
            <th style={{ width: '50%' }}>DESCRIPCION</th>
            <th style={{ width: '30%' }}>CIUDAD</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((unidad) => (
              <tr key={unidad.id} className="active-row">
                <td>{unidad.unidad}</td>
                <td>{unidad.descrip}</td>
                <td>{unidad.ciudad}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShowUnidadAdministrativa;
