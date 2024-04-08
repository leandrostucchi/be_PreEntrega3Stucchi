import express from 'express'
const productsRouter = express.Router();
import { productsController } from '../controllers/products.controller.js';

//? http://localhost:8000/api/products/ ==> trae todo
//? http://localhost:8000/api/products/?limit=2 ==> trae limitado
    // console.log(new PaginationParameters(req).query.sort);
    // console.log(new PaginationParameters(req).get());
    // console.log(req.query)

productsRouter.get('/products' ,productsController.getProductsPaginate);

//? http://localhost:8000/api/products/1

productsRouter.get('/:pid', productsController.getProductById)


//? http://localhost:8000/api/products/
/* body 
{
    "tittle": "producto prueba3",
    "description": "Este es un producto prueba3",
    "price": 2,
    "thumbnail": "Sin imagen3",
    "code": "abc333",
    "stock": 21
}

*/
productsRouter.post('/addProduct', productsController.addProduct);
 
//? http://localhost:8000/api/products/
/*
{
    "tittle": "producto prueba1",
    "description": "Este es un producto prueba1",
    "price": 200,
    "thumbnail": "Sin imagen1",
    "code": "abc125",
    "stock": 25,
    "id": 1
} 
 */
productsRouter.put('/updProduct',productsController.updateProduct);

productsRouter.post('/updProduct/:pid', productsController.updateProductbyId);


//? http://localhost:8000/api/products/1
//? http://localhost:9080/api/products/deleteProduct/:id

productsRouter.delete("/deleteProduct/:id", productsController.deleteById);

export default productsRouter;