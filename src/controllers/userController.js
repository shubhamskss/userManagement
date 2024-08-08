
const { validateUserName, validateEmail, validatePassword } = require("../validation");
const { findUserByEmail, createUser ,checkUserByEmailAndPassword,getUserDetailsFromId,createTask,getTask,updateTask,deleteTaskById} = require('../db');
const { sendErrorResponse } = require('../errorHandler');
const jwt=require("jsonwebtoken")
const { addTokenToBlacklist } = require('../tokenBlackList');
const { default: mongoose } = require("mongoose");
const userRegistration = async (req, res) => {
    try {
        let { userName, email, password,team,roles } = req.body;

        if (!validateUserName(userName) || !validateEmail(email) || !validatePassword(password)) {
            return sendErrorResponse(res, 422, 'Invalid input data');
        }

        const isEmailAlreadyUsed = await findUserByEmail(email);
        if (isEmailAlreadyUsed) {
            return sendErrorResponse(res, 400, 'Email is already registered');
        }
        //if roles not provided default to user
        if (!roles) {
            roles = ['User'];
        }

        let registerUser = await createUser({ userName, email, password, roles });
        res.status(201).send({ status: true, data: registerUser });

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

const login=async function(req,res){
try{

    let userName = req.body.email;
    if (!userName) {
      return res.status(400).send({ status: false, msg: "please enter email" });
    }
    let password = req.body.password;
    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter password" });
    }
 let savelogin = await checkUserByEmailAndPassword(userName,password)
  if (!savelogin) {
    return res
      .status(400)
      .send({ status: false, msg: "username or password is incorrect" });
  }

let token=await jwt.sign({
    userId:savelogin._id,
    iat:Math.floor(Date.now()/1000),
    exp:Math.floor(Date.now()/1000)+30*60*60
},
"shubham kumar"
)
res.setHeader("authorization",token)

res.status(201).send({ status: true,msg:"sucess",data: token });


}
catch(err){
    console.log(err)
    return res.sendStatus(500);
}
}

const logout = async (req, res) => {
    try {
      
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(400).send({ status: false, msg: 'No token provided' });
        }

     
        addTokenToBlacklist(token);

        res.status(200).send({ status: true, msg: 'Successfully logged out' });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};


const getProfile=async(req,res)=>{
    try{
        let userId=req.user.userId
       if(!userId){return res.sendStatus(422)}
        let getUserDetails=await getUserDetailsFromId(userId)
        if(!getUserDetails){return res.status(400).send("bad request no user that detail found")}
return res.status(200).send(getUserDetails)
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

const taskAllocation=async(req,res)=>{
    try{
        const { title, description, dueDate, priority, status, assignedTo, createdBy } = req.body;

       
        if (!title || !description || !dueDate || !priority || !status || !createdBy ||!assignedTo) {
            return res.status(400).json({ status: false, message: 'Missing required fields' });
        }

      
        const newTask = await createTask( { title, description, dueDate, priority, status, assignedTo, createdBy })
           

       
        res.status(201).json({ status: true, data: newTask });
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}
const getAllTask=async function(req,res){
    try{

let taskDetails=await getTask()
return res.status(200).send(taskDetails)

    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}


const editTask=async function(req,res){
    try{
        let taskId=req.params.id
        if(taskId && mongoose.Types.ObjectId.isValid(taskId)){
        let {title,description,dueDate,priority,status,assignedTo}=req.body
    
       let objectForUpdate={}
if (title) objectForUpdate.title = title;
if (description) objectForUpdate.description = description;
if (dueDate) objectForUpdate.dueDate = dueDate;
if (priority) objectForUpdate.priority = priority;
if (status) objectForUpdate.status = status;
if (assignedTo && mongoose.Types.ObjectId.isValid(assignedTo)) {
  objectForUpdate.assignedTo = assignedTo;
}
if(objectForUpdate && Object.keys(objectForUpdate).length>0){
let taskUpdated=await updateTask(taskId,objectForUpdate)
return res.status(201).send(taskUpdated)}
else{
    return res.status(400).send("bad request nothing to update")
}

}
else{
    return res.status(400).send("bad request")
}


    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}

const deleteTask=async function(req,res){
    try{  
        let taskId=req.params.id
        if(taskId && mongoose.Types.ObjectId.isValid(taskId)){
      
await deleteTaskById(taskId)
return res.status(200).send("ok")

}
     
else{
    return res.status(400).send("bad request")
}


    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}



module.exports = {
    userRegistration,login,logout,getProfile,taskAllocation,getAllTask,editTask,deleteTask
};