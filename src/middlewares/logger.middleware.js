import fs from 'fs'
import winston from 'winston';

const fsPromise = fs.promises;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename: 'logs.txt'})
    ]
});

const loggerMiddleware = async (req, res, next) => {
    if (!req.url.includes('signin')){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`
        logger.info(logData);
    }
    next();
}

// async function log(logData){
//     try{
//         logData = `${new Date().toString()} \nLog Data: \n${logData}\n\n`;
//         await fsPromise.appendFile("log.txt", logData);
//     }catch(err){
//         console.log(err);
//     }
// }

// const loggerMiddleware = async (req, res, next) => {
//     if (!req.url.includes('signin')){
//         const logData = `${req.url} - ${JSON.stringify(req.body)}`
//         await log(logData);
//     }
//     next();
// }

export default loggerMiddleware;