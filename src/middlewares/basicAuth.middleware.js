import UserModel from "../features/user/user.model.js"

export const basicAuthorizer = (req, res, next)=>{
    
    const authHeader = req.headers["authorization"];

    if (!authHeader){
        return res.status(401).send("No authorization details found");
    }
    console.log(authHeader);
    //2. extract the credentials. [Basic sdfhsfsef78f789sgdfsf]

    const base64credentials = authHeader.replace('Basic', '');
    console.log(base64credentials);

    //3. decode credentials
    const decodedCreds = Buffer.from(base64credentials, 'base64').toString('utf8');
    console.log(decodedCreds);
    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find(u=>u.email ==creds[0] && u.password == creds[1]);
    if (user){
        next();
    }else{
        return res.status(401).send("Incorrect credentials")
    }

}