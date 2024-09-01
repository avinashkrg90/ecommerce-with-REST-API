import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";


class ProductRepository{

    constructor(){
        this.collection = "products";
    }

    async add(newProduct){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        }catch (err){
            console.log (err);
        }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const allProdcuts = await collection.find().toArray();
            return allProdcuts;
        }catch (err){
            console.log (err);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const product = await collection.findOne({_id : new ObjectId(id)});
            return product;
        }catch (err){
            console.log (err);
        }
    }

    async filter(minPrice, maxPrice, category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if (minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if (maxPrice){
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if (category){
                filterExpression.category = category
            }
            const products = await collection.find(filterExpression).toArray();
            console.log(products);
            return products;
        }catch (err){
            console.log (err);
        }
    }

    async rateProduct(userId, productId, rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const product = collection.updateOne({_id:new ObjectId(productId)}, {$push:{ratings:{userId : new ObjectId(userId), rating}}});
        }catch(err){
            console.log(err);
        }

    }
}

export default ProductRepository