import express from 'express'
import productManager from "../daos/products.dao.js"
import cartManager from "../daos/carts.dao.js" 
const cartsRouter = express.Router();

import CartsDAO from '../daos/carts.dao.js';


//? http://localhost:8090/api/carts/1
async function getCartById (req,res){
    const cid = parseInt(req.params.cid) || null;
    let resultado= null;
    console.log('leer cart  [' + cid +']')
    try {
        if(cid){
            resultado = await CartsDAO.getCartById(cid)
            console.log(resultado)
        }            
        res.status(200).send({
            status:200,
            result:"success",
            payload:resultado
        })
    } catch (error) {
        console.log(`Mensaje de error: ${error}`)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error getting data from DB"
        });
    }
}

//? http://localhost:8090/api/carts/

async function InitCarts (req,res){
    let resultado= null;
    console.log("post")
    try {
        resultado = await CartsDAO.InitCarts()
        console.log(resultado)
        res.status(200).send({
            status:200,
            result:"success",
            payload:resultado
        })
    } catch (error) {
        console.log(`Mensaje de error: ${error}`)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error getting data from DB"
        });
    }
}

//? http://localhost:9080/api/carts/1/product/1
/*
{
    "quantity": 12
}
*/

async function updateCart (req,res){
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    let body= req.body;
    let resultadoCart = await cartManager.getCartById(cid)
    let resultadoProduct = await productManager.getProductById(pid)
    console.log("/modCart/:cid/product/:pid")
    if(resultadoCart && resultadoProduct){
        let resultado= null;
        try {
            let cantidad = 1;
            if(body.quantity){
                cantidad = body.quantity;
            }
            if(!resultadoCart.product) resultadoCart.product = []
            let producto = null
            if(resultadoCart == null || resultadoCart.product.length== 0){
                producto = [{pid:pid,quantity:cantidad,_id:resultadoProduct._id}]
            }else{
                let productOut = resultadoCart.product.some(x => x.pid != pid) ? resultadoCart.product.find(x => x.pid != pid): null;
                let productIn  = resultadoCart.product.some(x => x.pid == pid) ?resultadoCart.product.find(x => x.pid == pid) : null
                if (!productOut && !productIn){
                    producto = [{pid:pid,quantity:cantidad,_id:resultadoProduct._id}]
                } else if (!productOut && productIn){
                        producto = [{pid:pid,quantity:productIn.quantity + cantidad,_id:resultadoProduct._id}]
                } else if (productOut && productIn){
                    producto = [{pid:pid,quantity:productIn.quantity + cantidad,_id:resultadoProduct._id}]
                }else if (productOut && !productIn){
                    producto = [{pid:pid,quantity:cantidad,_id:resultadoProduct._id},productOut]
                }
            }
            resultado= await cartManager.updateCart(resultadoCart,producto)
            res.status(200).send({
                status:200,
                result:"success",
                payload:resultado
            })
        } catch (error) {
            console.log(`Mensaje de error: ${error}`)
            res.status(500).send({
                status:500,
                result:"error",
                error:"Error getting data from DB"
            });
        }
    }else{
        if(!resultadoCart){
            console.log(`Mensaje de Warning: Warning: Cart Not Found ${cid}`)
            res.status(100).send({
                status:100,
                result:"warning",
                error: `Warning: Cart Not Found ${cid}`
            });
            res.send(`Cart Not Found ${cid}` )
        } 
        if(!resultadoProduct){
            console.log(`Mensaje de Warning: Warning: Product Not Found ${cid}`)
            res.status(100).send({
                status:100,
                result:"warning",
                error: `Warning: Product Not Found ${cid}`
            });
        } 
    }
}

//? http://localhost:9080/api/carts/1/product/1

async function delCartsOnlyProduct (req,res){
    console.log("delete")
    const cid = parseInt(req.params.cid) || null;
    const pid = parseInt(req.params.pid) || null;
    let resultado= null;
    console.log('leer cart  [' + cid +']')
    console.log('leer product  [' + pid +']')
    try {
        let resultadoCart = await cartManager.getCartById(cid)
        let resultadoProduct = await productManager.getProductById(pid)
        resultado = await cartManager.delCartsOnlyProduct(resultadoCart._id,resultadoProduct._id)
        console.log(resultado)

        res.status(200).send({
            status:200,
            result:"success",
            payload:resultado
        })
    } catch (error) {
        console.log(`Mensaje de error: ${error}`)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error getting data from DB"
        });
    }
}

//? http://localhost:9080/api/carts/1/product

async function delCarts (req,res){
    console.log("delete")
    const cid = parseInt(req.params.cid) || null;
    let resultado= null;
    console.log('leer cart  [' + cid +']')
    try {
        let resultadoCart = await cartManager.getCartById(cid)
        resultado = await cartManager.delCarts(resultadoCart._id)
        console.log(resultado)

        res.status(200).send({
            status:200,
            result:"success",
            payload:resultado
        })
    } catch (error) {
        console.log(`Mensaje de error: ${error}`)
        res.status(500).send({
            status:500,
            result:"error",
            error:"Error getting data from DB"
        });
    }
}





export const cartsController  = {
    getCartById,
    InitCarts,
    updateCart,
    delCartsOnlyProduct,
    delCarts,
}