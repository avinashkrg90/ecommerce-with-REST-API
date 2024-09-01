
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor(){
        this.productRepository = new ProductRepository;
    }

    async getAllProducts(req, res){
        try{
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
            console.log(products);
        }catch(err){
            cosnole.log(err);
        }
    }

    async addProduct(req, res){
        try{
            const {name, description, category, price, sizes} = req.body;
            const newProduct = new ProductModel(name, description, req.file.filename, category, parseFloat(price), sizes.split(','));
            const createdRecord = await this.productRepository.add(newProduct);
            res.status(201).send(createdRecord);
            console.log(createdRecord);
        }catch(err){
            cosnole.log(err);
        }
    }

    async rateProduct(req, res){
        // console.log(req.query);
        const userId = req.userId;
        const productId = req.query.productID;
        const rating = req.query.rating;
        try{
            await this.productRepository.rateProduct(userId, productId, rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
        
        return res.status(200).send("Rating has been added");
    }

    async getOneProduct(req, res){

        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if (!product){
                res.status(404).send("product not found")
            }else{
                console.log(product);
                return res.status(200).send(product);
            }
        }catch(err){
            cosnole.log(err);
        }
    }

    async filterProducts(req, res){
        try{
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const result = await this.productRepository.filter(minPrice, maxPrice, category);
            if (!result){
                res.status(404).send("Product not found")
            }else{
                return res.status(200).send(result);
            }
        }catch(err){
            console.log(err);
        }
    }
}