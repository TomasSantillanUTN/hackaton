# Integración Frontend-Backend - TEG Argentina

Este archivo describe cómo conectar el frontend React con el backend.

## 📋 Endpoints Esperados

El frontend actualmente funciona con **estado mockeado local**. Para conectar con el backend, necesitarás estos endpoints:

### 1. Obtener Estado del Juego
```
GET /api/game/state
GET /api/games/{gameId}/state

Response:
{
  "round": 1,
  "currentPhase": "refuerzo",
  "currentPlayerIdx": 0,
  "selectedProvince": null,
  "secondarySelected": null,
  "currentEvent": {
    "name": "Inicio",
    "description": "Comienza el juego"
  },
  "message": "",
  "gameOver": false,
  "players": [
    { "id": "player1", "name": "Vos", "color": "#6ec6ff", "type": "human" },
    { "id": "bot1", "name": "Bot 1", "color": "#1f4e79", "type": "bot" },
    { "id": "bot2", "name": "Bot 2", "color": "#d4a72c", "type": "bot" }
  ],
  "provinces": {
    "altiplano": {
      "id": "altiplano",
      "name": "Altiplano",
      "owner": "player1",
      "troops": 5,
      "neighbors": ["gran-chaquena", "valles-del-norte", "cuyo"],
      "blocked": false
    },
    ...más provincias
  }
}
```

### 2. Reforzar Provincia
```
POST /api/games/{gameId}/reinforce

Request:
{
  "provinceId": "altiplano",
  "playerId": "player1"
}

Response:
{
  "success": true,
  "message": "Refuerzo agregado",
  "newState": { ...gameState actualizado }
}
```

### 3. Atacar
```
POST /api/games/{gameId}/attack

Request:
{
  "originProvinceId": "altiplano",
  "targetProvinceId": "gran-chaquena",
  "playerId": "player1"
}

Response:
{
  "success": true,
  "message": "¡Ataque exitoso!",
  "battle": {
    "attacker": "player1",
    "defender": "bot1",
    "attackerTroops": 3,
    "defenderTroops": 1,
    "result": "win",
    "newOwner": "player1",
    "newTroops": 2
  },
  "newState": { ...gameState actualizado }
}
```

### 4. Mover Tropas
```
POST /api/games/{gameId}/move

Request:
{
  "originProvinceId": "altiplano",
  "targetProvinceId": "valles-del-norte",
  "quantity": 3,
  "playerId": "player1"
}

Response:
{
  "success": true,
  "message": "Tropas movidas",
  "moveResult": {
    "originTroops": 2,
    "targetTroops": 6
  },
  "newState": { ...gameState actualizado }
}
```

### 5. Siguiente Fase
```
POST /api/games/{gameId}/next-phase

Request:
{
  "playerId": "player1"
}

Response:
{
  "success": true,
  "message": "Fase siguiente: movimiento",
  "newPhase": "movimiento",
  "newTurn": 0,
  "newRound": 1,
  "newState": { ...gameState actualizado }
}
```

### 6. Crear Nuevo Juego (Opcional)
```
POST /api/games/new

Request:
{
  "playerName": "Vos",
  "gameMode": "vs-bots",
  "difficulty": "medium"
}

Response:
{
  "gameId": "game_123456",
  "state": { ...gameState inicial }
}
```

---

## 🔌 Cómo Integrar en el Frontend

### Paso 1: Crear un Service para API

Crear archivo `src/services/gameApi.js`:

```javascript
const API_URL = 'http://localhost:3000/api'; // Ajustar según backend

export const gameApi = {
  async getGameState(gameId) {
    const res = await fetch(`${API_URL}/games/${gameId}/state`);
    return res.json();
  },

  async reinforce(gameId, provinceId, playerId) {
    const res = await fetch(`${API_URL}/games/${gameId}/reinforce`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provinceId, playerId })
    });
    return res.json();
  },

  async attack(gameId, originId, targetId, playerId) {
    const res = await fetch(`${API_URL}/games/${gameId}/attack`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originProvinceId: originId,
        targetProvinceId: targetId,
        playerId
      })
    });
    return res.json();
  },

  async move(gameId, originId, targetId, quantity, playerId) {
    const res = await fetch(`${API_URL}/games/${gameId}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originProvinceId: originId,
        targetProvinceId: targetId,
        quantity,
        playerId
      })
    });
    return res.json();
  },

  async nextPhase(gameId, playerId) {
    const res = await fetch(`${API_URL}/games/${gameId}/next-phase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId })
    });
    return res.json();
  }
};
```

### Paso 2: Modificar el Hook

Actualizar `src/hooks/useGameState.js` para usar el service:

```javascript
import { useState, useCallback, useEffect } from 'react';
import { gameApi } from '../services/gameApi';

export function useGameState(gameId) {
  const [gameState, setGameState] = useState(null);
  const [provincesState, setProvincesState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar estado inicial
  useEffect(() => {
    gameApi.getGameState(gameId)
      .then(data => {
        setGameState(data.gameState);
        setProvincesState(data.provinces);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [gameId]);

  // Actualizar métodos para llamar al backend
  const reinforce = useCallback(async () => {
    if (!gameState.selectedProvince) return;
    
    try {
      const result = await gameApi.reinforce(
        gameId,
        gameState.selectedProvince,
        'player1' // ID real del jugador
      );
      
      if (result.success) {
        setGameState(result.newState);
        setProvincesState(result.newState.provinces);
      }
    } catch (err) {
      setError(err);
    }
  }, [gameState, gameId]);

  // Similar para attack, moveUnits, nextPhase...

  return {
    gameState,
    provincesState,
    loading,
    error,
    // ... resto de métodos
  };
}
```

### Paso 3: Manejar Carga

En `App.jsx`:

```javascript
export default function App() {
  const {
    gameState,
    provincesState,
    loading,
    error,
    // ... otros
  } = useGameState('game_current');

  if (loading) {
    return <div className="loading">Cargando juego...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="app">
      {/* ... componentes */}
    </div>
  );
}
```

---

## 🔄 Flujo de Comunicación

```
Frontend (React)
    ↓ click en provincia
    ↓ selectProvince() → UI actualiza
    ↓ usuario presiona "Reforzar"
    ↓ reinforce() → POST /api/games/{id}/reinforce
    ↓
Backend (Node.js/Express)
    ↓ valida acción
    ↓ actualiza base de datos
    ↓ devuelve nuevo estado
    ↓
Frontend
    ↓ recibe respuesta
    ↓ setGameState(newState)
    ↓ UI se re-renderiza
```

---

## 🤖 Bots - Ejecución en Backend

El frontend **NO** ejecuta lógica de bots. Estos deben estar en el backend:

**Flujo esperado:**
1. Jugador humano termina su turno → `POST /next-phase`
2. Backend detecta que es turno de bot
3. Backend ejecuta lógica de IA del bot (refuerzo, ataque, movimiento automático)
4. Backend devuelve nuevo estado con cambios del bot
5. Frontend recibe y renderiza cambios

Esto mantiene **sincronización única** y evita conflictos.

---

## 🌐 CORS

Si backend está en diferente puerto/dominio:

**Backend (Node.js + Express):**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  credentials: true
}));
```

---

## 📦 Ejemplo: Request/Response Real

### Request
```javascript
fetch('http://localhost:3000/api/games/game_123/attack', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    originProvinceId: 'altiplano',
    targetProvinceId: 'gran-chaquena',
    playerId: 'player1'
  })
})
```

### Response
```json
{
  "success": true,
  "message": "¡Ataque exitoso! Altiplano conquistó Gran Chaqueña",
  "battle": {
    "attacker": "player1",
    "defender": "bot1",
    "attackerTroops": 4,
    "defenderTroops": 2,
    "result": "win"
  },
  "newState": {
    "round": 1,
    "currentPhase": "ataque",
    "provinces": {
      "gran-chaquena": {
        "owner": "player1",
        "troops": 2
      },
      ...
    },
    ...
  }
}
```

---

## 🔐 Seguridad (Próximas Mejoras)

- [ ] Autenticación JWT
- [ ] Validación en backend de todas las acciones
- [ ] Rate limiting
- [ ] Verificar que el jugador no haga trampa
- [ ] Encriptación de comunicación (HTTPS)

---

## 🧪 Testing

Para desarrollo, puedes:

1. **Mockvea con JSON local** (actual):
```bash
npm run dev # Usa estado mockeado
```

2. **Stub endpoints** con herramientas como Postman/Insomnia

3. **Backend local**:
```bash
cd BACK && npm run dev  # Inicia backend en :3000
# Frontend se conecta a http://localhost:3000
```

---

## 📞 Debugging

### Frontend
- Abrir DevTools (F12) → Network → ver requests
- Console para logs de estado
- React DevTools (extensión) para inspeccionar componentes

### Backend
- Logs en terminal
- Postman para testear endpoints directamente
- DB inspector si usas SQL

---

**Estado**: El frontend está completamente desacoplado y listo para integración.  
**Próximo paso**: Implementar endpoints en el backend y conectar.
