import { PROVINCES } from '../data/provinces';
import { ProvinceButton } from './ProvinceButton';

// El tablero del mapa con todas las provincias
export function GameBoard({
  provincesState,
  players,
  selectedProvince,
  secondarySelected,
  validTargets,
  onProvinceClick,
}) {
  return (
    <div className="game-board-container">
      <div className="map-header">
        <h1 className="map-title">MAPA DE ARGENTINA</h1>
      </div>
      
      <div className="map-wrapper">
        {/* Imagen del mapa */}
        <img 
          src="/MAPA_DEFINITIVO.png" 
          alt="Mapa de Argentina" 
          className="map-image"
        />
        
        {/* Overlay con provincias */}
        <div className="provinces-overlay">
          {Object.entries(PROVINCES).map(([provinceId, province]) => {
            const provinceState = provincesState[provinceId];
            const playerInfo = players.find((p) => p.id === provinceState.owner);
            const isSelected = selectedProvince === provinceId;
            const isSecondarySelected = secondarySelected === provinceId;
            const isValidTarget = validTargets.includes(provinceId);

            return (
              <ProvinceButton
                key={provinceId}
                province={province}
                owner={playerInfo.name}
                troops={provinceState.troops}
                isSelected={isSelected}
                isSecondarySelected={isSecondarySelected}
                isValidTarget={isValidTarget}
                playerColor={playerInfo.color}
                onClick={() => onProvinceClick(provinceId)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
