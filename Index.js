import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./Router/AuthRouter.js";
import goalRouter from "./Router/GoalRouter.js";
import errorMiddleware from "./Middlewares/errormiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// MongoDB connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/goals", goalRouter);

// Error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});