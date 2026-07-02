import React, { useState } from 'react';
import styles from '../styles/grupo-contable.module.css'; 

const GrupoContable = () => {
  const [datos, setDatos] = useState({
    grupo: '',
    vidaUtil: '',
    observaciones: '',
    deprecia: false,
    actualiza: false
  });

  return (
    <div className={styles.windowContainer}>
      <header className={styles.header}>GRUPOS CONTABLES</header>

      <div className={styles.subHeader}>
        <div>UNIDAD: UFV 2026</div>
      </div>

      <div className={styles.mainTitle}>GRUPO CONTABLE</div>

      <main className={styles.mainContent}>
        <div className={styles.formContainer}>
          <div className={styles.leftInputs}>
            <div>Grupo</div>
            <input type="text" className={styles.centerText} value={datos.grupo} readOnly />

            <div>Vida Util</div>
            <input type="text" className={styles.centerText} value={datos.vidaUtil} readOnly />
          </div>

          <div className={styles.rightInputs}>
            <div>Nombre</div>
            <select className={styles.selectField}></select>

            <div style={{ paddingTop: '5px' }}>Observaciones</div>
            <textarea className={styles.textArea} value={datos.observaciones} readOnly></textarea>

            <div className={styles.checkboxContainer}>
              <div className={styles.checkboxItem}>
                <label htmlFor="chk-deprecia">Deprecia</label>
                <input type="checkbox" id="chk-deprecia" checked={datos.deprecia} disabled />
              </div>
              <div className={styles.checkboxItem}>
                <label htmlFor="chk-actualiza">Actualiza</label>
                <input type="checkbox" id="chk-actualiza" checked={datos.actualiza} disabled />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableScroll}>
            <table className={styles.tableStyle}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderCell}>CODIGO</th>
                  <th className={styles.tableHeaderCell}>NOMBRE AUXILIAR</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>

        <div className={styles.buttonBar}>
          <button className={styles.btn}>Nuevo</button>
          <button className={styles.btn}>Modificar</button>
          <button className={`${styles.btn} ${styles.disabled}`} disabled>Guardar</button>
          <button className={styles.btn}>Eliminar</button>
          <button className={`${styles.btn} ${styles.disabled}`} disabled>Deshacer</button>
          <button className={styles.btn}>Salir</button>
        </div>
      </main>
    </div>
  );
};

export default GrupoContable;