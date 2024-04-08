import { ProductsServices } from "../services/product.services.js";

class ProductsDAO {
    static pid = 0;
    static async getProducts() {
        console.log("antes getProductos")
        return ProductsServices.getProducts();
    }

    static async getProductsPaginate(funcion,seteo) {
        console.log("antes getProductos paginate")
        return ProductsServices.getProductsPaginate(funcion,seteo);
    }

    static async getProductByLimit(limit) {
        console.log("antes getProductos getProductByLimit")
        return ProductsServices.getProductByLimit(limit);
    }

    static async getProductById(id) {
        return ProductsServices.getProductById(id);
    }

    static async addProduct(title, description, thumbnail, price, stock,code) {
        return ProductsServices.addProduct(title, description, thumbnail, price, stock,code);
    }

     static async updateProduct(data, newData) {
        return ProductsServices.updateProduct(data, newData);
    }
     static async deleteProduct(id) {
        return ProductsServices.deleteProduct(id);
    }
}

export default ProductsDAO;
