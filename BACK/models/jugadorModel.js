export class Jugador {
  constructor({
    id,
    nombre,
    tipo = "human",
    color = "gray",
  }) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo; // "human" | "bot"
    this.color = color;
  }
}