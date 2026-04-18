import { Provincia } from "../models/provinciaModel";

export const provinciasData = [
  new Provincia({
    id: "altiplano",
    nombre: "Altiplano",
    vecinos: ["gran-chaquena", "valles-del-norte", "patagonia-norte" ],
  }),

  new Provincia({
    id: "gran-chaquena",
    nombre: "Gran Chaquena",
    vecinos: ["altiplano", "valles-del-norte", "litoral", "pampa-central"],
  }),

  new Provincia({
    id: "valles-del-norte",
    nombre: "Valles del Norte",
    vecinos: ["altiplano", "gran-chaquena", "cuyo", "pampa-central"],
  }),

  new Provincia({
    id: "litoral",
    nombre: "Litoral",
    vecinos: ["gran-chaquena", "pampa-central", "costa-atlantica", "tierra-del-fuego"],
  }),

  new Provincia({
    id: "cuyo",
    nombre: "Cuyo",
    vecinos: ["valles-del-norte", "pampa-central", "cordillera-sur"],
  }),

  new Provincia({
    id: "pampa-central",
    nombre: "Pampa Central",
    vecinos: [
      "gran-chaquena",
      "valles-del-norte",
      "litoral",
      "cuyo",
      "cordillera-sur",
      "costa-atlantica",
    ],
  }),

  new Provincia({
    id: "cordillera-sur",
    nombre: "Cordillera Sur",
    vecinos: ["cuyo", "pampa-central", "patagonia-norte", "costa-atlantica"],
  }),

  new Provincia({
    id: "costa-atlantica",
    nombre: "Costa Atlantica",
    vecinos: ["litoral", "pampa-central", "patagonia-norte", "cordillera-sur" ],
  }),

  new Provincia({
    id: "patagonia-norte",
    nombre: "Patagonia Norte",
    vecinos: ["cordillera-sur", "costa-atlantica", "patagonia-austral", "altiplano" ],
  }),

  new Provincia({
    id: "patagonia-austral",
    nombre: "Patagonia Austral",
    vecinos: ["patagonia-norte", "tierra-del-fuego"],
  }),

  new Provincia({
    id: "tierra-del-fuego",
    nombre: "Tierra del Fuego",
    vecinos: ["patagonia-austral", "litoral"],
  }),
];