const { Pool } = require("pg")

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    pass: process.env.PASSWORD,
    port: process.env.PORT,
}

const pool = new Pool(config)

const consultar = async () => {
    const text = "SELECT * FROM posts"
    const result = await pool.query(text)

    return result
}

const insertar = async (payload) => {

    const text = "INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [payload.usuario, payload.URL, payload.descripcion, 0];


    const result = await pool.query(text, values)

    return result
}

const actualizar = async (payload) => {
    const text = "UPDATE posts SET likes =  likes + 1 WHERE id = $1"
    const values = [payload.id]


    const result = await pool.query(text, values)

    return result
}

module.exports = { insertar, consultar, actualizar }