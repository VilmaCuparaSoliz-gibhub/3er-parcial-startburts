import { useEffect, useState } from 'react';
import '../../styles/grupo-contable.css';

const candidateEndpoints = [
  'https://fuerza-g-grupo-1-9lb7.onrender.com/grupocontable',
  'https://fuerza-g-grupo-1-9lb7.onrender.com/gruposcontables',
  'https://fuerza-g-grupo-1-9lb7.onrender.com/grupos',
  'https://fuerza-g-grupo-1-9lb7.onrender.com/grupo-contable',
  'https://fuerza-g-grupo-1-9lb7.onrender.com/grupocontables',
];

function normalizeData(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.result)) return payload.result;
  if (Array.isArray(payload?.items)) return payload.items;

  if (payload && typeof payload === 'object') {
    const nestedArray = Object.values(payload).find(Array.isArray);
    if (nestedArray) return nestedArray;
  }

  return [];
}

function ShowGrupoContable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      for (const url of candidateEndpoints) {
        try {
          const response = await fetch(url);
          if (!response.ok) continue;

          const jsonData = await response.json();
          const normalized = normalizeData(jsonData);

          if (isMounted) {
            setData(normalized);
            setError('');
            setLoading(false);
          }
          return;
        } catch (err) {
          console.error(`Error fetching ${url}:`, err);
        }
      }

      if (isMounted) {
        setError('No se pudo obtener información del servicio.');
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = data.length > 0 ? Object.keys(data[0]) : ['id', 'nombre', 'descripcion'];

  return (
    <div className="grupo-contable-container">
      <h1>Grupo Contable</h1>

      {loading ? (
        <p>Cargando información...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : data.length > 0 ? (
        <table className="data-grid">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id ?? item.codigo ?? `${item.nombre ?? 'item'}-${index}`}>
                {columns.map((column) => (
                  <td key={`${column}-${index}`}>
                    {item[column] == null || item[column] === '' ? '-' : String(item[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
}

export default ShowGrupoContable;
