const express=require("express")
const router=express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const userController=require("../controllers/userController")
router.post("/user-registration",userController.userRegistration)
router.post("/login",userController.login)
router.get("/logout",userController.logout)
router.get("/get-profile",authMiddleware.verifyToken,userController.getProfile)
router.post("/task-creation",authMiddleware.verifyToken,userController.taskAllocation)
router.get("/get-task",authMiddleware.verifyToken,userController.getAllTask)
router.put("/edit-task/:id",authMiddleware.verifyToken,authMiddleware.authorise,userController.editTask)
router.delete('/delete-task/:id', authMiddleware.verifyToken, authMiddleware.authorise, userController.deleteTask);
module.exports=router