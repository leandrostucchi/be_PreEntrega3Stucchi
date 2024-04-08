import express from 'express'
const cartsRouter = express.Router();
import { cartsController } from '../controllers/carts.controller.js';

//? http://localhost:8090/api/carts/1
cartsRouter.get('/:cid', cartsController.getCartById);

//? http://localhost:8090/api/carts/

cartsRouter.post('/', cartsController.InitCarts);

//? http://localhost:9080/api/carts/1/product/1
/*
{
    "quantity": 12
}
*/
cartsRouter.put('/modCart/:cid/product/:pid', cartsController.updateCart);

//? http://localhost:9080/api/carts/1/product/1

cartsRouter.delete('/:cid/product/:pid', cartsController.delCartsOnlyProduct);


//? http://localhost:9080/api/carts/1/product

cartsRouter.delete('/:cid/product', cartsController.delCarts);

export default cartsRouter;