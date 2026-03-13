import userModel from '../Models/userModel.js';

// add items to cart
const addTocart = async (req, res) => {
try {
const userdata = await userModel.findById(req.body.userId);

```
if (!userdata) {
  return res.json({ success: false, message: "User not found" });
}

let cartData = userdata.cartData || {};

if (!cartData[req.body.itemId]) {
  cartData[req.body.itemId] = 1;
} else {
  cartData[req.body.itemId] += 1;
}

await userModel.findByIdAndUpdate(req.body.userId, { cartData });

res.json({ success: true, message: "Added to cart" });
```

} catch (error) {
console.log(error);
res.json({ success: false, message: "error" });
}
};

// remove items from cart
const removeFromcart = async (req, res) => {
try {
const userdata = await userModel.findById(req.body.userId);

```
if (!userdata) {
  return res.json({ success: false, message: "User not found" });
}

let cartData = userdata.cartData || {};

if (cartData[req.body.itemId] > 0) {
  cartData[req.body.itemId] -= 1;
}

await userModel.findByIdAndUpdate(req.body.userId, { cartData });

res.json({ success: true, message: "Removed from cart" });
```

} catch (error) {
console.log(error);
res.json({ success: false, message: "error" });
}
};

// get cart data
const getCart = async (req, res) => {
try {
const userdata = await userModel.findById(req.body.userId);
} catch (error) {
console.log(error);
res.json({ success: false, message: "error" });
}
};

export { addTocart, removeFromcart, getCart };
