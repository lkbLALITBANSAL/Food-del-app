import foodModel from "../Models/foodModel.js";

import fs from 'fs'

//add food item

const addFood=async (req,res)=>{
   if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "Image is required"
    })
}

let image_filename = req.file.filename;


    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
        
    })

    try {
        await food.save()
        res.json({success:true,message:"food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
 

}
//add food list
const foodlist = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

//remove food 
const removefood = async (req, res) => {
    try {
        const { id } = req.body; 

        if (!id) {
            return res.json({ success: false, message: "ID is required" });
        }

        const food = await foodModel.findById(id);

        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log(err);
        });

        await foodModel.findByIdAndDelete(id);

        res.json({ success: true, message: "food removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "eroor" });
    }
};



export {addFood,foodlist,removefood}