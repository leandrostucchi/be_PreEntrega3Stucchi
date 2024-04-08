import uuid4 from "uuid4";
import Users from "../models/users.model.js";


function  getUserByEmail(email){
    return  Users.findOne({email});
}

function getUserByCreds(email, password) {
    return Users.findOne({email, password});
}

function insert(first_name, last_name, age, email, password) {
    return new Users({first_name, last_name, age, email, password}).save();
}

function getUserByID(id) {
    return Users.findOne({_id:id}).lean();
}

export const UserServices = {
    getUserByEmail,
    getUserByCreds,
    insert,
    getUserByID,
}