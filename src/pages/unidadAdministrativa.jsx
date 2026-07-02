import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/unidadAdministrativa.css'

const API_URL = 'https://fuerza-g-grupo-1-2.onrender.com'

function UnidadAdministrativa() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [mode, setMode] = useState('create')
  const [message, setMessage] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [formData, setFormData] = useState({
    unidad: '',
    descrip: '',
    ciudad: '',
    entidad: '',
  })

  const loadUnits = async () => {
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/unidadadmin`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        mode: 'cors',
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setRows(Array.isArray(data) ? data : [])
      setSelectedRow(null)

      if (!Array.isArray(data) || data.length === 0) {
        setMessage('Sin registros')
      }
    } catch (error) {
      console.error(error)
      setRows([])
      setMessage(error.message)
    }
  }

  useEffect(() => {
    loadUnits()
  }, [])

  const handleSelectRow = (row) => {
    setSelectedRow(row)
    setMessage(`Seleccionado: ${row.descrip} — ${row.ciudad}`)
  }

  const openCreateModal = () => {
    setMode('create')
    setFormData({ unidad: '', descrip: '', ciudad: '', entidad: '' })
    setIsFormOpen(true)
  }

  const openEditModal = () => {
    if (!selectedRow) {
      setMessage('Seleccioná una fila primero.')
      return
    }

    setMode('edit')
    setFormData({
      unidad: selectedRow.unidad ?? '',
      descrip: selectedRow.descrip ?? '',
      ciudad: selectedRow.ciudad ?? '',
      entidad: selectedRow.entidad ?? '',
    })
    setIsFormOpen(true)
  }

  const closeFormModal = () => {
    setIsFormOpen(false)
    setFormData({ unidad: '', descrip: '', ciudad: '', entidad: '' })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const saveUnit = async (event) => {
    event.preventDefault()
    const { unidad, descrip, ciudad, entidad } = formData

    if (!unidad || !descrip || !ciudad || !entidad) {
      setMessage('Completá todos los campos.')
      return
    }

    const body = {
      unidad: Number(unidad),
      descrip,
      ciudad,
      entidad: Number(entidad),
    }

    try {
      let response
      if (mode === 'edit') {
        response = await fetch(`${API_URL}/unidadadmin/${unidad}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(body),
        })
      } else {
        response = await fetch(`${API_URL}/unidadadmin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify(body),
        })
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      closeFormModal()
      setMessage(mode === 'edit' ? 'Registro actualizado.' : 'Registro guardado.')
      await loadUnits()
    } catch (error) {
      console.error(error)
      setMessage(`Error al guardar: ${error.message}`)
    }
  }

  const openDeleteModal = () => {
    if (!selectedRow) {
      setMessage('Seleccioná una fila primero.')
      return
    }

    setIsDeleteOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteOpen(false)
  }

  const deleteUnit = async () => {
    if (!selectedRow) return

    try {
      const response = await fetch(`${API_URL}/unidadadmin/${selectedRow.unidad}`, {
        method: 'DELETE',
        mode: 'cors',
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      closeDeleteModal()
      setMessage('Registro eliminado.')
      setSelectedRow(null)
      await loadUnits()
    } catch (error) {
      console.error(error)
      setMessage(`Error al eliminar: ${error.message}`)
      closeDeleteModal()
    }
  }

  const selectUnit = () => {
    if (!selectedRow) {
      setMessage('Hacé click en una fila de la tabla primero.')
      return
    }

    setMessage(`Unidad: ${selectedRow.unidad} | Descripción: ${selectedRow.descrip} | Ciudad: ${selectedRow.ciudad}`)
  }

  const exitPage = () => {
    navigate('/')
  }

  return (
    <>
      <header id="sol-0">SISTEMA DE ACTIVOS FIJOS</header>
      <div className="sol-1">
        <p id="sol-2">Unidad Administrativa</p>
        <h1 id="sol-3">ADMINISTRACION UNIDAD ADMINISTRATIVA</h1>

        <div className="gato-1">
          <table id="gato-2">
            <thead>
              <tr>
                <th id="gato-3">UNIDAD</th>
                <th id="gato-4">DESCRIPCION</th>
                <th id="gato-5">CIUDAD</th>
              </tr>
            </thead>
            <tbody id="seiya">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                    {message || 'Sin registros'}
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.unidad}
                    className={selectedRow?.unidad === row.unidad ? 'seleccionado' : ''}
                    onClick={() => handleSelectRow(row)}
                  >
                    <td>{row.unidad ?? '-'}</td>
                    <td>{row.descrip ?? '-'}</td>
                    <td>{row.ciudad ?? '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p id="mensaje-estado">{message}</p>

        <div className="boton-miu">
          <button id="boton1-miu" type="button" onClick={openCreateModal}>Nuevo</button>
          <button id="boton2-miu" type="button" onClick={openEditModal}>Editar</button>
          <button id="boton3-miu" type="button" onClick={openDeleteModal}>Eliminar</button>
          <button id="boton4-miu" type="button" onClick={selectUnit}>Seleccionar</button>
          <button id="boton5-miu" type="button" onClick={exitPage}>Salir</button>
        </div>
      </div>

      <div className={`modal-overlay ${isFormOpen ? 'activo' : ''}`} id="modal-form">
        <div className="modal-caja">
          <div className="modal-titulo" id="modal-titulo-texto">
            {mode === 'edit' ? 'Editar Unidad Administrativa' : 'Nueva Unidad Administrativa'}
          </div>
          <form className="modal-cuerpo" onSubmit={saveUnit}>
            <div>
              <label htmlFor="input-unidad">Unidad:</label>
              <input
                id="input-unidad"
                name="unidad"
                type="number"
                value={formData.unidad}
                onChange={handleInputChange}
                disabled={mode === 'edit'}
                placeholder="Ej: 1"
              />
            </div>
            <div>
              <label htmlFor="input-descrip">Descripción:</label>
              <input
                id="input-descrip"
                name="descrip"
                type="text"
                value={formData.descrip}
                onChange={handleInputChange}
                placeholder="Ej: GACETA OFICIAL DE BOLIVIA"
              />
            </div>
            <div>
              <label htmlFor="input-ciudad">Ciudad:</label>
              <input
                id="input-ciudad"
                name="ciudad"
                type="text"
                value={formData.ciudad}
                onChange={handleInputChange}
                placeholder="Ej: LAPAZ"
              />
            </div>
            <div>
              <label htmlFor="input-entidad">Entidad:</label>
              <input
                id="input-entidad"
                name="entidad"
                type="number"
                value={formData.entidad}
                onChange={handleInputChange}
                placeholder="Ej: 12"
              />
            </div>
            <div className="modal-pie">
              <button type="button" onClick={closeFormModal}>Cancelar</button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>

      <div className={`modal-overlay ${isDeleteOpen ? 'activo' : ''}`} id="modal-eliminar">
        <div className="modal-caja">
          <div className="modal-titulo">Confirmar Eliminación</div>
          <div className="modal-cuerpo">
            <p id="texto-eliminar" style={{ color: '#022644', fontSize: '14px' }}>
              {selectedRow
                ? `¿Seguro que querés eliminar la unidad "${selectedRow.descrip}" (${selectedRow.ciudad})?`
                : 'Seleccione una unidad para eliminar.'}
            </p>
          </div>
          <div className="modal-pie">
            <button type="button" onClick={closeDeleteModal}>Cancelar</button>
            <button type="button" onClick={deleteUnit}>Eliminar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UnidadAdministrativa
