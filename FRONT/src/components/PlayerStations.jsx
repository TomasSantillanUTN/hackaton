import { GameBoard } from './GameBoard';

// Panel izquierdo con información de jugadores y fase
export function PlayerStations({
  players,
  currentPlayer,
  gameState,
  provincesState,
  getAvailableReinforcements,
}) {
  const myProvinces = Object.values(provincesState).filter(
    (p) => p.owner === currentPlayer.id
  );
  
  const totalTroops = myProvinces.reduce((sum, p) => sum + p.troops, 0);
  const progress = Math.min((totalTroops / 50) * 100, 100);

  return (
    <div className="player-stations">
      <div className="stations-header">
        <h2 className="stations-title">Estaciones Jugador</h2>
      </div>

      {/* Info del jugador actual */}
      <div className="station-card current-player">
        <div className="player-label">
          <span className="rank-icon">⚔️</span>
          Jugador 1 ({currentPlayer.name})
        </div>
        
        <div className="player-color-marker" style={{ backgroundColor: currentPlayer.color }}></div>
        
        <div className="player-stat">
          <span className="stat-label">Color:</span>
          <span className="stat-value" style={{ color: currentPlayer.color }}>█ {currentPlayer.name}</span>
        </div>

        <div className="player-stat">
          <span className="stat-label">Tropas:</span>
          <span className="stat-value">{totalTroops}</span>
        </div>

        <div className="player-stat">
          <span className="stat-label">Provincias:</span>
          <span className="stat-value">{myProvinces.length}</span>
        </div>

        {gameState.currentPhase === 'refuerzo' && (
          <div className="player-stat">
            <span className="stat-label">Refuerzos:</span>
            <span className="stat-value reinforcements">
              {getAvailableReinforcements()} disponibles
            </span>
          </div>
        )}

        <div className="troops-bar">
          <div className="troops-progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Botones de dados/acciones - Mostrar según fase */}
      <div className="phase-actions">
        <div className="action-dice">
          <span className="dice-label">🎲</span>
          <span className="dice-value">3</span>
        </div>
        <div className="action-dice">
          <span className="dice-label">🎲</span>
          <span className="dice-value">2</span>
        </div>
      </div>

      {/* Otros jugadores */}
      {players
        .filter((p) => p.id !== currentPlayer.id)
        .map((player, idx) => {
          const playerProvinces = Object.values(provincesState).filter(
            (p) => p.owner === player.id
          );
          const playerTroops = playerProvinces.reduce((sum, p) => sum + p.troops, 0);

          return (
            <div key={player.id} className="station-card other-player">
              <div className="player-label">
                <span className="rank-icon">⚔️</span>
                Jugador {idx + 2} ({player.type === 'bot' ? 'Bot' : player.name})
              </div>

              <div className="player-color-marker" style={{ backgroundColor: player.color }}></div>

              <div className="player-stat">
                <span className="stat-label">Tropas:</span>
                <span className="stat-value">{playerTroops}</span>
              </div>

              <div className="player-stat">
                <span className="stat-label">Provincias:</span>
                <span className="stat-value">{playerProvinces.length}</span>
              </div>

              <div className="troops-bar">
                <div
                  className="troops-progress"
                  style={{ width: `${Math.min((playerTroops / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
