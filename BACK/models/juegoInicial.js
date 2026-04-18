import { jugadoresData } from "./jugadores.js";
import { provinciasData } from "./provincias.js";

function mezclarArray(array) {
  const copia = [...array];

  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function clonarJugadores() {
  return jugadoresData.map((jugador) => ({ ...jugador }));
}

function clonarProvincias() {
  return provinciasData.map((provincia) => ({
    ...provincia,
    vecinos: [...provincia.vecinos],
  }));
}

function calcularRefuerzos(provincias, jugadorId) {
  const cantidad = provincias.filter((provincia) => provincia.owner === jugadorId).length;
  return Math.max(1, Math.floor(cantidad / 3));
}

export function crearJuegoInicial() {
  const jugadores = clonarJugadores();
  const provincias = clonarProvincias();
  const ordenReparto = mezclarArray(provincias.map((p) => p.id));

  ordenReparto.forEach((provinciaId, index) => {
    const jugador = jugadores[index % jugadores.length];
    const provincia = provincias.find((p) => p.id === provinciaId);

    provincia.owner = jugador.id;
    provincia.cantTropas = 2;
    provincia.bloqueado = false;
  });

  const jugadorInicial = jugadores[0];
  const refuerzosIniciales = calcularRefuerzos(provincias, jugadorInicial.id);

  return {
    jugadores,
    provincias,
    ronda: 1,
    turnoActual: 0,
    fase: "refuerzo",
    refuerzosDisponibles: refuerzosIniciales,
    movimientoRealizado: false,
    movimientoExtraDisponible: false,
    eventoActual: null,
    historialEventos: [],
    ganador: null,
  };
}