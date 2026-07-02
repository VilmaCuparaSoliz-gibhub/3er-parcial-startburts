import { useState } from "react";

const initialForm = {
  unidadActual: '0252 - Nivel Central',
  oficinaActual: '100 DIRECCION',
  responsableActual: 'DR. WALTER AGREDA CO',
  nuevaUnidad: '',
  nuevaOficina: '',
  nuevaResponsable: '',
  auxiliar: ''
};

function ShowTransferencia() {
  const [formulario, setFormulario] = useState(initialForm);
  const [mensaje, setMensaje] = useState('');

  const opcionesUnidades = [
    ' Nivel Central',
    ' Nivel Sur',
    ' Nivel Este',
    ' Nivel Oeste'
  ];

  const opcionesOficinas = [
    '100 DIRECCION',
    '101 FINANZAS',
    '102 RECURSOS',
    '103 SISTEMAS'
  ];

  const opcionesResponsables = [
    'DR. WALTER AGREDA CO',
    'SRA. JUANA PEREZ',
    'ING. CARLOS QUISPE',
    'LIC. MARIA ZAMORA'
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormulario((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.nuevaUnidad || !formulario.nuevaOficina || !formulario.nuevoResponsable) {
      setMensaje('⚠️ Complete los campos obligatorios antes de aceptar.');
      return;
    }

    setMensaje('✅ Transferencia registrada correctamente.');
  };

  const handleCancel = () => {
    setFormulario({
      unidadActual: '0252 - Nivel Central',
      oficinaActual: '100 DIRECCION',
      responsableActual: 'DR. WALTER AGREDA CO',
      nuevaUnidad: '',
      nuevaOficina: '',
      nuevaResponsable: '',
      auxiliar: ''
    });
    setMensaje('');
  };

  return (
    <div className="transferencia-page">
      <div className="transferencia-window">
        <div className="transferencia-titlebar">
          <div className="transferencia-titlebar-top">
            <span className="title-top-text">TRANSFERENCIA</span>
          </div>
          <div className="transferencia-titlebar-main">
            <span className="title-main-text">TRANSFERENCIA</span>
          </div>
        </div>

        <form className="transferencia-form" onSubmit={handleSubmit}>
          {mensaje && <div className="mensaje">{mensaje}</div>}

          <div className="field-row">
            <label>Unidad Actual</label>
            <input type="text" value={formulario.unidadActual} readOnly />
          </div>

          <div className="field-row">
            <label>Oficina Actual</label>
            <input type="text" value={formulario.oficinaActual} readOnly />
          </div>

          <div className="field-row">
            <label>Responsable Actual</label>
            <input type="text" value={formulario.responsableActual} readOnly />
          </div>

          <div className="field-row">
            <label>Nueva Unidad</label>
            <select id="nuevaUnidad" value={formulario.nuevaUnidad} onChange={handleChange} required>
            <option value=""></option>
              {opcionesUnidades.map((unidad) => (
                <option key={unidad} value={unidad}>{unidad}</option>
              ))}
            </select>
          </div>

          <div className="field-row">
            <label>Nueva Oficina</label>
            <select id="nuevaOficina" value={formulario.nuevaOficina} onChange={handleChange} required>
             <option value=""></option>
              {opcionesOficinas.map((oficina) => (
                <option key={oficina} value={oficina}>{oficina}</option>
              ))}
            </select>
          </div>

          <div className="field-row">
            <label>Nuevo Responsable</label>
            <select id="nuevoResponsable" value={formulario.nuevoResponsable} onChange={handleChange} required>
              <option value=""></option>
              {opcionesResponsables.map((responsable) => (
                <option key={responsable} value={responsable}>{responsable}</option>
              ))}
            </select>
          </div>

          <div className="field-row">
            <label>Auxiliar</label>
            <input
              type="text"
              id="auxiliar"
              value={formulario.auxiliar}
              onChange={handleChange}
              placeholder="Auxiliar"
            />
          </div>

          <div className="buttons-row">
            <button type="submit" className="btn aceptar">Aceptar</button>
            <button type="button" className="btn cancelar" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShowTransferencia;