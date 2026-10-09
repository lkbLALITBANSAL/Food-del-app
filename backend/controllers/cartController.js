
import userModel from "../Models/userModel.js";

// Add items to cart
const addTocart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const userdata = await userModel.findById(userId);

    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userdata.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, {
      $set: { cartData },
    });

    return res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Remove items from cart
const removeFromcart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const userdata = await userModel.findById(userId);

    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userdata.cartData || {};
    const quantity = cartData[itemId] || 0;

    if (quantity <= 1) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity - 1;
    }

    await userModel.findByIdAndUpdate(userId, {
      $set: { cartData },
    });

    return res.json({
      success: true,
      message: "Removed from cart",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get cart data
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    const userdata = await userModel.findById(userId);

    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      cartData: userdata.cartData || {},
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addTocart, removeFromcart, getCart };
