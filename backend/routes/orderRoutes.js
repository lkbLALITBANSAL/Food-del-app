
import express from "express"

import authmiddleware from "../Middlewares/Auth.js"
import adminAuth from "../Middlewares/adminAuth.js"

import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder
} from "../controllers/orderController.js"

const orderRouter = express.Router()

// Customer authentication
orderRouter.post("/place", authmiddleware, placeOrder)
orderRouter.post("/userorders", authmiddleware, userOrders)

// Payment callback/result endpoint
orderRouter.post("/verify", verifyOrder)

// Admin only
orderRouter.get("/list", adminAuth, listOrders)
orderRouter.post("/status", adminAuth, updateStatus)

export default orderRouter
