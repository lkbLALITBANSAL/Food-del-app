import userModel from '../Models/userModel.js'

//add items in cart
const addTocart=async (req,res)=>{
    try {
         const userdata=await userModel.findOne({_id:req.body.userId});
   const cartData=await userdata.cartData;
   //if there is no selected item in cart then 
   if(!cartData[req.body.itemId]){
    cartData[req.body.itemId]=1;
   }else{
    cartData[req.body.itemId]+=1;
   }
   await userModel.findByIdAndUpdate(req.body.userId,{cartData})
   res.json({success:true,message:"added to cart"});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"erorr"})
    }
  
}

//remove from cart
const removeFromcart= async(req,res)=>{
try {
    let userdata=await userModel.findById(req.body.userId);
    let cartData=userdata.cartData;
    if(cartData[req.body.itemId]>0){
cartData[req.body.itemId]-=1;
    }

    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"removed by cart"})

} catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
}
}

//fetch user cart data
const getCart=async(req,res)=>{
try {
    const userdata=await userModel.findById(req.body.userId);
    const cartData=userdata.cartData;
    res.json({success:true,cartData})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
}
}

export {addTocart,removeFromcart,getCart};