import express from "express"
import { addTocart,removeFromcart,getCart } from "../controllers/cartController.js"
import authmiddleware from "../Middlewares/Auth.js";

const cartRouter=express.Router();

cartRouter.post('/add',authmiddleware,addTocart);
cartRouter.post('/remove',authmiddleware,removeFromcart);
cartRouter.post('/get',authmiddleware,getCart);

export default cartRouter;
 