
//1. import express
import express from 'express';
import  UserController from './user.controller.js';

//2. initialize express router
const userRouter = express.Router();

const userController = new UserController;

//All the paths to controller methods
//localhost/api/users

userRouter.post('/signup', (req, res)=>{
    userController.signUp(req, res)
});

userRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)
});


export default userRouter
