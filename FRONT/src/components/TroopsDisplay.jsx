// Componente para mostrar el número de tropas en una provincia
export function TroopsDisplay({ troops }) {
  return (
    <div className="troops-badge">
      <span className="troops-count">{troops}</span>
    </div>
  );
}
