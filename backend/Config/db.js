import mongoose from "mongoose";

export const connectDB=async ()=>{
   await mongoose.connect('mongodb+srv://lalitbansal:8875228322@cluster0.m1zlvew.mongodb.net/food-del').then(()=>{
    console.log("DB connected")
   })
}