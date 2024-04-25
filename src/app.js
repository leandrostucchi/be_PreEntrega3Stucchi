// lado servidor

import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from './routes/views.router.js';
import productsRouter from "./routes/productsModel.router.js"
import cartsRouter from "./routes/cartsModel.router.js"
import usersRouter from "./routes/sessions.router.js"
//import sessionsRouter from "./routes/sessions.router.js";

import { Server } from "socket.io";

import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { addLogger } from "./utils/logger.js";
//import passport, { Passport } from "passport";
//import initializePassport from "./config/passport.config.js";

import config from "./config/config.js";

export const port = config.port;
export const mongodbweb= config.mongodbweb;
export const mongodblocal= config.mongodblocal;
export const secret_cookie= config.secret_cookie;
export const secretCode= config.secretCode;
export const ttl= config.ttl;



const app = express();
app.use(addLogger);

const httpServer =  app.listen(port,() => {console.log('Servidor arriba  puerto:' + port)
}

)


const io = new Server(httpServer);


app.use(cookieParser(secret_cookie));
app.use(session({
    store:MongoStore.create({
        mongoUrl:mongodbweb,
        //mongoUrl:mongodblocal,
        //mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:ttl,
    }),
    secret:secretCode,
    resave:true,
    saveUninitialized:true
}))


//mongoose.connect(mongodblocal)
mongoose.connect(mongodbweb)
.then(success => console.log('Conectado a la base'))
.catch(error =>{
    if(error){
      console.log('No se pudo conectar a la base ' + error);
      process.exit();
    }
  });


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
//app.set("views", `${__dirname}/views`);
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");



app.use(express.static(__dirname + "/public"));

//ROUTES
app.use('/', viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", usersRouter);

app.get('/ping',(req,res) =>{res.send('pong') })
app.get("/:universalURL", (req, res) => { 
  console.log(req.error)
  res.status(404).send({
    status:404,
    result:"error",
    error:"404 URL NOT FOUND"
  });
}); 


// io.on('connection', (socket) => {
//   console.log('Nuevo cliente conectado')
//   socket.on("Product", async (data) => {
//     console.log("Entre por aca updProduct" )
//     console.log(data)
//   });
//   socket.emit("updProduct", () => {
//     console.log("entre aca updProduct")
//   });

//   socket.on("deleteProduct", async (productId) => {
//     console.log("deleteProduct")
//     console.log(productId)

//     let num = Object.values(productId)
//     // Encontrar el índice del producto con el productId
//     await productManager.deleteProduct(parseInt(num));
//     io.emit("recibirProductos", productManager.getProducts());
//   });
 
//   socket.on("disconnect", () => {
//     console.log("Usuario desconectado");
//   });
//})