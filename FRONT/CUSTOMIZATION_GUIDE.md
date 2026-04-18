# TEG Argentina - Guía de Extensión y Personalización

Esta guía te muestra cómo extender y personalizar el frontend.

## 🎨 Cambiar Colores

### Colores de Jugadores

En `src/hooks/useGameState.js`:

```javascript
const PLAYERS = [
  { 
    id: 'player', 
    name: 'Vos', 
    color: '#6ec6ff',  // ← Cambiar aquí
    type: 'human' 
  },
  { 
    id: 'bot1', 
    name: 'Bot 1', 
    color: '#1f4e79',  // ← Cambiar aquí
    type: 'bot' 
  },
  { 
    id: 'bot2', 
    name: 'Bot 2', 
    color: '#d4a72c',  // ← Cambiar aquí
    type: 'bot' 
  }
];
```

### Tema del Mapa (Fondo, Acentos)

En `src/App.css`, editar variables `:root`:

```css
:root {
  /* Cambiar estos colores para nuevo tema */
  --bg-primary: #2a2319;       /* Fondo oscuro */
  --bg-secondary: #3d3330;     /* Fondo secundario */
  --bg-tertiary: #4a4238;      /* Fondo terciario */
  
  --text-primary: #e8dcc8;     /* Texto principal */
  --text-secondary: #c9b8a3;   /* Texto secundario */
  --text-accent: #d4a72c;      /* Texto acentuado (dorado) */

  /* Ejemplo: Tema futurista */
  /* 
  --bg-primary: #0a0e27;
  --text-primary: #00ff88;
  --text-accent: #00ffff;
  */
}
```

---

## 📊 Agregar Nueva Provincia

1. **Agregar datos en `src/data/provinces.js`**:

```javascript
export const PROVINCES = {
  // ... provincias existentes ...
  
  'nueva-provincia': {
    id: 'nueva-provincia',
    name: 'Nueva Provincia',
    neighbors: ['altiplano', 'litoral'],  // IDs de vecinos
    x: 40,    // Posición X en % del mapa
    y: 30,    // Posición Y en % del mapa
    width: 12,   // Ancho en % del mapa
    height: 10,  // Alto en % del mapa
  },
};
```

2. **Agregar distribución inicial en `src/hooks/useGameState.js`**:

```javascript
const INITIAL_PROVINCES_STATE = {
  // ... provincias existentes ...
  'nueva-provincia': { owner: 'player', troops: 4 },
};
```

3. **Listo**: La provincia aparecerá en el mapa automáticamente

---

## 🎮 Cambiar Reglas del Juego

### Aumentar Tropas por Refuerzo

En `src/hooks/useGameState.js`, en el método `reinforce`:

```javascript
const reinforce = useCallback(() => {
  // Cambiar de +1 a +2 tropas
  setProvincesState((prev) => ({
    ...prev,
    [gameState.selectedProvince]: {
      ...prev[gameState.selectedProvince],
      troops: prev[gameState.selectedProvince].troops + 2,  // ← Cambiar número
    },
  }));
}, [gameState, provincesState, currentPlayer]);
```

### Cambiar Cantidad de Tropas Mínima para Atacar

En `src/hooks/useGameState.js`, en el método `attack`:

```javascript
const attack = useCallback(() => {
  const originState = provincesState[gameState.selectedProvince];

  if (originState.troops < 3) {  // ← Cambiar de 2 a 3
    setGameState((prev) => ({
      ...prev,
      message: `Necesitas al menos 3 tropas para atacar.`,
    }));
    return;
  }
  // ... resto del código
}, [gameState, provincesState, clearSelection]);
```

### Cambiar Lógica de Batalla

En `src/hooks/useGameState.js`, en el método `attack`:

```javascript
// Simulación actual (aleatoria simple)
const originTroops = Math.max(1, Math.floor(Math.random() * originState.troops));
const targetTroops = Math.max(1, Math.floor(Math.random() * targetState.troops));

// Ejemplo: Victoria si atacante > defensor
if (originTroops > targetTroops) {
  newOwner = originState.owner;
  newTroops = originTroops - targetTroops;  // Tomar el máximo
}
```

### Cambiar Cantidad de Tropas en Movimiento

En `src/hooks/useGameState.js`, en el método `moveUnits`:

```javascript
// Actual: mueve mitad
const toMove = Math.floor(originState.troops / 2);

// Cambiar a: mueve todas menos 1
const toMove = originState.troops - 1;

// O: mueve cantidad fija
const toMove = 3;
```

---

## 🎯 Agregar Nueva Fase de Juego

1. **Actualizar fases en `src/hooks/useGameState.js`**:

```javascript
const PHASES = ['refuerzo', 'ataque', 'movimiento', 'defensa'];  // ← Agregar nueva
```

2. **Agregar lógica en el método `selectProvince`**:

```javascript
// Fase de defensa (ejemplo)
if (currentPhase === 'defensa') {
  // Tu lógica aquí
}
```

3. **Crear nuevo componente si es necesario**:

```javascript
// src/components/DefensePhaseInfo.jsx
export function DefensePhaseInfo({ info }) {
  return <div className="defense-info">{/* UI */}</div>;
}
```

---

## 📝 Agregar Mensajes Dinámicos

En `src/hooks/useGameState.js`, dentro de los métodos:

```javascript
setGameState((prev) => ({
  ...prev,
  message: `Tu mensaje personalizado aquí`,
}));
```

O para eventos especiales, modificar `INITIAL_GAME_STATE`:

```javascript
const INITIAL_GAME_STATE = {
  // ...
  currentEvent: {
    name: 'Terremoto en San Juan',
    description: '-2 tropas en Cuyo',  // ← Evento especial
  },
};
```

---

## 🎨 Agregar Animaciones

### Animación en Provincia Seleccionada

En `src/App.css`:

```css
.province-button.selected {
  /* Agregar animación */
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}
```

### Animación de Batalla

Crear `src/components/BattleAnimation.jsx`:

```javascript
export function BattleAnimation({ origin, target, winner }) {
  return (
    <div className="battle-animation">
      <div className="battle-text">
        {origin} atacó a {target}
      </div>
      <div className="battle-result">
        {winner === origin ? '¡Victoria!' : '¡Derrota!'}
      </div>
    </div>
  );
}
```

Y en CSS:

```css
.battle-animation {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🔊 Agregar Sonidos

### Crear servicio de audio

`src/services/audioService.js`:

```javascript
export const audioService = {
  play(soundName) {
    const sounds = {
      click: new Audio('/sounds/click.mp3'),
      attack: new Audio('/sounds/attack.mp3'),
      victory: new Audio('/sounds/victory.mp3'),
      defeat: new Audio('/sounds/defeat.mp3'),
    };
    
    sounds[soundName]?.play();
  }
};
```

### Usar en acciones

En `src/hooks/useGameState.js`:

```javascript
import { audioService } from '../services/audioService';

const reinforce = useCallback(() => {
  // ...
  audioService.play('click');
}, []);

const attack = useCallback(() => {
  // ...
  if (originTroops > targetTroops) {
    audioService.play('victory');
  } else {
    audioService.play('defeat');
  }
}, []);
```

---

## 🤖 Agregar Lógica de Bots Básica

En `src/hooks/useGameState.js`:

```javascript
const executeBot = useCallback(() => {
  if (currentPlayer.type !== 'bot') return;
  
  // Bot IA simple: ataca provinciaAleatoria
  const myProvinces = Object.entries(provincesState)
    .filter(([_, state]) => state.owner === currentPlayer.id);
  
  if (myProvinces.length === 0) return;
  
  // Lógica de ataque random (muy simple)
  const [originId] = myProvinces[Math.floor(Math.random() * myProvinces.length)];
  const origin = PROVINCES[originId];
  
  const targetId = origin.neighbors.find(
    nId => provincesState[nId].owner !== currentPlayer.id
  );
  
  if (targetId) {
    // Ejecutar ataque del bot
    selectProvince(originId);
    setTimeout(() => {
      selectProvince(targetId);
      setTimeout(() => attack(), 100);
    }, 100);
  }
}, [currentPlayer, provincesState, selectProvince, attack]);
```

---

## 🎪 Agregar Nueva Sección en UI

### Agregar Componente de Estadísticas

`src/components/StatsPanel.jsx`:

```javascript
export function StatsPanel({ players, provincesState }) {
  return (
    <div className="stats-panel">
      {players.map((player) => {
        const ownedProvinces = Object.values(provincesState)
          .filter(p => p.owner === player.id).length;
        
        const totalTroops = Object.values(provincesState)
          .filter(p => p.owner === player.id)
          .reduce((sum, p) => sum + p.troops, 0);
        
        return (
          <div key={player.id} className="player-stats">
            <span>{player.name}</span>
            <span>{ownedProvinces} territorios</span>
            <span>{totalTroops} tropas</span>
          </div>
        );
      })}
    </div>
  );
}
```

### Integrar en App

En `src/App.jsx`:

```javascript
import { StatsPanel } from './components/StatsPanel';

// Dentro del JSX:
<StatsPanel 
  players={players}
  provincesState={provincesState}
/>
```

---

## 🎓 Agregar Tutorial / Help

`src/components/HelpPanel.jsx`:

```javascript
export function HelpPanel({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="help-modal">
      <h2>Cómo Jugar</h2>
      
      <section>
        <h3>Fase Refuerzo 🛡️</h3>
        <p>Click en tu provincia → Reforzar → +1 tropa</p>
      </section>
      
      <section>
        <h3>Fase Ataque ⚔️</h3>
        <p>Click origen → Click enemiga vecina → Atacar</p>
      </section>
      
      <section>
        <h3>Fase Movimiento 🚀</h3>
        <p>Click origen → Click destino propia → Mover</p>
      </section>
      
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}
```

---

## 🎯 Cambiar Nombre del Juego

En `src/App.jsx` y `src/components/TopBar.jsx`:

```javascript
const gameTitle = 'Mi Nombre del Juego';
```

---

## 🌍 Internacionalización (i18n)

Crear `src/i18n/translations.js`:

```javascript
export const translations = {
  es: {
    'phase.reinforce': 'Refuerzo',
    'phase.attack': 'Ataque',
    'phase.movement': 'Movimiento',
    'button.reinforce': 'Reforzar',
    'button.attack': 'Atacar',
    'button.move': 'Mover',
  },
  en: {
    'phase.reinforce': 'Reinforce',
    'phase.attack': 'Attack',
    'phase.movement': 'Movement',
    'button.reinforce': 'Reinforce',
    'button.attack': 'Attack',
    'button.move': 'Move',
  }
};

export function t(key, lang = 'es') {
  return translations[lang][key] || key;
}
```

---

## 🧪 Testing de Nuevas Features

### Test Manual

1. Cambiar valores/colores
2. Recargar página (F5) - Hot reload automático
3. Verificar que no haya console errors (F12)

### Test de Lógica

En `src/hooks/useGameState.js`, agregar logs:

```javascript
const selectProvince = useCallback((provinceId) => {
  console.log('Selected province:', provinceId);
  console.log('Current phase:', gameState.currentPhase);
  console.log('Valid?', /* tu lógica */);
  // ... resto del código
}, []);
```

---

## 📋 Checklist de Extensión

Cuando agregues nueva feature:

- [ ] Agregar estado en `useGameState` si es necesario
- [ ] Agregar componente React si es UI
- [ ] Agregar estilos CSS
- [ ] Actualizar validaciones
- [ ] Agregar mensajes de feedback
- [ ] Testear en navegador (F12 console)
- [ ] Documentar cambios

---

## 🚀 Ejemplos Rápidos

### Ejemplo: Triplicar Tropas Iniciales

```javascript
// En useGameState.js
const INITIAL_PROVINCES_STATE = {
  altiplano: { owner: 'player', troops: 5 * 3 },  // 15
  'gran-chaquena': { owner: 'bot1', troops: 4 * 3 },  // 12
  // ...
};
```

### Ejemplo: Cambiar Nombre de Botón

```javascript
// En ActionBar.jsx
<button onClick={onReinforce}>
  Mi Nuevo Nombre  {/* Cambiar texto */}
</button>
```

### Ejemplo: Agregar Debug Info

```javascript
// En App.jsx
<div style={{ fontSize: '10px', color: '#999' }}>
  Debug: {gameState.selectedProvince} | {gameState.currentPhase}
</div>
```

---

**Listo para personalizar. ¡Diviértete creando!**
