import Router from "express"
import { sample_users } from "../data"
import jwt from "jsonwebtoken"
import ascyncHandler from "express-async-handler"
import { User, UserModel } from "../models/user.model"
import { BAD_REQUEST } from "../constants/http_status"
import bycrypt from "bcryptjs"



const router = Router()



router.get("/seed",ascyncHandler(
    async(req,res)=>{
        const foodCounts = await UserModel.countDocuments()

        if(foodCounts>0)
        {
            res.send("Seed is already done")
            return
        }

        await UserModel.create(sample_users)
        res.send("Seed is done")
    }
  
))



router.post("/login",ascyncHandler(async(req,res)=>{
    const {email,password}  = req.body;
    const user = await UserModel.findOne({email,password})

    if(user)
    {
        res.send(generateTokenResponse(user))

    }else{
        
        res.status(BAD_REQUEST).send("User or password is invalid!");
    }


}))


router.post("/register",ascyncHandler(async(req,res)=>{
    

    const {name,email,password,address} = req.body;
    const user = await UserModel.findOne({email})
    if(user){
        res.status(BAD_REQUEST).send("Email already used, please login")
        return;

    }

    const hasedPassword = await bycrypt.hash(password,10);

    const newUser:User = {
        id:'',
        name,
        email: email.toLowerCase(),
        password:hasedPassword,
        address,
        isAdmin:false

    }
    const dbUser =await UserModel.create(newUser)
    res.send(generateTokenResponse(dbUser))



}))

const generateTokenResponse = (user:User)=>{

    const token = jwt.sign({
        email:user.email,isAdmin:user.isAdmin
    },"Access",{
        expiresIn:"30d"
    })

    return{
        id:user.id,
        email: user.email,
        address: user.address,
        isAdmin:user.isAdmin,
        name:user.name,
        token:token
    }


}


export default router