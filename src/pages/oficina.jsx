import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowOficina from "../components/oficina/show";
import '../styles/oficina.css';

function Oficina() {
   const navigate = useNavigate();
   const createEmptyRows = () =>
    Array.from({ length: 11 }, (_, index) => ({
      id: `row-${index + 1}`,
      cod: "",
      responsable: "",
      cargo: "",
      ci: "",
      expedido: "",
      estados: "",
    }));
   const initialRecords = {
    "100 DIRECCION POTOSI": {
      codigo: "2",
      oficina: "100 DIRECCION POTOSI",
      observacion: "",
      data: createEmptyRows(),
    },
   };
   const [officeRecords, setOfficeRecords] = useState(initialRecords);
   const [codigo, setCodigo] = useState("2");
   const [oficina, setOficina] = useState("100 DIRECCION POTOSI");
   const [observacion, setObservacion] = useState("");
   const [data, setData] = useState(createEmptyRows);
   const status = "ACTIVO";
  const [selectedId, setSelectedId] = useState(null);
   const officeOptions = Object.values(officeRecords);

   const copyRows = (rows) => rows.map((row) => ({ ...row }));

   const showPendingAction = (action) => {
    alert(`La opcion ${action} aun no esta implementada.`);
   };

   const handleNew = () => {
    const savedCodes = officeOptions.map((record) => Number(record.codigo));
    const lastSavedCode = savedCodes.length ? Math.max(...savedCodes) : 0;
    const nextCode = Math.max(lastSavedCode, Number(codigo) || 0) + 1;
    setCodigo(Number.isNaN(nextCode) ? "1" : String(nextCode));
    setOficina("");
    setObservacion("");
    setData(createEmptyRows());
    setSelectedId(null);
   };

   const handleSave = () => {
    const officeName = oficina.trim();
    if (!officeName) {
      alert("Ingrese el nombre de la oficina.");
      return;
    }

    setOfficeRecords((prev) => ({
      ...prev,
      [officeName]: {
        codigo,
        oficina: officeName,
        observacion,
        data: copyRows(data),
      },
    }));
    setOficina(officeName);
    alert("Datos guardados.");
   };

    const handleOfficeChange = (event) => {
      const officeName = event.target.value;
      const savedOffice = officeRecords[officeName];

      setOficina(officeName);
      setSelectedId(null);

      if (savedOffice) {
        setCodigo(savedOffice.codigo);
        setObservacion(savedOffice.observacion);
        setData(copyRows(savedOffice.data));
        return;
      }

      setObservacion("");
      setData(createEmptyRows());
    };

    const selectedRow = data.find((r) => r.id === selectedId) || null;

    const handleTableChange = (id, field, value) => {
      setData((prev) =>
        prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
      );
    };

    const handleActivate = () => {
      if (!selectedId) return;
      setData((prev) => prev.map((r) => (r.id === selectedId ? { ...r, estados: "ACTIVO" } : r)));
    };

    const handleInactivate = () => {
      if (!selectedId) return;
      setData((prev) => prev.map((r) => (r.id === selectedId ? { ...r, estados: "INACTIVO" } : r)));
    };

   const handleExit = () => {
    navigate('/');
   };

   return (
    <div className="oficina-window">
        <div className="oficina-system-header">OFICINA</div>
        <div className="oficina-unit-bar">
          <span>UNIDAD: 0022<br />potosi</span>
          <strong>OFICINA</strong>
        </div>

        <div className="oficina-title">OFICINA</div>

        <div className="oficina-body">
            <div className="oficina-form-layout">
                <div className="oficina-form">
                    <label htmlFor="oficina-codigo">Oficina</label>
                    <input id="oficina-codigo" className="oficina-code-input" type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                    <input className="oficina-select" type="text" list="oficina-opciones" placeholder="Escriba la oficina" value={oficina} onChange={handleOfficeChange} />
                    <datalist id="oficina-opciones">
                      {officeOptions.map((record) => (
                        <option key={record.oficina} value={record.oficina} />
                      ))}
                    </datalist>
                    <input className="oficina-status" type="text" value={status} readOnly />

                    <label htmlFor="oficina-observacion">Observacion</label>
                    <textarea id="oficina-observacion" className="oficina-observation" placeholder="NO HAY" value={observacion} onChange={(e) => setObservacion(e.target.value)} />
                </div>

                <div className="oficina-side-actions">
                    <button type="button" onClick={handleNew}>Nuevo</button>
                    <button type="button" className="is-focused" onClick={() => showPendingAction('Modificar')}>Modificar</button>
                    <button type="button" onClick={handleActivate} disabled={!selectedId || (selectedRow && selectedRow.estados === 'ACTIVO')}>Activar</button>
                    <button type="button" onClick={handleInactivate} disabled={!selectedId || (selectedRow && selectedRow.estados !== 'ACTIVO')}>Inactivar</button>
                  </div>
            </div>

            <ShowOficina
              data={data}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
              onChange={handleTableChange}
            />

            <div className="oficina-bottom-bar">
                <div className="oficina-bottom-actions">
                  <button type="button" onClick={handleActivate} disabled={!selectedId || (selectedRow && selectedRow.estados === 'ACTIVO')}>Activar</button>
                  <button type="button" onClick={handleInactivate} disabled={!selectedId || (selectedRow && selectedRow.estados !== 'ACTIVO')}>Inactivar</button>
                  <button type="button" onClick={handleNew}>Nuevo</button>
                  <button type="button" onClick={() => showPendingAction('Modificar')}>Modificar</button>
                  <button type="button" onClick={handleSave}>Guardar</button>
                  <button type="button" disabled>Deshacer</button>
                </div>
                <button type="button" className="oficina-exit-btn" onClick={handleExit}>Salir</button>
            </div>
        </div>
    </div>
  );
}

export default Oficina;
