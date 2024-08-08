const userModel = require("../src/models/user"); // Adjust path as needed
const task=require("../src/models/task")
const findUserByEmail = (email) => {
    return userModel.findOne({ email });
};

const createUser = (userData) => {
    return userModel.create(userData);
};
const checkUserByEmailAndPassword=(email,password)=>{
    return userModel.findOne({ email:email,password:password });
}
const getUserDetailsFromId=(id)=>{
    return userModel.findById(id).select({userName:1,email:1,roles:1,_id:0})
}
const createTask=(data)=>{return task.create(data)}
const getTask=()=>{return task.find()}
const updateTask=(id,data)=>{
    return task.findByIdAndUpdate(id,{$set:data},{new:true})
}
const deleteTaskById=(id)=>{
    return task.findByIdAndDelete(id)
}
module.exports = {
    findUserByEmail,
    createUser,
    checkUserByEmailAndPassword,
    getUserDetailsFromId,
    createTask,
    getTask,
    updateTask,
    deleteTaskById
};
