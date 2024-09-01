
//manage routes.paths to productCOntoller

//1. import express
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from "../../middlewares/fileupload.middleware.js"

//2. initialize express router
const router = express.Router();

const productController = new ProductController;

//All the paths to controller methods
//localhost/api/prodcuts
router.post('/rate', (req, res)=>{
    productController.rateProduct(req, res)
});

router.get('/filter', (req, res)=>{
    productController.filterProducts(req, res)
});

router.get('/', (req, res)=>{
    productController.getAllProducts(req, res)
});

router.post('/', upload.single('imageUrl'), (req, res)=>{
    productController.addProduct(req, res)
});

router.get('/:id', (req, res)=>{
    productController.getOneProduct(req, res)
});


export default router
