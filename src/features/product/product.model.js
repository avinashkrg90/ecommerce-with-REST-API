
import { ApplicationError } from "../../error handler/applicationError.js";
import UserModel from "../user/user.model.js"

export default class ProductModel{
    constructor(name, description, imageUrl, category, price, sizes, id){
        this._id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }
}

var products = [   //test data to work with
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'category1',
      19.99,
      ['M', 'XL', 'XXL']
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'category1',
      29.99,
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'category2',
      39.99,
    ),
  ]