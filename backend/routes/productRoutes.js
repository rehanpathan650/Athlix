import express from "express";
const router = express.Router();
import Product from "../models/Products.js";

// Add multiple products at once (bulk insert)
router.post("/bulk", async (req, res) => {
  try {
    const products = req.body;
    const saved = await Product.insertMany(products);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
