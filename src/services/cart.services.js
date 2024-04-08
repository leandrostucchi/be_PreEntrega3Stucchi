import uuid4 from "uuid4";
import CartModel from "../models/carts.model.js";

async function getCarts() {
    console.log("antes getCarts")
    return await CartModel.find().lean();
}
async function getCartById(id) {
    return await CartModel.findOne({ cid: id }).lean();
}

async function getCartByCIdAndPid(cid,pid) {
    return await CartModel.findOne({ cid: cid,product:[{pid:pid}] }).lean();
}

async function InitCarts() {
    console.log("InitCarts")
    let vcid = uuid4();
    return await new CartModel({cid:vcid}).save();
}


async function AddCarts(cid,pid,quantity) {
    //let pcid = uuid4();
    console.log("addCart")
    return await  new CartModel({cid:cid,product:[]}).save();
}



async function updateCart(data, newData) {
    console.log("updatcart")
    //console.log(data)
    //console.log(newData)
    console.log({product:newData})
    return await  CartModel.findByIdAndUpdate({_id:data._id},{$set:{product:newData}})
                            .then(success =>console.log('Actualizacion OK')
                            )
                            .catch(error =>{
                                    if(error){
                                        console.log('Error al actualizar ' + error);
                                        process.exit();
                                    }
                    });
}

async function delCartsOnlyProduct(cid,pid) {
    console.log("delCartsOnlyProduct")
    return await CartModel.updateOne ({ _id: cid},{ $pull:{ product:{_id:pid}} })
                        .then(success => console.log('Se borro el registro'))
                        .catch(error =>{
                                if(error){
                                    console.log('Error al actualizar ' + error);
                                    process.exit();
                                }
                            });
}

async function delCarts(cid) {
    console.log("delCarts")
    return await CartModel.findByIdAndDelete({ _id: cid }) 
                .then(success => console.log('Se borro el registro'))
                .catch(error =>{
                        if(error){
                            console.log('Error al actualizar ' + error);
                            process.exit();
                        }
                    });
}

export const CartServices = {
     getCarts,
     getCartById,
     getCartByCIdAndPid,
     InitCarts,
     AddCarts,
    updateCart,
     delCartsOnlyProduct,
     delCarts,
}
    