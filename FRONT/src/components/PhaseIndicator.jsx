// Indicador de fase actual
export function PhaseIndicator({ phase }) {
  const phaseNames = {
    refuerzo: '🛡️ Refuerzo',
    ataque: '⚔️ Ataque',
    movimiento: '🚀 Movimiento',
  };

  return (
    <div className="phase-indicator">
      <span className="phase-label">Fase:</span>
      <span className="phase-name">{phaseNames[phase] || phase}</span>
    </div>
  );
}
