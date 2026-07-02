import React, { useState, useEffect } from 'react';

import '../styles/administrativa.css'
const API = "https://onrender.com";

export default function Administrativa() {
  const [unidad, setUnidad] = useState('025');
  const [ciudad, setCiudad] = useState('LA PAZ');
  const [descripcion, setDescripcion] = useState('GACETA OFICIAL DE BOLIVIA');
  const [data, setData] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  async function fetchData() {
    try {
      let response = await fetch(API);
      let jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const abrirModal = async () => {
    if (unidad === "" || ciudad === "" || descripcion === "") {
      alert("Complete todos los campos");
      return;
    }

    const datosGuardar = {
      entidadId: 1, 
      unidad: parseInt(unidad),
      descrip: descripcion,
      ciudad: ciudad
    };

    try {
      const respuesta = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosGuardar)
      });

      if (respuesta.ok) {
        setMostrarModal(true); 
        fetchData(); 
      } else {
        alert("Error al guardar en el servidor");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setData(prev => [...prev, { id: Date.now(), ...datosGuardar }]);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };
  const handleEliminar = () =>{
    alert("Has presionado eliminar");
  };

  return (
    <div className="admi1-container">
      <div className="window main-window">
        <div className="title-bar">
          <span>Unidad Administrativa</span>
          <div className="title-buttons">
            <span>_</span>
            <span>□</span>
            <span>×</span>
          </div>
        </div>

        <div className="blue-banner">
          UNIDAD ADMINISTRATIVA
        </div>

        <div className="form-panel">
          <div className="field">
            <label htmlFor="unidad">Unidad Administrativa:</label>
            <input
              type="text"
              id="unidad"
              className="input-small"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="ciudad">Ciudad:</label>
            <input
              type="text"
              id="ciudad"
              className="input-full"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="descripcion">Descripción:</label>
            <div className="textarea-wrapper">
              <textarea 
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <div className="scrollbar-v">
                ▲<br />█<br />▼
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="win-btn highlight" onClick={abrirModal}>
            Grabar
          </button>
          <button className='win-btn highlight' onClick={handleEliminar}>
          Eliminar
            </button>
          <button className="window-close-btn win-btn" onClick={() => alert("Saliendo...")}>
            Salir
          </button>

        </div>

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
                data.map((unidadItem) => (
                  <tr key={unidadItem.id || unidadItem.unidad} className="active-row">
                    <td>{unidadItem.unidad}</td>
                    <td>{unidadItem.descrip || unidadItem.nombre}</td>
                    <td>{unidadItem.ciudad}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <div className="window modal-siaf" style={{ display: 'block', zIndex: 9999 }}>
          <div className="title-bar black">
            <span>VSIAF</span>
            <span onClick={cerrarModal} style={{ cursor: 'pointer' }}>×</span>
          </div>

          <div className="modal-body">
            <div className="icon-info">i</div>
            <div>Los datos fueron ingresados correctamente</div>
          </div>

          <div className="modal-footer">
            <button className="win-btn" onClick={cerrarModal}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}