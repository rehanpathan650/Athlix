import express from "express";
import connectDB from "./config/db.js";
import cors from"cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"; // 👈 ADD THIS
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/placeOrderRoutes.js";

const app = express();
dotenv.config()
// connect to DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes); // 👈 ADD THIS LINE
app.use("/api/auth", authRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// start server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
