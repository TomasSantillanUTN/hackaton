import { Jugador } from "../models/Jugador";

export const jugadoresData = [
  new Jugador({
    id: "jugador",
    nombre: "Jugador",
    tipo: "human",
    color: "green",
  }),
  new Jugador({
    id: "bot-1",
    nombre: "Bot 1",
    tipo: "bot",
    color: "red",
  }),
  new Jugador({
    id: "bot-2",
    nombre: "Bot 2",
    tipo: "bot",
    color: "blue",
  }),
];