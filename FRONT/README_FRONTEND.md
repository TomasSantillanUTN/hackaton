# TEG Argentina - Frontend React

## 🎮 Resumen

Frontend interactivo para un juego de conquista territorial por turnos, ambientado en Argentina.

### Características

- **Mapa visual centrado**: 11 provincias argentinas clickeables
- **Sistema de fases**: Refuerzo → Ataque → Movimiento
- **3 jugadores**: 1 humano + 2 bots controlados por IA
- **Interacción directa sobre mapa**: Click para seleccionar, acciones con botones
- **Estética vintage/pergamino**: Colores terrosos, sensación de tablero histórico
- **UI limpia**: Sin paneles excesivos, información clara
- **Responsive**: Adaptable a diferentes tamaños de pantalla

---

## 📁 Estructura del Proyecto

```
FRONT/src/
├── components/
│   ├── ActionBar.jsx          # Botones de acción (Reforzar, Atacar, Mover, etc)
│   ├── EventBanner.jsx        # Banner de eventos y mensajes
│   ├── GameBoard.jsx          # Mapa principal con provincias
│   ├── PhaseIndicator.jsx     # Indicador de fase actual
│   ├── ProvinceButton.jsx     # Botón clickeable de cada provincia
│   ├── TopBar.jsx             # Barra superior (título, ronda, jugador)
│   ├── TroopsDisplay.jsx      # Badge de cantidad de tropas
│   └── TurnInfo.jsx           # Info de ronda y jugador actual
├── data/
│   └── provinces.js           # Datos de provincias (coords, vecinos)
├── hooks/
│   └── useGameState.js        # Lógica completa del juego
├── App.jsx                    # Componente principal
├── App.css                    # Estilos (vintage/pergamino)
├── index.css                  # Reset y estilos globales
└── main.jsx                   # Punto de entrada

```

---

## 🎯 Cómo Jugar (MVP)

### Fase: Refuerzo 🛡️

1. **Click en una provincia propia** (celeste)
2. Se selecciona (brillo blanco)
3. Presiona **"Reforzar"** → +1 tropa
4. Repite o pasa a siguiente fase

### Fase: Ataque ⚔️

1. **Primer click**: Selecciona provincia origen (propia)
2. **Segundo click**: Selecciona provincia destino (enemiga **vecina**)
3. Se destaca como "target válido" (borde dorado punteado)
4. Presiona **"Atacar"** → simula batalla
   - Si ganas: conquistas la provincia
   - Si pierdes: defensa rechaza el ataque

### Fase: Movimiento 🚀

1. **Primer click**: Selecciona provincia origen (propia con ≥2 tropas)
2. **Segundo click**: Selecciona provincia destino (propia **vecina**)
3. Presiona **"Mover"** → mueve mitad de las tropas

### Fin del Turno

- Presiona **"→ Siguiente fase"** para pasar a la siguiente fase
- Después de Movimiento → vuelve a Refuerzo con siguiente jugador

---

## 🎨 Esquema de Colores

### Jugadores
- **Jugador (Vos)**: `#6ec6ff` - Celeste argentino
- **Bot 1**: `#1f4e79` - Azul oscuro
- **Bot 2**: `#d4a72c` - Dorado (Sol de Mayo)

### Fondo / Tema
- **Fondo**: Marrón oscuro vintage (`#2a2319`)
- **Acentos**: Dorado (`#d4a72c`)
- **Texto**: Crema (`#e8dcc8`)

### Estados Visuales de Provincias

| Estado | Apariencia |
|--------|-----------|
| Normal | Semitransparente (0.4 alpha) |
| Hover | Brillo celeste (0.6 alpha) + escala 1.05 |
| Seleccionada | Brillo fuerte + borde blanco + glow |
| Target válido | Borde punteado dorado + glow |
| Secundaria | Fondo dorado sólido + borde dorado |

---

## 🔧 Provincias Argentinas

```
1. Altiplano               → vecinos: [Gran Chaqueña, Valles del Norte, Cuyo]
2. Gran Chaqueña           → vecinos: [Altiplano, Valles del Norte, Litoral, Cuyo]
3. Valles del Norte        → vecinos: [Altiplano, Gran Chaqueña, Litoral]
4. Litoral                 → vecinos: [Gran Chaqueña, Valles del Norte, Pampa Central, Costa Atlántica]
5. Cuyo                    → vecinos: [Altiplano, Gran Chaqueña, Pampa Central, Cordillera Sur]
6. Pampa Central           → vecinos: [Gran Chaqueña, Litoral, Cuyo, Costa Atlántica]
7. Cordillera Sur          → vecinos: [Cuyo, Pampa Central, Patagonia Norte]
8. Costa Atlántica         → vecinos: [Litoral, Pampa Central, Patagonia Norte]
9. Patagonia Norte         → vecinos: [Cordillera Sur, Costa Atlántica, Patagonia Austral]
10. Patagonia Austral      → vecinos: [Patagonia Norte, Tierra del Fuego]
11. Tierra del Fuego       → vecinos: [Patagonia Austral]
```

---

## 💾 Estado Mockeado Inicial

```javascript
// En src/hooks/useGameState.js

const INITIAL_PROVINCES_STATE = {
  altiplano: { owner: 'player', troops: 5 },
  'gran-chaquena': { owner: 'bot1', troops: 4 },
  'valles-del-norte': { owner: 'player', troops: 3 },
  litoral: { owner: 'bot2', troops: 4 },
  // ... etc
};

const PLAYERS = [
  { id: 'player', name: 'Vos', color: '#6ec6ff', type: 'human' },
  { id: 'bot1', name: 'Bot 1', color: '#1f4e79', type: 'bot' },
  { id: 'bot2', name: 'Bot 2', color: '#d4a72c', type: 'bot' },
];
```

---

## 🚀 Desarrollo Local

### Iniciar servidor
```bash
cd FRONT
npm run dev
```

Abrirá automáticamente en `http://localhost:5173`

### Build para producción
```bash
npm run build
```

### Lint
```bash
npm lint
```

---

## 📡 Integración con Backend

El frontend está **completamente desacoplado** y listo para conectar con un backend real.

### Próximos Pasos para Conectar Backend

1. **Reemplazar estado mockeado** en `useGameState.js` con llamadas a API:
   ```javascript
   // Ejemplo:
   const [gameState, setGameState] = useState(null);
   
   useEffect(() => {
     fetch('/api/game/state')
       .then(res => res.json())
       .then(data => setGameState(data));
   }, []);
   ```

2. **Mapear acciones a endpoints**:
   - `reinforce()` → `POST /api/game/reinforce`
   - `attack()` → `POST /api/game/attack`
   - `moveUnits()` → `POST /api/game/move`
   - `nextPhase()` → `POST /api/game/next-phase`

3. **Usar socket.io para actualizaciones en tiempo real** (opcional):
   ```javascript
   import io from 'socket.io-client';
   const socket = io('http://localhost:3000');
   socket.on('gameStateUpdated', (newState) => setGameState(newState));
   ```

---

## 🎮 Estructura de Datos (Interface)

### GameState
```typescript
{
  round: number;
  currentPhase: 'refuerzo' | 'ataque' | 'movimiento';
  currentPlayerIdx: number;
  selectedProvince: string | null;
  secondarySelected: string | null;
  currentEvent: { name: string; description: string };
  message: string;
  gameOver: boolean;
}
```

### ProvincesState
```typescript
{
  [provinceId: string]: {
    owner: 'player' | 'bot1' | 'bot2';
    troops: number;
  }
}
```

---

## ⚙️ Componentes Key

### `useGameState` Hook

**Responsabilidades:**
- Manejo de estado global del juego
- Validación de acciones por fase
- Simulación de batallas
- Cálculo de targets válidos

**Métodos principales:**
```javascript
selectProvince(provinceId)      // Selecciona o desselecciona
clearSelection()                 // Limpia ambas selecciones
reinforce()                      // Agrega tropa
attack()                         // Ataca y conquista
moveUnits()                      // Mueve tropas
nextPhase()                      // Pasa a siguiente fase
getValidTargets()                // Devuelve provincias válidas
```

### `GameBoard` Component

Renderiza:
- Fondo del mapa (gradiente vintage)
- Textura de pergamino
- Overlay de provincias
- `ProvinceButton` para cada provincia

---

## 🐛 Validaciones Implementadas

✅ No reforzar provincias enemigas  
✅ Ataque solo a provincias enemigas vecinas  
✅ Movimiento solo a provincias propias vecinas  
✅ Necesitar ≥2 tropas para atacar  
✅ Mostrar mensajes claros de error  
✅ Resaltar targets válidos cuando hay origen seleccionado  

---

## 📱 Responsive Design

- Desktop (1024px+): Layout completo con gap espacioso
- Tablet (768-1024px): Compactado, top-bar en columnas
- Mobile (<768px): Stack vertical, botones más pequeños

---

## 🎨 CSS Architecture

```css
:root {
  /* Colores */
  /* Sombras */
  /* Transiciones */
}

/* Reset */
/* App Layout */
/* TopBar & Info */
/* EventBanner */
/* GameBoard & Provinces */
/* ActionBar & Buttons */
/* Responsive */
```

Usando **CSS custom properties** para fácil personalización de tema.

---

## 🔮 Funcionalidades Futuras

- [ ] Bots con IA de estrategia
- [ ] Sistema de eventos especiales (bonificación de tropas, terremotos, etc)
- [ ] Animaciones de batalla detalladas
- [ ] Chat entre jugadores
- [ ] Replay de turnos
- [ ] Estadísticas de juego (territorios conquistados, tropas perdidas, etc)
- [ ] Modo campaña / ranked
- [ ] Avatares de jugadores
- [ ] Efectos de sonido
- [ ] Modo oscuro/claro toggle

---

## 📝 Notas Técnicas

- **No librerías externas complejas**: Solo React + CSS puro
- **Hooks funcionales**: Todo es hook-based, sin clases
- **State management simple**: Un solo hook centralizado (`useGameState`)
- **Separación de concerns**: Componentes de presentación + lógica aislada
- **Performance**: Re-renders optimizados con `useCallback`
- **Accesibilidad**: Títulos en botones, colores distinguibles

---

## 🤝 Contribuir

Para agregar funcionalidades:

1. **Nueva acción de juego**: Agregar lógica en `useGameState.js`
2. **Nuevo componente visual**: Crear archivo en `components/`
3. **Nuevas provincias**: Actualizar `data/provinces.js`
4. **Cambio de estilos**: Editar `App.css` (variables en `:root`)

---

## 📄 Licencia

Proyecto personal - Hackathon

---

**Estado**: ✅ MVP Jugable | 🎮 Listo para Extensiones
