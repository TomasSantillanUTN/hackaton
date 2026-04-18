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
  const styles = {
    left: `${province.x}%`,
    top: `${province.y}%`,
    width: `${province.width}%`,
    height: `${province.height}%`,
    backgroundColor: playerColor,
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
      <div className="province-info">
        <div className="province-name">{province.name}</div>
        <TroopsDisplay troops={troops} />
      </div>
    </button>
  );
}
