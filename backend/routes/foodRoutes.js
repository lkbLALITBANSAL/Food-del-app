
import express from 'express'
import {
  addFood,
  foodlist,
  removefood
} from '../controllers/foodController.js'
import multer from 'multer'
import adminAuth from '../Middlewares/adminAuth.js'

const foodRouter = express.Router()

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

// Public: customers can browse food
foodRouter.get("/list", foodlist)

// Admin only: add food
foodRouter.post(
  "/add",
  adminAuth,
  upload.single("image"),
  addFood
)

// Admin only: remove food
foodRouter.post(
  "/remove",
  adminAuth,
  removefood
)

export default foodRouter
