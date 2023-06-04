import {connect} from 'mongoose';


export const db =async()=>{
try {

    await connect(`mongodb+srv://yube:yube08@orderitdb.eibagvp.mongodb.net/?retryWrites=true&w=majority`)
    console.log("DB connected")
    
} catch (error) {
    console.log(error)
}
}