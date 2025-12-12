import express from 'express';
import productRoutes from './product/product.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/products', productRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});