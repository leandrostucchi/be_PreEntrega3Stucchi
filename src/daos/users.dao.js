import { UserServices } from "../services/user.services.js";

class UsersDAO {
    static  getUserByEmail(email){
        console.log("getUserByEmail"+ email)
        let dato =  UserServices.getUserByEmail({email});
        console.log(" luego de leer getUserByEmail")
        console.log(dato)
        return dato;

    }
    static getUserByCreds(email, password) {
        return UserServices.getUserByCreds({email, password});
    }
    static insert(first_name, last_name, age, email, password) {
        return UserServices.insert(first_name, last_name, age, email, password);
    }
    static getUserByID(id) {
        return UserServices.getUserByID({_id:id}).lean();
    }
}

export default UsersDAO;
