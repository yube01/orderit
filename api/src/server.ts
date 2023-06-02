import express from "express";
import cors from "cors";

import {db} from "./configs/database.config"
import foodRouter from "./router/food.router"
import userRouter from "./router/user.router"

const app = express()



db()




app.use(cors(
    {
        credentials:true,
        origin:"http://localhost:4200"
    }
))


//middleware

app.use("/api/foods",foodRouter)

app.use("/api/users",userRouter)


app.listen(8000,()=>{
    console.log("Server started")
})



