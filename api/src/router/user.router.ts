import Router from "express"
import { sample_users } from "../data"
import jwt from "jsonwebtoken"
import ascyncHandler from "express-async-handler"
import { UserModel } from "../models/user.model"

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
        const BAD_REQUEST = 400;
        res.status(BAD_REQUEST).send("User or password is invalid!");
    }


}))

const generateTokenResponse = (user:any)=>{

    const token = jwt.sign({
        email:user.email,isAdmin:user.isAdmin
    },"Access",{
        expiresIn:"30d"
    })

    user.token = token
    return user


}


export default router