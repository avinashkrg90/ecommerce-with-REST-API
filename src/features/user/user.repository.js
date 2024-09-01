import { getDB } from "../../config/mongodb.js";


class UserRepository{

    constructor(){
        this.collection = "users";
    }

    async signUp(newUser){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newUser);
            return newUser;
        }catch (err){
            console.log (err);
        }
    }

    async signIn(email, password){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
             return await collection.findOne({email, password});
        }catch (err){
            console.log (err);
        }
    }

    async findByEmail(email){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
             return await collection.findOne({email});
        }catch (err){
            console.log (err);
        }
    }
}

export default UserRepository