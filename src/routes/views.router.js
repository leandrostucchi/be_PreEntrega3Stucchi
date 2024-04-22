import express from 'express';
const router = express.Router();
import productManager from '../daos/products.dao.js';
import cartManager from '../daos/products.dao.js';
import productsRouter from "./productsModel.router.js"
import cartsRouter from "./cartsModel.router.js"
import usersRouter from "./sessions.router.js"
import UsersDAO from "../daos/users.dao.js";
import passport from 'passport';
import { productsController } from '../controllers/products.controller.js';
import { UserController } from '../controllers/users.controller.js';


//ROUTES
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);
router.use("/api/sessions", usersRouter);


router.get('/', (req, res) => {
  res.redirect('/home');
});


router.get('/home', (req, res) => {
  console.log("/home por aca")
  console.log(req.session)
  if(req.session){
    console.log("res.redirect(/products);")
    res.redirect("/login");
    //productsController.getProductsPaginate(req, res);
  } else {
      res.render("home");
  }

});

// router.get('/register', (req, res) => {
//   res.render("register");
// });


// router.get("/login", (req, res) => {
//   console.log("/login")  
//   console.log(req.session)
//   try {
//     console.log("try products")  
//     res.redirect("/products");
//     // res.render("login", {
// 		// 	title: "Login || Leandro",
// 		// });
// 	} catch (error) {
// 		console.error("Error al procesar la solicitud:", error);
// 	}
// });


router.get("/login", (req, res) => {
  console.log("/login")  
  //console.log(req)
  res.redirect("profile");

  // if(req.session.user){
  //   console.log("/productsModel")  
  //   res.render("products");
  //  } else {
  //     res.render("login");
  // }

})

router.get('/products', productsController.getProductsPaginate);

router.post('/register', UserController.register);

router.get('/profile',UserController.profile);
// router.get('/products',
// async (req, res) => {
//   console.log("views get products")
//   let products = await productsController.getProductsPaginate(req, res);
//   console.log(products)
//   res.render('products', { products });
// });

router.get('/productsNew', async (req, res) => {
  console.log("get productsNew")
  let products = null;
  //let products = await productManager.getProducts();
  //console.log(products)
  res.render('productsNew', { products });
});


router.get('/productsUpd', async (req, res) => {
  console.log("get productsUpd")

  //const story = document.body.querySelector(".update");
  //const dataID = document.getElementById('update').value;
  // let elemento = e.target;
  // let dataID = elemento.getAttribute('data-product-id');
 
  //console.log(dataID)
  //console.log(req.param.id)
  //console.log(req.body)
  //let products = null;
  let products = await productManager.getProductById();
  console.log(products)
  res.render('productsUpd', { products });
});


router.get('/failregister', (req, res) => {
  console.log("Failed Strategy views")
  res.send({error:"Failed"})
})

router.get('/github',passport.authenticate('github',{scope:['user:email']}),async (req,res)=>{console.log('aca github')})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=>{
    console.log('githubcallback')
    req.session.user = req.user;
    res.redirect('/products');
})


// router.get("/products", async (req, res) => {
//   console.log("/products")
//   // if(req.session.user){
//   //     let user = await UsersDAO.getUserByID(req.session.user);
//   //     res.render("profile", {user});

//   // } else {
//   //     res.redirect("/login");
//   // }

// })



// router.get('/products', async (req, res) => {
//   console.log("get products")
//   let products = await productManager.getProducts();
//   //res.render('products', { products });
// });

// router.get('/productsNew', async (req, res) => {
//   console.log("get productsNew")
//   let products = null;
//   //let products = await productManager.getProducts();
//   //console.log(products)
//   res.render('productsNew', { products });
// });

// router.get('/productsUpd', async (req, res) => {
//   console.log("get productsUpd")
//   console.log(req.param.cid)
//   console.log(req.body)
//   let products = null;
//   //let products = await productManager.getProducts();
//   //console.log(products)
//   res.render('productsUpd', { products });
// });



// router.post('/addProduct', (req,res) =>{
//   let body= req.body;
//   console.log('view router.post /addProduct')
//   console.log(req.body)
//   let resultado= productManager.addProduct
//   (body.productTittle,body.productDescription,'',body.productPrice,body.productStock,body.productCode)
//   //  (body.productTittle,body.description,body.thumbnail,body.price,body.stock,body.code);
//   res.render("productsNew",
//               {}
//           );
//   //res.send(resultado);
// })

// router.post('/updProduct', (req,res) =>{
//   let body= req.body;
//   console.log('productsRouter router.put /updProduct')
//   console.log(body)
//   console.log(req.param.cid)
//   res.render("productsUpd",
//   {}
// );

// })



// router.get('/carts', async (req, res) => {
//   console.log("get carts")
//   let carts = await cartManager.readCartByID(cid)
//   res.render('carts', { carts });
// });


export default router;
