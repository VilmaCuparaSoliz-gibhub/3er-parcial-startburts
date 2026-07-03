import React, { useState, useEffect } from 'react';
import '../styles/grupo-contable.css'; 
const GrupoContable = () => {
  const [grupos, setGrupos] = useState([]);
  const [datos, setDatos] = useState({ 
    gestion: '', vidaUtil: '', observaciones: '', deprecia: true, actualiza: true 
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cargando, setCargando] = useState(false);
  const API_GRUPOS = "https://fuerza-g-grupo-1-uy0x.onrender.com/api/objgasto";
  useEffect(() => {
    cargarGrupos();
  }, []);
  const cargarGrupos = async () => {
    setCargando(true);
    try {
      const resp = await fetch(API_GRUPOS);
      const data = await resp.json();
      setGrupos(data);
      if (data.length > 0) setDatos(data[0]);
    } catch (err) {
      console.error("Error al cargar:", err);
    } finally {
      setCargando(false);
    }
  };
  return (
    <div className="window-container">
      <header className="header">GRUPOS CONTABLES</header>
      <div className="sub-header">
        <div>UNIDAD: UFV 2026</div>
      </div>
      <div className="main-title">GRUPO CONTABLE</div>
      <main>
        <div className="form-container">
          <div className="left-inputs">
            <div>Grupo</div>
            <input type="text" className="center-text" value={datos.gestion || ''} readOnly={!modoEdicion} />
          </div>

          <div className="right-inputs">
            <div>Observaciones</div>
            <textarea value={datos.observaciones || ''} readOnly={!modoEdicion}></textarea>
          </div>
        </div>
        <div className="button-bar">
          <button className="btn" onClick={() => setModoEdicion(true)} disabled={modoEdicion}>Nuevo</button>
          <button className="btn" disabled={!modoEdicion}>Guardar</button>
          <button className="btn" onClick={() => setModoEdicion(false)} disabled={!modoEdicion}>Deshacer</button>
          <button className="btn">Salir</button>
        </div>
      </main>
      {cargando && <div className="overlay-base">Conectando al servidor...</div>}
    </div>
  );
};
export default GrupoContable;