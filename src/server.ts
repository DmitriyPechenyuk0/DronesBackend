import express from 'express'
import categoryRoutes from "./category/category.routes";

const app: express.Express = express()
app.use(express.json())

const PORT: number = 8000
app.use(express.json());
app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});