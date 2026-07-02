import { useState } from "react";
import "../../styles/recursos.css";

function ShowRecursosAdmin() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [gestion, setGestion] = useState(new Date().getFullYear());

  const cerrarGestion = () => {
    setMensaje(
      "Ejecutando: Procesando el cierre del año fiscal y consolidación de Activos Fijos..."
    );
    alert("Se ha iniciado el proceso de Cierre de Gestión.");
  };

  const importarExportar = () => {
    setMensaje(
      "Ejecutando: Conectando con las herramientas de transferencia de datos...\nEsperando archivos .csv o .xls o conexión a la API REST."
    );
  };

  const indicesUFV = () => {
    setMensaje(
      "Ejecutando: Calculando la revalorización de activos fijos basándose en los índices de la UFV actuales..."
    );
  };

  const seguridad = () => {
    setMensaje(
      "Ejecutando: Abriendo el módulo de auditoría, permisos de usuario y roles del sistema."
    );
  };

  const reindexar = () => {
    setMensaje(
      "Ejecutando: Re-organizando los índices de las tablas en la base de datos para optimizar las búsquedas de activos."
    );
    alert("Base de datos re-indexada con éxito.");
  };

  const migrador = () => {
    setMensaje(
      "Ejecutando: Migrador de datos activo. Listo para transferir el histórico de activos fijos antiguos a la nueva estructura."
    );
  };

  const guardarGestion = () => {
    setMensaje(
      `Configuración: La gestión activa fue cambiada a ${gestion}.`
    );
    setMostrarModal(false);
    alert("Cambios guardados.");
  };

  const salir = () => {
    if (
      window.confirm(
        "¿Está seguro de que desea salir de la Administración de Recursos?"
      )
    ) {
      window.location.href = "/";
    }
  };

  return (
    <div className="recursos-page">
      <div className="re-principal">
        <div className="re-header1">
          <h4>SISTEMA DE ACTIVOS FIJOS</h4>
        </div>

        <div className="re-header2">
          <h5>Recursos</h5>
        </div>

        <div className="re-header3">
          <h1>ADMINISTRACIÓN DE RECURSOS</h1>
        </div>

        <div className="re-contenido">
          <div className="re-menu">
            <div className="re-grupo-gestion">
              <button className="vfp-button" onClick={cerrarGestion}>
                Cerrar Gestión
              </button>

              <button
                className="vfp-button"
                onClick={() => setMostrarModal(true)}
              >
                Cambiar Gestión
              </button>
            </div>

            <div className="re-grupo-herramientas">
              <button className="vfp-button" onClick={importarExportar}>
                Importar / Exportar
              </button>

              <button className="vfp-button" onClick={indicesUFV}>
                Índices UFV
              </button>

              <button className="vfp-button" onClick={seguridad}>
                Seguridad
              </button>

              <button className="vfp-button" onClick={reindexar}>
                Re-indexar
              </button>

              <button className="vfp-button" onClick={migrador}>
                Migrador
              </button>
            </div>
          </div>

          <div className="re-panel">
            <div className="re-input-gestion">
              <input
                type="text"
                className="vfp-input-small"
                value={gestion}
                readOnly
              />
            </div>

            <textarea
              className="vfp-textarea"
              rows="12"
              value={mensaje}
              readOnly
            />

            <div className="re-footer">
              <button className="vfp-button-exit" onClick={salir}>
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h2>Cambiar Gestión Activa</h2>

            <p>
              Ingrese el año de la gestión que desea activar para el control de
              activos fijos.
            </p>

            <label>Año Gestión</label>

            <input
              type="number"
              value={gestion}
              onChange={(e) => setGestion(e.target.value)}
            />

            <div className="modal-botones">
              <button onClick={guardarGestion}>
                Guardar
              </button>

              <button onClick={() => setMostrarModal(false)}>
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowRecursosAdmin;