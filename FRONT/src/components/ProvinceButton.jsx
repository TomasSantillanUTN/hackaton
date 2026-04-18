import { TroopsDisplay } from './TroopsDisplay';

// Botón clickeable para cada provincia
export function ProvinceButton({
  province,
  owner,
  troops,
  isSelected,
  isValidTarget,
  isSecondarySelected,
  playerColor,
  onClick,
}) {
  // El hitbox es un círculo centrado en x,y con radio proporcional
  const circleSize = province.radius || 4; // porcentaje
  const styles = {
    left: `${province.x}%`,
    top: `${province.y}%`,
    width: `${circleSize * 2}%`,
    height: `${circleSize * 2}%`,
    '--player-color': playerColor,
  };

  let className = 'province-button';
  if (isSelected) className += ' selected';
  if (isValidTarget) className += ' valid-target';
  if (isSecondarySelected) className += ' secondary-selected';

  return (
    <button
      className={className}
      style={styles}
      onClick={onClick}
      title={`${province.name}: ${troops} tropas (${owner})`}
    >
      <TroopsDisplay troops={troops} color={playerColor} />
    </button>
  );
}
