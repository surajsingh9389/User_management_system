import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running....");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
