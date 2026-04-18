import { useGameState } from './hooks/useGameState';
import { PlayerStations } from './components/PlayerStations';
import { GameBoard } from './components/GameBoard';
import { SidePanel } from './components/SidePanel';
import './App.css';

export default function App() {
  const {
    gameState,
    provincesState,
    players,
    currentPlayer,
    selectProvince,
    clearSelection,
    reinforce,
    attack,
    moveUnits,
    nextPhase,
    getValidTargets,
    getAvailableReinforcements,
    canReinforce,
    canAttack,
    canMove,
  } = useGameState();

  const validTargets = getValidTargets();

  // Simulación de log de juego (en real sería desde estado/backend)
  const gameLog = [
    '🟢 Jugador 1 conquistó Cuyo',
    '🔵 Bot reforzó Litoral',
    '❌ Ataque fallido en Pampa Central',
  ];

  return (
    <div className="app-container">
      {/* Panel Izquierdo */}
      <aside className="left-panel">
        <PlayerStations
          players={players}
          currentPlayer={currentPlayer}
          gameState={gameState}
          provincesState={provincesState}
          getAvailableReinforcements={getAvailableReinforcements}
        />
      </aside>

      {/* Panel Central */}
      <main className="center-panel">
        <GameBoard
          provincesState={provincesState}
          players={players}
          selectedProvince={gameState.selectedProvince}
          secondarySelected={gameState.secondarySelected}
          validTargets={validTargets}
          onProvinceClick={selectProvince}
        />
      </main>

      {/* Panel Derecho */}
      <aside className="right-panel">
        <SidePanel
          currentEvent={gameState.currentEvent}
          message={gameState.message}
          gameLog={gameLog}
          canReinforce={canReinforce}
          canAttack={canAttack}
          canMove={canMove}
          onReinforce={reinforce}
          onAttack={attack}
          onMove={moveUnits}
          onNextPhase={nextPhase}
          onClearSelection={clearSelection}
          selectedProvince={gameState.selectedProvince}
          currentPhase={gameState.currentPhase}
        />
      </aside>
    </div>
  );
}
