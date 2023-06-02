import { Schema, model } from "mongoose";


export interface user{
    id:string;
    email:string;
    name:string;
    address:string;
    token:string;
    isAdmin:boolean;
}


export const UserSchema = new Schema<user>(
    {
        name:{type:String, required:true},
        address:{type:String, required:true},
        email:{type:String, required:true,unique:true},
        token:{type:String, required:true},
        isAdmin:{type:Boolean, required:true},

        

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

export const UserModel = model<user>('user',UserSchema)