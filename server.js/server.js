import express from "express";
import mongoose from "mongoose";

import authRouter from "./Router/AuthRouter.js";
import goalRouter from "./Router/GoalRouter.js";
import errormiddleware from "./Middlewares/errormiddleware.js";

const app = express();

app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/microgoal")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/api/auth", authRouter);
app.use("/api/goals", goalRouter);

// error middleware
app.use(errormiddleware);

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});