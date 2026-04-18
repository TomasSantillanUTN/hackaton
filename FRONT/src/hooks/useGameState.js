import { useState, useCallback } from 'react';
import { PROVINCES } from '../data/provinces';

const PLAYERS = [
  { id: 'player', name: 'Vos', color: '#6ec6ff', type: 'human' },
  { id: 'bot1', name: 'Bot 1', color: '#1f4e79', type: 'bot' },
  { id: 'bot2', name: 'Bot 2', color: '#d4a72c', type: 'bot' },
];

const PHASES = ['refuerzo', 'ataque', 'movimiento'];

const INITIAL_GAME_STATE = {
  round: 1,
  currentPhase: 'refuerzo', // 0: refuerzo, 1: ataque, 2: movimiento
  currentPlayerIdx: 0,
  selectedProvince: null,
  secondarySelected: null, // para ataque y movimiento
  reinforcementsUsed: 0, // Refuerzos ya usados en esta fase
  currentEvent: {
    name: 'Inicio del Juego',
    description: 'Comienza la fase de refuerzo',
  },
  message: '',
  gameOver: false,
};

const INITIAL_PROVINCES_STATE = {
  altiplano: { owner: 'player', troops: 5 },
  'gran-chaquena': { owner: 'bot1', troops: 4 },
  'valles-del-norte': { owner: 'player', troops: 3 },
  litoral: { owner: 'bot2', troops: 4 },
  cuyo: { owner: 'player', troops: 3 },
  'pampa-central': { owner: 'bot1', troops: 5 },
  'cordillera-sur': { owner: 'bot2', troops: 3 },
  'costa-atlantica': { owner: 'player', troops: 4 },
  'patagonia-norte': { owner: 'bot1', troops: 2 },
  'patagonia-austral': { owner: 'bot2', troops: 3 },
  'tierra-del-fuego': { owner: 'player', troops: 2 },
};

export function useGameState() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [provincesState, setProvincesState] = useState(INITIAL_PROVINCES_STATE);

  const currentPlayer = PLAYERS[gameState.currentPlayerIdx];

  const selectProvince = useCallback(
    (provinceId) => {
      const province = PROVINCES[provinceId];
      const provinceState = provincesState[provinceId];

      if (!province || !provinceState) return;

      const currentPhase = gameState.currentPhase;

      // Fase de refuerzo
      if (currentPhase === 'refuerzo') {
        if (provinceState.owner === currentPlayer.id) {
          // Es provincia propia
          setGameState((prev) => ({
            ...prev,
            selectedProvince: provinceId,
            message: `Seleccionaste ${province.name}. Presiona "Reforzar" para agregar tropas.`,
          }));
        } else {
          setGameState((prev) => ({
            ...prev,
            message: `No puedes reforzar una provincia enemiga.`,
          }));
        }
        return;
      }

      // Fase de ataque
      if (currentPhase === 'ataque') {
        if (!gameState.selectedProvince) {
          // Primera selección: debe ser propia
          if (provinceState.owner === currentPlayer.id) {
            setGameState((prev) => ({
              ...prev,
              selectedProvince: provinceId,
              message: `Seleccionaste ${province.name} como origen. Ahora selecciona una provincia enemiga vecina para atacar.`,
            }));
          } else {
            setGameState((prev) => ({
              ...prev,
              message: `Debes seleccionar una provincia propia como origen del ataque.`,
            }));
          }
        } else {
          // Segunda selección: debe ser enemiga y vecina
          const originProvince = PROVINCES[gameState.selectedProvince];
          const originState = provincesState[gameState.selectedProvince];

          if (provinceState.owner === currentPlayer.id) {
            setGameState((prev) => ({
              ...prev,
              message: `Debes seleccionar una provincia enemiga.`,
            }));
            return;
          }

          if (!originProvince.neighbors.includes(provinceId)) {
            setGameState((prev) => ({
              ...prev,
              message: `La provincia de destino no es vecina.`,
            }));
            return;
          }

          setGameState((prev) => ({
            ...prev,
            secondarySelected: provinceId,
            message: `Ataque listo: ${originProvince.name} → ${province.name}. Presiona "Atacar" para confirmar.`,
          }));
        }
        return;
      }

      // Fase de movimiento
      if (currentPhase === 'movimiento') {
        if (!gameState.selectedProvince) {
          // Primera selección: debe ser propia
          if (provinceState.owner === currentPlayer.id) {
            setGameState((prev) => ({
              ...prev,
              selectedProvince: provinceId,
              message: `Seleccionaste ${province.name}. Ahora selecciona una provincia propia vecina.`,
            }));
          } else {
            setGameState((prev) => ({
              ...prev,
              message: `Debes seleccionar una provincia propia.`,
            }));
          }
        } else {
          // Segunda selección: debe ser propia y vecina
          const originProvince = PROVINCES[gameState.selectedProvince];
          const originState = provincesState[gameState.selectedProvince];

          if (provinceState.owner !== currentPlayer.id) {
            setGameState((prev) => ({
              ...prev,
              message: `Solo puedes mover a provincias propias.`,
            }));
            return;
          }

          if (!originProvince.neighbors.includes(provinceId)) {
            setGameState((prev) => ({
              ...prev,
              message: `La provincia destino no es vecina.`,
            }));
            return;
          }

          setGameState((prev) => ({
            ...prev,
            secondarySelected: provinceId,
            message: `Movimiento listo: ${originProvince.name} → ${province.name}. Presiona "Mover" para confirmar.`,
          }));
        }
        return;
      }
    },
    [gameState, provincesState, currentPlayer]
  );

  const clearSelection = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      selectedProvince: null,
      secondarySelected: null,
      message: '',
    }));
  }, []);

  const getAvailableReinforcements = useCallback(() => {
    // Calcular tropas disponibles para refuerzo: provincesCount / 2 redondeado hacia arriba
    const myProvinces = Object.values(provincesState).filter(
      (p) => p.owner === currentPlayer.id
    );
    const available = Math.ceil(myProvinces.length / 2);
    
    // Tropas ya usadas en esta fase
    const used = gameState.reinforcementsUsed || 0;
    
    return available - used;
  }, [provincesState, currentPlayer, gameState.reinforcementsUsed]);

  const reinforce = useCallback(() => {
    if (!gameState.selectedProvince) {
      setGameState((prev) => ({
        ...prev,
        message: 'Debes seleccionar una provincia.',
      }));
      return;
    }

    const provinceState = provincesState[gameState.selectedProvince];
    if (provinceState.owner !== currentPlayer.id) {
      setGameState((prev) => ({
        ...prev,
        message: 'Solo puedes reforzar provincias propias.',
      }));
      return;
    }

    // Verificar si tiene refuerzos disponibles
    const available = getAvailableReinforcements();
    if (available <= 0) {
      setGameState((prev) => ({
        ...prev,
        message: 'No tienes refuerzos disponibles para esta fase.',
      }));
      return;
    }

    // Agregar 1 tropa
    setProvincesState((prev) => ({
      ...prev,
      [gameState.selectedProvince]: {
        ...prev[gameState.selectedProvince],
        troops: prev[gameState.selectedProvince].troops + 1,
      },
    }));

    setGameState((prev) => ({
      ...prev,
      reinforcementsUsed: (prev.reinforcementsUsed || 0) + 1,
      message: `Refuerzo agregado. (${available - 1} refuerzos restantes)`,
    }));
  }, [gameState, provincesState, currentPlayer, getAvailableReinforcements]);

  const attack = useCallback(() => {
    if (!gameState.selectedProvince || !gameState.secondarySelected) {
      setGameState((prev) => ({
        ...prev,
        message: 'Debes seleccionar una provincia origen y un objetivo.',
      }));
      return;
    }

    const originState = provincesState[gameState.selectedProvince];
    const targetState = provincesState[gameState.secondarySelected];

    if (originState.troops < 2) {
      setGameState((prev) => ({
        ...prev,
        message: 'Necesitas al menos 2 tropas para atacar.',
      }));
      return;
    }

    // Simulación simple: reductor batalla
    const originTroops = Math.max(1, Math.floor(Math.random() * originState.troops));
    const targetTroops = Math.max(1, Math.floor(Math.random() * targetState.troops));

    let newOwner, newTroops;
    if (originTroops > targetTroops) {
      newOwner = originState.owner;
      newTroops = Math.max(1, originTroops - 1);
      setGameState((prev) => ({
        ...prev,
        message: `¡Ataque exitoso! ${PROVINCES[gameState.selectedProvince].name} conquistó ${PROVINCES[gameState.secondarySelected].name}.`,
      }));
    } else {
      newOwner = targetState.owner;
      newTroops = targetTroops;
      setGameState((prev) => ({
        ...prev,
        message: `Ataque repelido. ${PROVINCES[gameState.secondarySelected].name} se defendió.`,
      }));
    }

    setProvincesState((prev) => ({
      ...prev,
      [gameState.secondarySelected]: {
        owner: newOwner,
        troops: newTroops,
      },
    }));

    clearSelection();
  }, [gameState, provincesState, clearSelection]);

  const moveUnits = useCallback(() => {
    if (!gameState.selectedProvince || !gameState.secondarySelected) {
      setGameState((prev) => ({
        ...prev,
        message: 'Debes seleccionar una provincia origen y destino.',
      }));
      return;
    }

    const originState = provincesState[gameState.selectedProvince];

    if (originState.troops < 2) {
      setGameState((prev) => ({
        ...prev,
        message: 'Necesitas dejar al menos 1 tropa en el origen.',
      }));
      return;
    }

    // Mover la mitad (simplificado)
    const toMove = Math.floor(originState.troops / 2);

    setProvincesState((prev) => ({
      ...prev,
      [gameState.selectedProvince]: {
        ...prev[gameState.selectedProvince],
        troops: originState.troops - toMove,
      },
      [gameState.secondarySelected]: {
        ...prev[gameState.secondarySelected],
        troops: prev[gameState.secondarySelected].troops + toMove,
      },
    }));

    setGameState((prev) => ({
      ...prev,
      message: `${toMove} tropas movidas exitosamente.`,
    }));

    clearSelection();
  }, [gameState, provincesState, clearSelection]);

  const nextPhase = useCallback(() => {
    setGameState((prev) => {
      const nextPhaseIdx = (PHASES.indexOf(prev.currentPhase) + 1) % PHASES.length;
      const nextPhase = PHASES[nextPhaseIdx];

      let nextPlayerIdx = prev.currentPlayerIdx;
      if (nextPhaseIdx === 0) {
        // Volvemos a refuerzo, siguiente jugador
        nextPlayerIdx = (prev.currentPlayerIdx + 1) % PLAYERS.length;
      }

      return {
        ...prev,
        currentPhase: nextPhase,
        currentPlayerIdx: nextPlayerIdx,
        selectedProvince: null,
        secondarySelected: null,
        reinforcementsUsed: 0,  // Resetear refuerzos cuando cambia de fase
        message: `Turno de ${PLAYERS[nextPlayerIdx].name} - Fase: ${nextPhase}`,
        round: nextPhaseIdx === 0 ? prev.round + 1 : prev.round,
      };
    });
  }, []);

  const getValidTargets = useCallback(() => {
    if (!gameState.selectedProvince) return [];

    const phase = gameState.currentPhase;
    const province = PROVINCES[gameState.selectedProvince];

    if (phase === 'ataque') {
      // Provincias enemigas vecinas
      return province.neighbors.filter(
        (neighborId) => provincesState[neighborId].owner !== currentPlayer.id
      );
    }

    if (phase === 'movimiento') {
      // Provincias propias vecinas
      return province.neighbors.filter(
        (neighborId) => provincesState[neighborId].owner === currentPlayer.id
      );
    }

    return [];
  }, [gameState, provincesState, currentPlayer]);

  return {
    gameState,
    provincesState,
    players: PLAYERS,
    currentPlayer,
    selectProvince,
    clearSelection,
    reinforce,
    attack,
    moveUnits,
    nextPhase,
    getValidTargets,
    getAvailableReinforcements,
    canReinforce: gameState.currentPhase === 'refuerzo' && gameState.selectedProvince,
    canAttack: gameState.currentPhase === 'ataque' && gameState.secondarySelected,
    canMove: gameState.currentPhase === 'movimiento' && gameState.secondarySelected,
  };
}
