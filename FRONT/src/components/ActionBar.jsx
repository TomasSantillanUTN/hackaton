// Barra de botones de acción
export function ActionBar({
  canReinforce,
  canAttack,
  canMove,
  onReinforce,
  onAttack,
  onMove,
  onClearSelection,
  onNextPhase,
  selectedProvince,
}) {
  return (
    <div className="action-bar">
      <div className="action-buttons">
        {selectedProvince && (
          <button 
            className="action-btn action-btn-secondary"
            onClick={onClearSelection}
            title="Limpiar la selección actual"
          >
            ✕ Limpiar
          </button>
        )}
        
        {canReinforce && (
          <button 
            className="action-btn action-btn-primary"
            onClick={onReinforce}
            title="Agregar una tropa a la provincia seleccionada"
          >
            🛡️ Reforzar
          </button>
        )}
        
        {canAttack && (
          <button 
            className="action-btn action-btn-primary"
            onClick={onAttack}
            title="Confirmar el ataque"
          >
            ⚔️ Atacar
          </button>
        )}
        
        {canMove && (
          <button 
            className="action-btn action-btn-primary"
            onClick={onMove}
            title="Mover tropas"
          >
            🚀 Mover
          </button>
        )}
        
        <button 
          className="action-btn action-btn-next"
          onClick={onNextPhase}
          title="Pasar a la siguiente fase"
        >
          → Siguiente fase
        </button>
      </div>
    </div>
  );
}
