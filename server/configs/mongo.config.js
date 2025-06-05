import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()


export const connecteDB=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("conected to DB")
} catch (error) {
    console.log("Error at connecting db")
}
}