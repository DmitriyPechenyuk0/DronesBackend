import { Router } from 'express';
import * as productController from './product.controller';

const router = Router();

router.get('/', productController.handleGetProducts);

router.get('/:id', productController.handleGetProductById);

router.post('/', productController.handleCreateProduct);

router.put('/:id', productController.handleUpdateProduct); 

router.patch('/:id', productController.handlePartialUpdateProduct); 

router.delete('/:id', productController.handleDeleteProduct); 

export default router;