

const { isTokenBlacklisted } = require('../tokenBlackList');
const jwt = require('jsonwebtoken');
let mongoose=require('mongoose')
const JWT_SECRET = "shubham kumar"; 
const task=require("../models/task")

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };

let verifyToken = function (req, res, next) {
  try {
    let token =  req.headers['authorization'];;
    if (!token) {
      return res.status(404).send({ status: false, msg: "token not found" });
    }
    if (isTokenBlacklisted(token)) {
       
        return res.status(401).send({ status: false, msg: 'Token is blacklisted' });
    }
    let decodetoken = jwt.verify(token, JWT_SECRET);
    req.user = decodetoken
   
    if (!decodetoken) {
      return res
        .status(401)
        .send({ status: false, msg: "you are not authenticated" });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};
// ===================================================================================================
let authorise = async function (req, res, next) {
  try {
    let taskId = req.params.id;
    
    if (!taskId) {
      return res
        .status(400)
        .send({ status: false, msg: "taskId is required for authorisation" });
    }
    if(!isValidObjectId(taskId)){return res.status(400).send({status:false,msg:"invalid taskId"})}
    let token =req.headers['authorization'];
    let decodetoken = jwt.verify(token, JWT_SECRET);
    if (!decodetoken) {
      return res
        .status(401)
        .send({ status: false, msg: "you are not authenticated" });
    }
    let taskid = await task.findById(taskId);
    
if(!taskid){return res.status(404).send({status:false,msg:"no document found with given id"})}
    let taskAssignedTo = taskid.assignedTo;
    let taskAssignedBy=taskid.createdBy;
    let userloggedin = decodetoken.userId;
    if(!isValidObjectId(taskAssignedTo)){return res.status(400).send({status:false,msg:"bad request"})}
    if(!userloggedin){return res.status(400).send({status:false,msg:"bad request"})}

    if (taskAssignedTo != userloggedin &&taskAssignedBy!= userloggedin) {
      return res
        .status(403)
        .send({ status: false, msg: "you are not authorised" });
      
    }
    next()
  
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

module.exports = {
    verifyToken,
    authorise
};










