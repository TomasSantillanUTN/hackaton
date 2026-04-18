# ⚡ Quick Start - TEG Argentina Frontend

## 🎮 Juega en 30 segundos

### 1️⃣ Inicia el servidor

```bash
cd FRONT
npm run dev
```

Se abrirá automáticamente en **http://localhost:5173**

### 2️⃣ Juega

**Refuerzo 🛡️**
- Click en tu provincia (celeste)
- Presiona "Reforzar"
- +1 tropa

**Ataque ⚔️**
- Click en tu provincia
- Click en provincia enemiga vecina (dorado o azul)
- Presiona "Atacar"
- ¡Batalla automática!

**Movimiento 🚀**
- Click en tu provincia
- Click en provincia propia vecina
- Presiona "Mover"
- Tropas se mueven

**Siguiente Turno** →
- Presiona "Siguiente fase"
- Ciclo: Refuerzo → Ataque → Movimiento → Siguiente jugador

---

## 📂 Carpetas Importantes

| Carpeta | Qué Hace |
|---------|----------|
| `src/components/` | Componentes React visuales |
| `src/hooks/` | `useGameState` = lógica del juego |
| `src/data/` | Datos de provincias |
| `src/App.css` | Todos los estilos |

---

## 🔧 Cambios Rápidos

### Cambiar Color de Jugador

**Archivo**: `src/hooks/useGameState.js`

```javascript
const PLAYERS = [
  { id: 'player', name: 'Vos', color: '#AQUI_TU_COLOR', type: 'human' },
  // ...
];
```

Ej: `#FF0000` = rojo

### Cambiar Tropas Iniciales

**Archivo**: `src/hooks/useGameState.js`

```javascript
const INITIAL_PROVINCES_STATE = {
  altiplano: { owner: 'player', troops: 10 },  // Cambiar número
  // ...
};
```

### Cambiar Tema (Colores de Fondo)

**Archivo**: `src/App.css`

```css
:root {
  --bg-primary: #2a2319;     /* Marrón oscuro - cambiar aquí */
  --text-accent: #d4a72c;    /* Dorado - cambiar aquí */
  /* ... más abajo hay más */
}
```

---

## 🎨 Colores Bonitos (Ejemplos)

### Tema Cyberpunk 🌃
```css
--bg-primary: #0a0e27;
--text-primary: #00ff88;
--text-accent: #00ffff;
```

### Tema Tropical 🏝️
```css
--bg-primary: #1a3a2a;
--text-primary: #ffee99;
--text-accent: #ff6b6b;
```

### Tema Noble ⚜️
```css
--bg-primary: #1a1a1a;
--text-primary: #d4af37;
--text-accent: #ff69b4;
```

---

## 📍 Dónde Está Qué

### Modificar Lógica del Juego
→ `src/hooks/useGameState.js`

### Modificar Componentes
→ `src/components/*.jsx`

### Modificar Datos de Provincias
→ `src/data/provinces.js`

### Modificar Estilos
→ `src/App.css`

### Modificar Estructura Principal
→ `src/App.jsx`

---

## ✏️ 10 Modificaciones Más Fáciles

1. **Cambiar nombre del juego**
   ```javascript
   // En TopBar.jsx
   <h1 className="game-title">Tu Nombre Aquí</h1>
   ```

2. **Cambiar tamaño del mapa**
   ```css
   /* En App.css */
   .game-board-container {
     max-width: 1200px;  /* Cambiar número */
   }
   ```

3. **Aumentar tropas por refuerzo**
   ```javascript
   // En useGameState.js, método reinforce()
   troops: prev[...].troops + 2  // Cambiar de 1 a 2
   ```

4. **Cambiar nombre de botón**
   ```javascript
   // En ActionBar.jsx
   <button>Mi Nombre Nuevo</button>
   ```

5. **Agregar más equipamiento inicial**
   ```javascript
   // En useGameState.js
   altiplano: { owner: 'player', troops: 10 }  // Cambiar 5 → 10
   ```

6. **Cambiar color de texto**
   ```css
   /* En App.css :root */
   --text-primary: #ffffff;  /* Blanco */
   ```

7. **Hacer botones más grandes**
   ```css
   /* En App.css, .action-btn */
   padding: 15px 30px;  /* Cambiar de 10px 20px */
   ```

8. **Cambiar velocidad de transiciones**
   ```css
   /* En App.css :root */
   --transition: 0.5s ease-in-out;  /* Cambiar de 0.2s */
   ```

9. **Cambiar nombre de provincia**
   ```javascript
   // En data/provinces.js
   name: 'Mi Nueva Provincia'
   ```

10. **Agregar más bots**
    ```javascript
    // En useGameState.js
    { id: 'bot3', name: 'Bot 3', color: '#aabbcc', type: 'bot' }
    ```

---

## 🐛 Debugging

### Ver errores
- Presiona **F12** en el navegador
- Ve a la pestaña **Console**
- Los errores aparecerán en rojo

### Ver qué provincia está seleccionada
- F12 → Console
- Escribe: `console.log('test')` → Enter
- Debería aparecer

### Ver estado del juego
Agregar esto en `App.jsx`:
```javascript
<div style={{fontSize: '10px', color: '#666'}}>
  DEBUG: {gameState.selectedProvince} | {gameState.currentPhase}
</div>
```

---

## 📚 Documentación Completa

Tenemos 4 documentos:

1. **README_FRONTEND.md** ← Empeza aquí para overview
2. **INTEGRATION_GUIDE.md** ← Para conectar con backend
3. **CUSTOMIZATION_GUIDE.md** ← Para extender features
4. **ARQUITECTURA.md** ← Para entender estructura

---

## 🎯 Flujo Típico

```
Usuario abre http://localhost:5173
              ↓
        Frontend carga React
              ↓
        Ve mapa + botones
              ↓
        Click en provincia
              ↓
        useGameState() procesa acción
              ↓
        Frontend se re-renderiza
              ↓
        Usuario ve cambios
```

---

## 🚀 Para Producción

### Build
```bash
npm run build
```

Genera carpeta `dist/` lista para servidor.

### Servir
```bash
npm run preview
```

---

## 🎓 Aprende Modificando

**Ejercicio 1**: Cambiar color celeste a otro
- Edita `useGameState.js` línea ~10
- Recarga página (F5)
- ¡Done!

**Ejercicio 2**: Agregar "Mis Tropas" arriba
- Copia `TurnInfo.jsx` 
- Agrega componente a `App.jsx`
- Muestra `provincesState`

**Ejercicio 3**: Cambiar nombre provincia
- Edita `data/provinces.js`
- Recarga
- Verás nuevo nombre en el botón

---

## 💬 Mensajes Comunes

| Mensaje | Significa |
|---------|-----------|
| "No puedes reforzar una provincia enemiga" | Seleccionaste provincia del enemigo en refuerzo |
| "Debes seleccionar una provincia enemiga" | En ataque, segundo click debe ser enemigo |
| "La provincia destino no es vecina" | Las provincias no limitan |
| "Necesitas al menos 2 tropas para atacar" | Pocas tropas |

---

## 🎮 Estado Inicial del Juego

| Provincia | Dueño | Tropas |
|-----------|-------|--------|
| Altiplano | Vos 🔵 | 5 |
| Valles del Norte | Vos 🔵 | 3 |
| Costa Atlántica | Vos 🔵 | 4 |
| Tierra del Fuego | Vos 🔵 | 2 |
| Gran Chaqueña | Bot 1 🔷 | 4 |
| Pampa Central | Bot 1 🔷 | 5 |
| Patagonia Norte | Bot 1 🔷 | 2 |
| Litoral | Bot 2 🟡 | 4 |
| Cuyo | Bot 2 🟡 | - |
| Cordillera Sur | Bot 2 🟡 | 3 |
| Patagonia Austral | Bot 2 🟡 | 3 |

---

## ⌨️ Atajos útiles (en navegador)

| Tecla | Función |
|-------|---------|
| **F5** | Recargar (refleja cambios en código) |
| **F12** | Abrir DevTools |
| **Ctrl+Shift+C** | Inspector de elementos |
| **Ctrl+K** | Buscar en DevTools |

---

## 🎨 Paleta Actual

```
Azul (Vos):          #6ec6ff
Azul Oscuro (Bot1):  #1f4e79
Dorado (Bot2):       #d4a72c
```

🎯 **Pro tip**: Usa https://colorhexa.com para ver paletas bonitas

---

## 📞 Si Algo No Funciona

### Frontend No Carga
```bash
# Matar servidor
Presionar Ctrl+C en terminal

# Reiniciar
npm run dev
```

### Cambio No Aparece
```bash
# Limpiar caché
Presionar F5 en navegador (o Ctrl+Shift+R)
```

### Errores en Console
- Revisar sintaxis (paréntesis, comillas)
- Revisar que imports existan
- Copiar error completo a ChatGPT

---

## 📖 Próxima Lectura

Cuando entiendas esto:

→ Lee **INTEGRATION_GUIDE.md** para conectar backend  
→ Lee **CUSTOMIZATION_GUIDE.md** para extender features  
→ Lee **ARQUITECTURA.md** para entender todo en profundidad  

---

## ✅ Checklist para Empezar

- [ ] Ejecute `npm run dev`
- [ ] Abrió http://localhost:5173
- [ ] Clickeó en una provincia
- [ ] Presionó "Reforzar"
- [ ] Vio que subieron las tropas
- [ ] Pasó de fase
- [ ] Realizó un ataque
- [ ] ¡Lo disfrutó!

---

## 🎉 ¡Bienvenido!

Acabas de crear un juego visual funcional en React.

**Próximos pasos**:
1. Personaliza los colores
2. Lee la documentación
3. Conecta con tu backend
4. ¡Disfruta!

---

**Servidor**: http://localhost:5173  
**Documentación**: `FRONT/README_FRONTEND.md`  
**Integración Backend**: `FRONT/INTEGRATION_GUIDE.md`  
**Soporte**: Los comentarios en el código te guiarán

¡Buen juego! 🎮
