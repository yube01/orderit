import express from "express";
import cors from "cors";
import { sample_foods, sample_tag, sample_users } from "./data";
import jwt, { sign } from "jsonwebtoken"


const app = express()

app.use(express.json())


app.use(cors(
    {
        credentials:true,
        origin:"http://localhost:4200"
    }
))


app.get("/api/foods",(req,res)=>{
    res.send(sample_foods)
})

app.get("/api/foods/search/:searchTerms",(req,res)=>{
    const searchTerms = req.params.searchTerms

    const foods = sample_foods.filter(food=>food.name.toLowerCase().includes(searchTerms.toLowerCase()))
    res.send(foods)
})


app.get("/api/foods/tags",(req,res)=>{
    res.send(sample_tag)
})

app.get("/api/foods/tags/:tagName",(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName))
    res.send(foods)
})

app.get("/api/foods/:foodId",(req,res)=>{
    const foodId =  req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId)
    res.send(food)
})


app.post("/api/users/login",(req,res)=>{
    const {email,password} = req.body
    const user = sample_users.find(user => user.email === email && user.password === password)
    if(user)
    return res.send(generateTokenResponse(user))
    else{
        res.status(400).send("Email or password is not valid")
    }
})

const generateTokenResponse = (user:any)=>{

    const token = jwt.sign({
        email:user.email,isAdmin:user.isAdmin
    },"Access",{
        expiresIn:"30d"
    })

    user.token = token
    return user


}

app.listen(8000,()=>{
    console.log("Server started")
})



