const express = require("express")
const morgan = require("morgan")
const app = express()
const { insertar, consultar, actualizar, eliminar } = require("./db")

app.listen(3000, () => {
    console.log("App escuchando puerto 3000")
})

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/post", async (req, res) =>{
    const payload = req.body

    try {
        const result = await insertar(payload)
        
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.json({ error: "algo salió mal, intentalo más tarde" })
    }
})

app.put("/post", async (req, res) => {
    const id = req.query

    const response = await actualizar(id)

    res.send(response.rows)
    try {
        
    } catch (error) {
        res.statusCode = 500
        res.json({ error: "algo salió mal, intentalo más tarde" })
    }
})

app.get("/posts", async (req, res) => {
    
    try {
        const response = await  consultar()


        res.send(response.rows)
    } catch (error) {
        res.statusCode = 500
        res.json({error: "Algo salió mal, intentalo más tarde"})
    }
})