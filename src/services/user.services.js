import uuid4 from "uuid4";
import Users from "../models/users.model.js";


async function  getUserByEmail(email){
    return await Users.findOne({email});
}

async function getUserByCreds(email, password) {
    return await Users.findOne({email, password});
}

async function insert(first_name, last_name, age, email, password) {
    return await new Users({first_name, last_name, age, email, password}).save();
}

async function getUserByID(id) {
    return await Users.findOne({_id:id}).lean();
}

export const UserServices = {
    getUserByEmail,
    getUserByCreds,
    insert,
    getUserByID,
}