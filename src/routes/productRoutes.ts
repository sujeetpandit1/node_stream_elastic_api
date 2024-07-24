import express from 'express';
import * as productController from '../controllers/productController';


const router = express.Router();


router.get('/all', productController.getAllProduct);
router.get('/search', productController.searchProduct);
router.get('/stream', productController.streamProduct);
router.get('/:id', productController.getProductById);
router.post('/create', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;