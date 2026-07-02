function ShowOficina({
  data = [],
  selectedId = null,
  onSelect = () => {},
  onChange = () => {},
}) {
  const renderCellInput = (item, field, label) => (
    <input
      aria-label={`${label} ${item.cod}`}
      value={item[field] || ""}
      onChange={(event) => onChange(item.id, field, event.target.value)}
      onFocus={() => onSelect(item.id)}
    />
  );

  return (
    <>
      <div className="oficina-table-wrap">
        <table className="data-grid">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>Cod.</th>
              <th style={{ width: '34%' }}>Responsable</th>
              <th style={{ width: '27%' }}>Cargo</th>
              <th style={{ width: '12%' }}>CI</th>
              <th style={{ width: '9%' }}>Expedido</th>
              <th style={{ width: '13%' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
                <tr
                  key={item.id}
                  className={`active-row ${selectedId === item.id ? 'is-selected' : ''}`}
                  onClick={() => onSelect(item.id)}
                >
                  <td>{renderCellInput(item, "cod", "Codigo")}</td>
                  <td>{renderCellInput(item, "responsable", "Responsable")}</td>
                  <td>{renderCellInput(item, "cargo", "Cargo")}</td>
                  <td>{renderCellInput(item, "ci", "CI")}</td>
                  <td>{renderCellInput(item, "expedido", "Expedido")}</td>
                  <td>{renderCellInput(item, "estados", "Estado")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowOficina;
