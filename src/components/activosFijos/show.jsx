import { useState } from 'react';
import '../../styles/activosFijos.css';

const API_URL = 'https://fuerza-g-grupo-1-2.onrender.com';

const initialFormState = {
  codigo: '',
  codigoAdi: '',
  descripcion: '',
  grupo: '',
  auxiliar: '',
  oficina: '',
  responsable: '',
  inc_dia: '',
  inc_mes: '',
  inc_anio: '',
};

function ActivosFijosShow() {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dia = formData.inc_dia.padStart(2, '0');
    const mes = formData.inc_mes.padStart(2, '0');
    const anio = formData.inc_anio;
    const fechaIncorporacion = `${anio}-${mes}-${dia}`;

    const activoPayload = {
      codigo: formData.codigo,
      codigoAdi: formData.codigoAdi,
      descripcion: formData.descripcion,
      grupo: formData.grupo,
      auxiliar: formData.auxiliar,
      oficina: formData.oficina,
      responsable: formData.responsable,
      fechaIncorporacion,
    };

    try {
      const response = await fetch(`${API_URL}/api/activos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(activoPayload),
      });

      if (response.ok) {
        const data = await response.json();
        alert('¡Activo Fijo guardado!');
        console.log('Respuesta del servidor:', data);
        setFormData(initialFormState);
      } else {
        const errText = await response.text();
        alert(`Error en el servidor (${response.status}): ${errText}`);
      }
    } catch (error) {
      console.error('Error de red/conexión:', error);
      alert('Error de conexión: No se pudo conectar con el servidor de la API.');
    }
  };

  const handleClear = () => {
    if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario?')) {
      setFormData(initialFormState);
    }
  };

  return (
    <div className="activos-fijos-page">
      <div className="container">
        <div className="header">ADMINISTRACIÓN DE ACTIVOS FIJOS</div>

        <div className="banner">
          <div className="unidad-info">UNIDAD: 025 &nbsp;&nbsp;&nbsp;&nbsp; GACETA OFICIAL DE BOLIVIA</div>
          <div className="titulo-seccion">ACTIVOS FIJOS</div>
        </div>

        <form id="activoFijoForm" className="form-container" onSubmit={handleSubmit}>
          <div className="main-layout">
            <div className="fields-side">
              <div className="form-row row-split">
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <span className="label">Código:</span>
                  <input
                    type="text"
                    id="codigo"
                    className="input-field"
                    style={{ maxWidth: '180px' }}
                    placeholder="Ej. GOB030219001"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="incorporacion-container">
                  <span>INCORP:</span>
                  <input
                    type="text"
                    id="inc_dia"
                    className="date-input"
                    placeholder="DD"
                    maxLength="2"
                    value={formData.inc_dia}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    id="inc_mes"
                    className="date-input"
                    placeholder="MM"
                    maxLength="2"
                    value={formData.inc_mes}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    id="inc_anio"
                    className="date-input year"
                    placeholder="AAAA"
                    maxLength="4"
                    value={formData.inc_anio}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <span className="label">Código ADI:</span>
                <input
                  type="text"
                  id="codigoAdi"
                  className="input-field"
                  style={{ maxWidth: '180px' }}
                  placeholder="Ingrese código ADI"
                  value={formData.codigoAdi}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <span className="label">Descripción:</span>
                <input
                  type="text"
                  id="descripcion"
                  className="input-field"
                  placeholder="Ingrese la descripción detallada del activo"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <span className="label">Grupo:</span>
                <select id="grupo" className="input-field" value={formData.grupo} onChange={handleChange} required>
                  <option value="" disabled hidden>Seleccione un grupo...</option>
                  <option value="MUEBLES Y ENSERES DE OFICINA">MUEBLES Y ENSERES DE OFICINA</option>
                  <option value="EQUIPO DE COMPUTACIÓN">EQUIPO DE COMPUTACIÓN</option>
                  <option value="VEHÍCULOS GENERALES">VEHÍCULOS GENERALES</option>
                  <option value="MAQUINARIA Y EQUIPO">MAQUINARIA Y EQUIPO</option>
                </select>
              </div>

              <div className="form-row">
                <span className="label">Auxiliar:</span>
                <select id="auxiliar" className="input-field" value={formData.auxiliar} onChange={handleChange} required>
                  <option value="" disabled hidden>Seleccione un auxiliar...</option>
                  <option value="FOTOCOPIADORAS">FOTOCOPIADORAS</option>
                  <option value="ESCRITORIOS">ESCRITORIOS</option>
                  <option value="COMPUTADORAS">COMPUTADORAS</option>
                </select>
              </div>

              <div className="form-row">
                <span className="label">Oficina:</span>
                <select id="oficina" className="input-field" value={formData.oficina} onChange={handleChange} required>
                  <option value="" disabled hidden>Seleccione la oficina...</option>
                  <option value="CONTABILIDAD">CONTABILIDAD</option>
                  <option value="SISTEMAS">SISTEMAS</option>
                  <option value="RECURSOS HUMANOS">RECURSOS HUMANOS</option>
                </select>
              </div>

              <div className="form-row">
                <span className="label">Responsable:</span>
                <select id="responsable" className="input-field" value={formData.responsable} onChange={handleChange} required>
                  <option value="" disabled hidden>Seleccione el responsable...</option>
                  <option value="NILIA TANCARA DE MEJIA">NILIA TANCARA DE MEJIA</option>
                  <option value="JUAN PEREZ GOMEZ">JUAN PEREZ GOMEZ</option>
                </select>
              </div>
            </div>
          </div>

          <div className="footer-buttons">
            <button type="button" className="btn" onClick={handleClear}>Limpiar</button>
            <button type="submit" className="btn btn-submit">Guardar Activo</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivosFijosShow;
