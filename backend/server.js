import express from 'express'
import cors from "cors"
import { connectDB } from './Config/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
 
//app config
const app=express()
const port=4000
     
//middleware
app.use(express.json()) 
app.use(cors())

//DB connection
connectDB();
   
//api endpoint ,   router
app.use("/api/food",foodRouter) 
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})  
 
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`) 
})

// mongodb+srv://lalitbansal:8875228322@cluster0.m1zlvew.mongodb.net/?
  