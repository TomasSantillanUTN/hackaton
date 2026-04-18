import { getJuego, setJuego } from "./gameState.js";

function crearError(mensaje, status = 400) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

function calcularRefuerzos(provincias, jugadorId) {
  const cantidad = provincias.filter((provincia) => provincia.owner === jugadorId).length;
  return Math.max(1, Math.floor(cantidad / 3));
}

export function aplicarRefuerzo({ provinciaId, jugadorId }) {
  const juego = getJuego();

  if (!juego) {
    throw crearError("No hay juego inicializado", 500);
  }

  if (juego.ganador) {
    throw crearError("La partida ya finalizo", 409);
  }

  if (juego.fase !== "refuerzo") {
    throw crearError("La fase actual no permite refuerzos");
  }

  const jugadorActual = juego.jugadores[juego.turnoActual];
  if (!jugadorActual) {
    throw crearError("No se encontro el jugador del turno actual", 500);
  }

  if (jugadorId && jugadorId !== jugadorActual.id) {
    throw crearError("No es el turno del jugador indicado", 403);
  }

  if (!provinciaId) {
    throw crearError("Falta provinciaId");
  }

  const provincia = juego.provincias.find((item) => item.id === provinciaId);
  if (!provincia) {
    throw crearError("Provincia no encontrada", 404);
  }

  if (provincia.owner !== jugadorActual.id) {
    throw crearError("La provincia no pertenece al jugador actual", 403);
  }

  if (provincia.bloqueado) {
    throw crearError("La provincia esta bloqueada y no puede reforzarse");
  }

  if (typeof juego.refuerzosDisponibles !== "number") {
    juego.refuerzosDisponibles = calcularRefuerzos(juego.provincias, jugadorActual.id);
  }

  if (juego.refuerzosDisponibles <= 0) {
    throw crearError("No quedan refuerzos disponibles en este turno");
  }

  provincia.cantTropas += 1;
  juego.refuerzosDisponibles -= 1;

  setJuego(juego);

  return {
    mensaje: "Refuerzo aplicado",
    jugadorActual: {
      id: jugadorActual.id,
      nombre: jugadorActual.nombre,
      tipo: jugadorActual.tipo,
    },
    provincia,
    refuerzosDisponibles: juego.refuerzosDisponibles,
    juego,
  };
}
