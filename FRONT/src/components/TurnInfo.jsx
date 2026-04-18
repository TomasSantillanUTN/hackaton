// Información del turno (ronda, jugador actual, etc)
export function TurnInfo({ round, currentPlayer, players }) {
  return (
    <div className="turn-info">
      <div className="turn-item">
        <span className="turn-label">Ronda:</span>
        <span className="turn-value">{round}</span>
      </div>
      <div className="turn-item">
        <span className="turn-label">Turno de:</span>
        <span className="turn-value" style={{ color: currentPlayer.color }}>
          ● {currentPlayer.name}
        </span>
      </div>
    </div>
  );
}
