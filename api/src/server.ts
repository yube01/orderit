import express from "express";
import cors from "cors";



const app = express()


app.use(cors(
    {
        credentials:true,
        origin:"http://localhost:4200"
    }
))


app.listen(8000,()=>{
    console.log("Server started")
})


