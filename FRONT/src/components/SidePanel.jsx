// Panel derecho con evento, log de juego y controles
export function SidePanel({
  currentEvent,
  message,
  gameLog,
  canReinforce,
  canAttack,
  canMove,
  onReinforce,
  onAttack,
  onMove,
  onNextPhase,
  onClearSelection,
  selectedProvince,
  currentPhase,
}) {
  return (
    <div className="side-panel">
      {/* Evento Activo */}
      <div className="panel-section event-section">
        <h3 className="section-title">⚡ Evento Activo</h3>
        <div className="event-box">
          <div className="event-name">{currentEvent.name}</div>
          <div className="event-description">{currentEvent.description}</div>
        </div>
      </div>

      {/* Log de Juego */}
      <div className="panel-section log-section">
        <h3 className="section-title">📋 Log de Juego</h3>
        <div className="game-log">
          {gameLog && gameLog.length > 0 ? (
            gameLog.map((log, idx) => (
              <div key={idx} className="log-entry">
                {log}
              </div>
            ))
          ) : (
            <div className="log-entry empty">
              El juego comienza...
            </div>
          )}
        </div>
      </div>

      {/* Mensaje Dinámico */}
      {message && (
        <div className="panel-section message-section">
          <div className="message-box">
            {message}
          </div>
        </div>
      )}

      {/* Controles por Fase */}
      <div className="panel-section controls-section">
        <h3 className="section-title">Fase: {currentPhase}</h3>

        <div className="controls-grid">
          {currentPhase === 'refuerzo' && (
            <button
              className="control-btn control-btn-primary"
              onClick={onReinforce}
              disabled={!canReinforce}
            >
              <span className="btn-icon">➕</span>
              <span className="btn-text">Reforzar</span>
            </button>
          )}

          {currentPhase === 'ataque' && (
            <>
              <button
                className="control-btn control-btn-primary"
                onClick={onAttack}
                disabled={!canAttack}
              >
                <span className="btn-icon">⚔️</span>
                <span className="btn-text">Atacar</span>
              </button>
            </>
          )}

          {currentPhase === 'movimiento' && (
            <>
              <button
                className="control-btn control-btn-primary"
                onClick={onMove}
                disabled={!canMove}
              >
                <span className="btn-icon">🚀</span>
                <span className="btn-text">Mover</span>
              </button>
            </>
          )}

          {selectedProvince && (
            <button
              className="control-btn control-btn-secondary"
              onClick={onClearSelection}
            >
              <span className="btn-icon">✕</span>
              <span className="btn-text">Limpiar</span>
            </button>
          )}

          <button
            className="control-btn control-btn-next"
            onClick={onNextPhase}
          >
            <span className="btn-icon">→</span>
            <span className="btn-text">Terminar turno</span>
          </button>
        </div>
      </div>
    </div>
  );
}
