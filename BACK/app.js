import express from 'express';
import cors from 'cors';

import AtaqueRoute from "./routes/ataque.route.js"
import RefuerzoRoute from "./routes/refuerzo.route.js"
import MovimientoRoute from "./routes/movimiento.route.js"
import JuegoRoute from "./routes/juego.route.js"

const app = express();
const PORT = 3000;

// cors
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()).use(express.urlencoded({ extended: true }));

// healthcheck
app.get("/", (req, res) => {
    res.status(200).json({ msg : "todo ok"})
} )

// routers
app.use("/juego", JuegoRoute)
app.use("/refuerzo", RefuerzoRoute)
app.use("/ataque", AtaqueRoute)
app.use("/movimiento", MovimientoRoute)
app.use("/teg/atacar", AtaqueRoute)
app.use("/teg/reforzar", RefuerzoRoute)
app.use("/teg/movimiento", MovimientoRoute)



// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


(async function start() {

    app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}());
