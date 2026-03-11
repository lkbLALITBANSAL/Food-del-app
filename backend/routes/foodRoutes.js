import express from 'express'
import { addFood ,foodlist,removefood} from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter=express.Router();

//Image storage engine using multer
//here cb=>callback
//here files will be saved in uploads folder, using date.now() for unique filename everytime
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


//middleware
const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood);
//to use this router => http://localhost:/api/food/add

foodRouter.get("/list",foodlist)
foodRouter.post("/remove",removefood)
 

export default foodRouter;