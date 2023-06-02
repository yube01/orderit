import Router from "express"
import { sample_foods, sample_tag } from "../data"

const router = Router()


router.get("/",(req,res)=>{
    res.send(sample_foods)
})

router.get("/search/:searchTerms",(req,res)=>{
    const searchTerms = req.params.searchTerms

    const foods = sample_foods.filter(food=>food.name.toLowerCase().includes(searchTerms.toLowerCase()))
    res.send(foods)
})


router.get("/tags",(req,res)=>{
    res.send(sample_tag)
})

router.get("/tags/:tagName",(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName))
    res.send(foods)
})

router.get("/:foodId",(req,res)=>{
    const foodId =  req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId)
    res.send(food)
})


export default router