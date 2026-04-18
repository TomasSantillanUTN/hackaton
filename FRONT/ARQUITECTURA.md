# 📦 Estructura Completa del Frontend

## 📂 Árbol de Archivos Creados/Modificados

```
FRONT/
├── src/
│   ├── components/                 # ✅ Componentes React
│   │   ├── ActionBar.jsx          # Botones de acción
│   │   ├── EventBanner.jsx        # Banner de eventos
│   │   ├── GameBoard.jsx          # Mapa principal
│   │   ├── PhaseIndicator.jsx     # Indicador de fase
│   │   ├── ProvinceButton.jsx     # Botón de provincia
│   │   ├── TopBar.jsx             # Barra superior
│   │   ├── TroopsDisplay.jsx      # Badge de tropas
│   │   └── TurnInfo.jsx           # Info de turno
│   │
│   ├── data/                       # ✅ Datos del juego
│   │   └── provinces.js           # Datos de 11 provincias
│   │
│   ├── hooks/                      # ✅ Custom Hooks
│   │   └── useGameState.js        # Lógica completa del juego
│   │
│   ├── App.jsx                     # ✅ MODIFICADO - Componente principal
│   ├── App.css                     # ✅ MODIFICADO - Estilos vintage
│   ├── index.css                   # ✅ MODIFICADO - Reset CSS
│   └── main.jsx                    # ✅ Punto de entrada (sin cambios)
│
├── README_FRONTEND.md              # ✅ Documentación principal
├── INTEGRATION_GUIDE.md            # ✅ Guía de integración backend
├── CUSTOMIZATION_GUIDE.md          # ✅ Guía de extensión
├── package.json                    # (sin cambios)
├── vite.config.js                  # (sin cambios)
└── index.html                      # (sin cambios)
```

---

## ✨ Líneas de Código Creadas

```
components/
  └── 8 archivos = ~300 líneas React

data/
  └── provinces.js = ~80 líneas (datos)

hooks/
  └── useGameState.js = ~400 líneas (lógica de juego)

App.jsx = ~60 líneas

App.css = ~500 líneas (estilos completos)

TOTAL: ~1340 líneas de código limpio + documentación
```

---

## 🎯 Qué Hace Cada Archivo

| Archivo | Responsabilidad | Líneas |
|---------|-----------------|--------|
| **useGameState.js** | Toda la lógica del juego (refuerzo, ataque, movimiento) | ~400 |
| **App.css** | Estilos vintage/pergamino, responsive | ~500 |
| **provinces.js** | Datos de 11 provincias (coords, vecinos) | ~80 |
| **TopBar.jsx** | Encabezado con título, ronda, fase, legend | ~50 |
| **GameBoard.jsx** | Mapa y overlay de provincias | ~45 |
| **ProvinceButton.jsx** | Botón clickeable de cada provincia | ~35 |
| **ActionBar.jsx** | Botones de acción (Reforzar, Atacar, etc) | ~50 |
| **EventBanner.jsx** | Banner de eventos y mensajes | ~25 |
| **PhaseIndicator.jsx** | Indicador visual de fase | ~20 |
| **TurnInfo.jsx** | Info de ronda y jugador | ~25 |
| **TroopsDisplay.jsx** | Badge circular de tropas | ~15 |
| **App.jsx** | Orquestador de componentes | ~60 |

---

## 🔄 Flujo de Datos

```
App.jsx
  │
  ├─→ useGameState()              [Lógica centralizada]
  │
  ├─→ TopBar
  │   ├─→ TurnInfo
  │   └─→ PhaseIndicator
  │
  ├─→ EventBanner
  │   ├─→ event.name
  │   └─→ message
  │
  ├─→ GameBoard
  │   └─→ ProvinceButton × 11
  │       └─→ TroopsDisplay
  │
  └─→ ActionBar
      ├─→ Reforzar
      ├─→ Atacar
      ├─→ Mover
      ├─→ Limpiar
      └─→ Siguiente Fase
```

---

## 🎨 Sistema de Colores (CSS)

```css
/* Variables :root en App.css */

--player-human: #6ec6ff     /* Celeste argentino */
--player-bot1: #1f4e79      /* Azul oscuro */
--player-bot2: #d4a72c      /* Dorado Sol de Mayo */

--bg-primary: #2a2319       /* Marrón oscuro (fondo) */
--bg-secondary: #3d3330     /* Marrón medio */
--bg-tertiary: #4a4238      /* Marrón cálido */

--text-primary: #e8dcc8     /* Crema claro */
--text-secondary: #c9b8a3   /* Crema oscuro */
--text-accent: #d4a72c      /* Dorado */
```

---

## 🕹️ Estados de Provincia

```javascript
// En provincesState
{
  "altiplano": {
    owner: "player" | "bot1" | "bot2",
    troops: number  // 1-10+
  },
  // ... 10 más
}

// Visual States CSS
.province-button
  :hover          → glow + escala
  .selected       → brillo + borde blanco
  .valid-target   → borde punteado dorado
  .secondary-selected → fondo dorado
```

---

## 🎮 Máquina de Estados (Fases)

```
Refuerzo 🛡️
  ├─ Click provincia propia
  ├─ Presionar "Reforzar"
  └─ +1 tropa
  
Ataque ⚔️
  ├─ Click 1: origen (propia)
  ├─ Click 2: destino (enemiga vecina)
  ├─ Presionar "Atacar"
  └─ Simulación de batalla + conquista
  
Movimiento 🚀
  ├─ Click 1: origen (propia)
  ├─ Click 2: destino (propia vecina)
  ├─ Presionar "Mover"
  └─ Mueve mitad de tropas
  
Siguiente Fase ↻
  ├─ Refuerzo → Ataque → Movimiento → Refuerzo
  └─ Ronda sube cuando vuelve a Refuerzo
```

---

## 📱 Responsive Breakpoints

```css
Desktop (1024px+)
  └─ Espaciado amplio, layout horizontal

Tablet (768-1024px)
  └─ Compactado, top-bar en columnas

Mobile (<768px)
  └─ Stack vertical, botones pequeños
```

---

## 🚀 Servidor Vite

```bash
$ npm run dev
➜  Local:   http://localhost:5173/
➜  Press h + enter for help
```

**Características:**
- Hot Module Replacement (HMR)
- Compilación ultra-rápida
- Dev tools integradas
- Sin necesidad de build durante desarrollo

---

## 🔗 Dependencias

```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.14.1"
  },
  "devDependencies": {
    "vite": "^8.0.4",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4"
  }
}
```

**Sin librerías extravagantes**: Solo React puro + CSS + Hooks

---

## 💡 Principios de Diseño

### ✅ Simplicidad
- Un hook centralizado (`useGameState`)
- Componentes pequeños y reutilizables
- Lógica clara y sin abstracciones innecesarias

### ✅ Separación de Responsabilidades
- `data/` → datos estáticos
- `hooks/` → lógica de aplicación
- `components/` → presentación visual
- `App.css` → estilos

### ✅ Facilidad de Extensión
- Variables CSS para personalización
- Métodos independientes en el hook
- Componentes sin dependencias circulares

### ✅ Escalabilidad
- Estructura lista para múltiples juegos
- Preparado para integración backend
- Hooks reutilizables

---

## 📊 Complejidad Algorítmica

```
selectProvince()    O(1)  → búsqueda simple
getValidTargets()   O(n)  → iterar vecinos (max ~5)
attack()            O(1)  → cálculo de batalla
moveUnits()         O(1)  → actualizar dos provincias
nextPhase()         O(1)  → cambiar estado
```

**Todas las operaciones son instantáneas** (sin lag)

---

## 🎯 Coverage de Funcionalidades

| Feature | Status | Componente |
|---------|--------|-----------|
| Mapa visual | ✅ | GameBoard |
| Provincias clickeables | ✅ | ProvinceButton |
| Refuerzo | ✅ | useGameState |
| Ataque | ✅ | useGameState |
| Movimiento | ✅ | useGameState |
| Fases | ✅ | useGameState |
| Turnos | ✅ | useGameState |
| Validaciones | ✅ | useGameState |
| Mensajes | ✅ | EventBanner |
| UI responsive | ✅ | App.css |
| Colores por jugador | ✅ | ProvinceButton |
| Bots (mockeados) | ✅ | Initial state |

---

## 🔒 Seguridad (Frontend)

El frontend **no valida reglas de juego en serio** (validación real debe estar en backend):

- ✅ Validación UI básica (feedback visual)
- ❌ Validación criptográfica (backend)
- ❌ Prevención de trucos (backend)
- ❌ Sincronización (backend)

Esto es **MVP jugable local**. Para producción, mover validaciones a backend.

---

## 📈 Tamaño del Bundle

```
Estimado (build production):
React:        150 KB
App Code:     50 KB
Styles:       10 KB
────────────────
Total:        ~210 KB (sin minify)
Minified:     ~60 KB
Gzipped:      ~20 KB
```

**Muy ligero** para una app completa.

---

## 🧠 Decisiones de Diseño

### ¿Por qué CSS puro y no styled-components?
→ Simplificar, reducir dependencias, CSS estándar

### ¿Por qué un solo hook y no Context?
→ MVP simple, sin over-engineering

### ¿Por qué estado mockeado?
→ Funcionalidad completa sin backend inicialmente

### ¿Por qué no librerías de UI?
→ UI limpia y custom, control total

### ¿Por qué provincias con posicion absoluta?
→ Cálculo rápido, responsive, sin SVG complejo

---

## 📚 Documentación Incluida

1. **README_FRONTEND.md** - Overview general
2. **INTEGRATION_GUIDE.md** - Conectar con backend
3. **CUSTOMIZATION_GUIDE.md** - Extender features
4. **ARCHIVO_ESTRUCTURA.md** - Este documento

---

## ✅ Testing Manual Rápido

```bash
1. npm run dev
2. Abrir http://localhost:5173
3. Click en provincia azul
4. Ver si se selecciona (brillo)
5. Presionar "Reforzar"
6. Ver +1 tropa
7. Siguiente fase
8. Seleccionar 2 provincias
9. Ver validación
10. ¡Listo!
```

---

## 🚀 Próximos Pasos (Recomendado)

1. **Conectar backend** → endpoints reales
2. **Agregar Bot AI** → lógica en backend
3. **Persistencia** → guardar/cargar juegos
4. **Multijugador real** → WebSockets
5. **Animaciones** → transiciones visuales

---

**Estado Actual**: ✅ MVP Completamente Funcional y Jugable

**Servidor**: Corriendo en http://localhost:5173

**Documentación**: 3 guías incluidas (README, Integration, Customization)
