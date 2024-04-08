import dotenv from 'dotenv';

const enviroment = 'DEVELOPMENT';

// dotenv.config(
//     {path:enviroment === 'DEVELOPMENT'? '../../.env.development':''  }

// );
dotenv.config()


export default{
    port: process.env.PORT,
    mongodbweb: process.env.MONGODBWEB,
    mongodblocal: process.env.MONGODBLOCAL,
    secret_cookie: process.env.SECRET_COOKIE,
    secretCode: process.env.SECRETCODE,
    ttl: process.env.TTL,
}