import express from 'express'

const app: express.Express = express()
app.use(express.json())

const PORT: number = 8000
const HOST: string = 'localhost'
const PROTOCOL: string = `http`

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`)
})