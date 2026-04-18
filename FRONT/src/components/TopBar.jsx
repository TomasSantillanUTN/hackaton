import { TurnInfo } from './TurnInfo';
import { PhaseIndicator } from './PhaseIndicator';

// Barra superior con información del juego
export function TopBar({ gameState, currentPlayer, players }) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h1 className="game-title">TEG Argentina</h1>
      </div>
      <div className="top-bar-center">
        <TurnInfo 
          round={gameState.round} 
          currentPlayer={currentPlayer}
          players={players}
        />
        <PhaseIndicator phase={gameState.currentPhase} />
      </div>
      <div className="top-bar-right">
        <div className="player-colors">
          {players.map((player) => (
            <div key={player.id} className="player-color-item">
              <span 
                className="player-color-dot" 
                style={{ backgroundColor: player.color }}
              />
              <span className="player-color-name">{player.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
