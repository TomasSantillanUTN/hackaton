// Componente para mostrar el número de tropas en una provincia
export function TroopsDisplay({ troops, color }) {
  return (
    <div className="troops-badge" style={color ? { borderColor: color, boxShadow: `0 0 0 2px ${color}` } : {}}>
      <span className="troops-count">{troops}</span>
    </div>
  );
}
