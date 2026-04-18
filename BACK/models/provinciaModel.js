export class Provincia {
  constructor({
    id,
    nombre,
    ownerId = null,
    tropas = 0,
    vecinos = [],
    bloqueado = false,
  }) {
    this.id = id;
    this.nombre = nombre;
    this.ownerId = ownerId;
    this.tropas = tropas;
    this.vecinos = vecinos;
    this.bloqueado = bloqueado;
  }
}