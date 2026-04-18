// Datos de las provincias/regiones de Argentina
// Coordenadas calibradas sobre MAPA_DEFINITIVO.png
// NOTA: la imagen tiene letterboxing horizontal (~23.5% a cada lado)
// x, y: posición en % del map-wrapper (no de la imagen)
// radius: radio del hitbox circular en %

export const PROVINCES = {
  altiplano: {
    id: 'altiplano',
    name: 'Altiplano',
    neighbors: ['gran-chaquena', 'valles-del-norte', 'cuyo'],
    // imagen: ~20% x, ~15% y => wrapper: 23.5 + 20*0.529 = 34, y=15
    x: 35,
    y: 7,
    radius: 4,
  },
  'gran-chaquena': {
    id: 'gran-chaquena',
    name: 'Gran Chaqueña',
    neighbors: ['altiplano', 'valles-del-norte', 'litoral', 'cuyo'],
    // imagen: ~65% x, ~14% y => wrapper: 23.5 + 65*0.529 = 58, y=14
    x: 58,
    y: 14,
    radius: 5,
  },
  'valles-del-norte': {
    id: 'valles-del-norte',
    name: 'Valles del Norte',
    neighbors: ['altiplano', 'gran-chaquena', 'litoral'],
    // imagen: ~32% x, ~26% y => wrapper: 23.5 + 32*0.529 = 40.4, y=26
    x: 40,
    y: 26,
    radius: 4,
  },
  litoral: {
    id: 'litoral',
    name: 'Litoral',
    neighbors: ['gran-chaquena', 'valles-del-norte', 'pampa-central', 'costa-atlantica'],
    // imagen: ~85% x, ~27% y => wrapper: 23.5 + 85*0.529 = 68.5, y=27
    x: 69,
    y: 27,
    radius: 4,
  },
  cuyo: {
    id: 'cuyo',
    name: 'Cuyo',
    neighbors: ['altiplano', 'gran-chaquena', 'pampa-central', 'cordillera-sur'],
    // imagen: ~26% x, ~41% y => wrapper: 23.5 + 26*0.529 = 37.3, y=41
    x: 37,
    y: 41,
    radius: 4,
  },
  'pampa-central': {
    id: 'pampa-central',
    name: 'Pampa Central',
    neighbors: ['gran-chaquena', 'litoral', 'cuyo', 'costa-atlantica'],
    // imagen: ~53% x, ~37% y => wrapper: 23.5 + 53*0.529 = 51.5, y=37
    x: 52,
    y: 37,
    radius: 5,
  },
  'cordillera-sur': {
    id: 'cordillera-sur',
    name: 'Cordillera Sur',
    neighbors: ['cuyo', 'pampa-central', 'patagonia-norte'],
    // imagen: ~23% x, ~56% y => wrapper: 23.5 + 23*0.529 = 35.6, y=56
    x: 36,
    y: 56,
    radius: 4,
  },
  'costa-atlantica': {
    id: 'costa-atlantica',
    name: 'Costa Atlántica',
    neighbors: ['litoral', 'pampa-central', 'patagonia-norte'],
    // imagen: ~75% x, ~52% y => wrapper: 23.5 + 75*0.529 = 63.2, y=52
    x: 61,
    y: 54,
    radius: 4,
  },
  'patagonia-norte': {
    id: 'patagonia-norte',
    name: 'Patagonia Norte',
    neighbors: ['cordillera-sur', 'costa-atlantica', 'patagonia-austral'],
    // imagen: ~38% x, ~67% y => wrapper: 23.5 + 38*0.529 = 43.6, y=67
    x: 44,
    y: 67,
    radius: 5,
  },
  'patagonia-austral': {
    id: 'patagonia-austral',
    name: 'Patagonia Austral',
    neighbors: ['patagonia-norte', 'tierra-del-fuego'],
    // imagen: ~33% x, ~80% y => wrapper: 23.5 + 33*0.529 = 41, y=80
    x: 41,
    y: 80,
    radius: 4,
  },
  'tierra-del-fuego': {
    id: 'tierra-del-fuego',
    name: 'Tierra del Fuego',
    neighbors: ['patagonia-austral'],
    // imagen: ~44% x, ~93% y => wrapper: 23.5 + 44*0.529 = 46.8, y=93
    x: 47,
    y: 90,
    radius: 3,
  },
};

export const PROVINCES_ARRAY = Object.values(PROVINCES);
