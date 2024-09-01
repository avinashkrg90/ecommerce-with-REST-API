import './env.js';
import express from 'express'
import swagger from "swagger-ui-express"
import bodyParser from 'body-parser'
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import apiDocs from "./swagger.json" assert {type: 'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error handler/applicationError.js';
import { connectToMongoDB } from './src/config/mongodb.js';


const server = express();

// CORS policy configuration
server.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    // return ok for preflight request
    if (req.method == 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

server.use(bodyParser.json());
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use(loggerMiddleware);

server.use('/api/products', jwtAuth, productRouter);
server.use('/api/users', userRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);

server.get("/", (req, res)=>{
    res.send("Welcome to e-commerce APIs");
})

server.use((err, req, res, next)=>{
    console.log(err);
    if (err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    //server error
    res.status(500).send("Something went wrong, please try later.");
})

// Middleware to handle 404 requests
server.use((req, res)=>{
    res.status(404).send("API not found");
});

server.listen(3200, () => {
    console.log("server is listening on 3200");
    connectToMongoDB();
});