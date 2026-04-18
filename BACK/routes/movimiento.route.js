import express from "express"


const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({ msg : "todo ok movimiento"})
})

export default router