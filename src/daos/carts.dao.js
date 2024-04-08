import { CartServices } from "../services/cart.services.js";

class CartsDAO {

    static async getCarts() {
        console.log("antes getCarts")
        return CartServices.getCarts();
    }
    static async getCartById(id) {
        return CartServices.getCartById(id);
    }

    static async getCartByCIdAndPid(cid,pid) {
        return CartServices.getCartByCIdAndPid(cid,pid);
    }


    static async InitCarts() {
        console.log("InitCarts")
        return CartServices.InitCarts();
    }


    static async AddCarts(cid,pid,quantity) {
        console.log("addCart")
        return CartServices.AddCarts(cid,pid,quantity);
    }



     static async updateCart(data, newData) {
        console.log("updatcart")
        //console.log(data)
        //console.log(newData)
        console.log({product:newData})
        return CartServices.updateCart(data, newData);
    }

    static async delCartsOnlyProduct(cid,pid) {
        console.log("delCartsOnlyProduct")
        return CartServices.delCartsOnlyProduct(cid,pid);
    }

    static async delCarts(cid) {
        console.log("delCarts")
        return CartServices.delCarts(cid);
    }


}


export default CartsDAO;