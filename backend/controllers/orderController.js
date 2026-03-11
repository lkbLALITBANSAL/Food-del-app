import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user oreder from frontend
const placeOrder=async (req,res)=>{

    const frontend_url="http://localhost:5173"
  try {
    const newOrder=new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })

    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
  price_data: {
    currency: "usd",
    product_data: {
      name: item.name
    },
    unit_amount: item.price * 100
  },
  quantity: item.quantity
}));


    //push delivery chages in line items
    line_items.push({
        price_data:{
            currency:"usd",
            product_data:{
                name:"Delivery charges",
            },
            unit_amount:2*100
        },
        quantity:1
    })

    const session=await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:"payment",
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({success:true,session_url:session.url})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }
}

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res.json({ success: false, message: "Order not found" });
      }
      order.payment = true;
      await order.save();
      await userModel.findByIdAndUpdate(order.userId, {
        cartData: {}
      });
      return res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "error" });
  }
};

//fetch user  all orders , 
const userOrders=async (req,res)=>{
  try {
    //fetch all orders from ordermodel with id similar to user id 
    const orders=await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"});
  }
}

//listing all orders for admin pannel, will check this via postman
const listOrders=async(req,res)=>{
try {
  const order=await orderModel.find({});
  res.json({success:true,data:order});
} catch (error) {
  console.log(error);
  res.json({success:false,message:"error"})
}
}

//api for update order status, will test via postman
const updateStatus=async(req,res)=>{
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"status updated"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"error"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};