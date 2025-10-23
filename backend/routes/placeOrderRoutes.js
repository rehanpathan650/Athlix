const express = require("express");
const router = express.Router();
const PlacedOrder = require("../models/PlaceOrder");

// Place order
router.post("/place", async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    const order = new PlacedOrder({
      user: userId,
      items,
      totalPrice,
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get orders for user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await PlacedOrder.find({ user: req.params.userId }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Cancel order
router.delete("/cancel/:orderId", async (req, res) => {
  try {
    const order = await PlacedOrder.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Optional: prevent deleting shipped/delivered orders
    if (order.status !== "Pending") {
      return res
        .status(400)
        .json({ error: "Only pending orders can be cancelled" });
    }

    await order.deleteOne();
    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
