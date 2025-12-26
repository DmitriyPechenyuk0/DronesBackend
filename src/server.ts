import express from 'express'
import { ProductRouter } from './product/product.routes'
import { CategoryRouter } from './category/category.routes'

const app: express.Express = express()
app.use(express.json())
app.use(ProductRouter)
app.use(CategoryRouter)

const PORT: number = 8000
const HOST: string = 'localhost'
const PROTOCOL: string = `http`

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`)
})