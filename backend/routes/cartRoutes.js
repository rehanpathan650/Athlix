const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add/update cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId });
    }

    if (!cart) {
      cart = new Cart({ user: userId || null, items: [] });
    }

    const index = cart.items.findIndex(item => item.product.toString() === productId);
    if (index !== -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (quantity < 0) return res.status(400).json({ error: "Quantity cannot be negative" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index !== -1) {
      if (quantity === 0) {
        // Remove item if quantity is zero
        cart.items.splice(index, 1);
      } else {
        cart.items[index].quantity = quantity; // set new quantity
      }
    } else if (quantity > 0) {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/clear/:userId", async (req, res) => {
  try {
    await Cart.updateOne({ user: req.params.userId }, { $set: { items: [] } });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});


module.exports = router;
