import uuid4 from "uuid4";
import ProductModel from "../models/products.model.js";

async function getProducts() {
    console.log("antes getProductos")
    return await ProductModel.find().lean();
}


async function getProductsPaginate(funcion,seteo) {
    console.log("antes getProductsPaginate")    
    console.log (funcion)
    console.log(seteo)
    console.log("antes getProductos paginate")
    return await ProductModel.paginate(funcion,seteo)
}

async function getProductByLimit(limit) {
    console.log("antes getProductos getProductByLimit")
    return await ProductModel.find().limit(limit).lean();
}

async function getProductById(id) {
    return await ProductModel.findOne({ id: id }).lean();
}

async function addProduct(title, description, thumbnail, price, stock,code) {
    let pid = uuid4();
    console.log("addProduct")
    console.log('datos:' + title +'*'+ description +'*'+ thumbnail +'*'+ price +'*'+ stock +'*'+code  +'*'+pid +'*')
    return await new Products({title, description, thumbnail, price, stock,code,id: pid}).save();
}

async function updateProduct(data, newData) {
    return await ProductModel.findByIdAndUpdate({_id:data._id},{$set: newData})
                        .then(success => console.log('Actualizacion OK'))
                        .catch(error =>{
                                if(error){
                                    console.log('Error al actualizar ' + error);
                                    process.exit();
                                }
                });
}

async function deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
}

export const ProductsServices = {
     getProducts,
     getProductsPaginate,
     getProductByLimit,
     getProductById,
     addProduct,
     updateProduct,
     deleteProduct,
}


