import { Schema, model } from "mongoose";


export interface food{
    id:string;
    name:string;
    price:number;
    tags: string[];
    favorite:boolean;
    stars: number;
    imageUrl: string;
    origins: string[];
    cookTime:string;
}


export const FoodSchema  = new Schema<food>({

    name:{type:String, required:true},
    price:{type:Number, required:true},
    tags:{type:[String]},
    stars:{type:Number, required:true},
    imageUrl:{type:String, required:true},
    origins:{type:[String], required:true},
    cookTime:{type:String, required:true},
    favorite:{type:Boolean, default:false},


},
{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true   
    },
    timestamps:true
    

}

)


export const FoodModel = model<food>('food',FoodSchema)