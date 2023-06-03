import Router from "express"
import { sample_foods, sample_tag } from "../data"
import ascyncHandler from "express-async-handler"
import { FoodModel } from "../models/food.model"
const router = Router()


router.get("/seed",ascyncHandler(
    async(req,res)=>{
        const foodCounts = await FoodModel.countDocuments()

        if(foodCounts>0)
        {
            res.send("Seed is already done")
            return
        }

        await FoodModel.create(sample_foods)
        res.send("Seed is done")
    }
  
))


router.get("/",ascyncHandler(async(req,res)=>{
    const foods = await FoodModel.find()
    res.send(foods)
}))

router.get("/search/:searchTerms",ascyncHandler(async(req,res)=>{

    const regRex = new RegExp(req.params.searchTerms,"i")
    const foods = await FoodModel.find({name:{$regex:regRex}})
    

   
    res.send(foods)
}))


router.get("/tags",ascyncHandler(async(req,res)=>{
    const tags = await FoodModel.aggregate([
        {
            $unwind:"$tags"
        },{
            $group:{
                _id:'$tags',
                count:{$sum:1}
            }
        },{
            $project:{
                _id:0,
                name:"$_id",
                count:"$count"
            }
        }
    ]).sort({count:-1})   //descending order


    const all = {
        name:"All",
        count:await FoodModel.countDocuments()
    }

    tags.unshift(all)   //adds at the beginning of an tags
    res.send(tags)
}))

router.get("/tags/:tagName",ascyncHandler(async(req,res)=>{
    const foods = await FoodModel.find({tags:req.params.tagName})
    res.send(foods)
}))

router.get("/:foodId",ascyncHandler(async(req,res)=>{
    const food = await FoodModel.findById(req.params.foodId)
    res.send(food)
}))


export default router