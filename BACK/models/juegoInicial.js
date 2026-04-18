import { provinciasData } from "./provincias";
import { jugadoresData } from "./jugadores";

function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function crearJuegoInicial() {
  const provinciasMezcladas = mezclarArray(provinciasData).map(provincia => ({
    ...provincia,
  }));

  provinciasMezcladas.forEach((provincia, index) => {
    const jugador = jugadoresData[index % jugadoresData.length];
    provincia.ownerId = jugador.id;
    provincia.tropas = 2;
    provincia.bloqueado = false;
  });

  return {
    ronda: 1,
    currentPlayerIndex: 0,
    fase: "refuerzo", // refuerzo | ataque | movimiento
    jugadores: jugadoresData,
    provincias: provinciasMezcladas,
    eventoActual: null,
    ganador: null,
    provinciaSeleccionada: null,
    provinciaObjetivo: null,
    logs: [],
  };
}