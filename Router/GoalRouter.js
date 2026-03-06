import express from "express";
const router = express.Router();

import goalModel from "../Model/GoalModel.js";
import authmiddleware from "../Middlewares/authMiddleware.js";


// CREATE GOAL
router.post("/create", authmiddleware, async (req, res, next) => {
  try {

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const goal = new goalModel({
      title: title,
      user: req.user,
    });

    await goal.save();

    res.status(201).json({
      success: true,
      message: "Goal created successfully",
      data: goal,
    });

  } catch (err) {
    next(err);
  }
});


// GET SINGLE GOAL
router.get("/:id", authmiddleware, async (req, res, next) => {
  try {

    const goal = await goalModel.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });

  } catch (error) {
    next(error);
  }
});


// UPDATE GOAL
router.put("/:id", authmiddleware, async (req, res, next) => {
  try {

    const goal = await goalModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { completed: req.body.completed },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal updated successfully",
      data: goal,
    });

  } catch (error) {
    next(error);
  }
});


// DELETE GOAL
router.delete("/:id", authmiddleware, async (req, res, next) => {
  try {

    const goal = await goalModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });

  } catch (error) {
    next(error);
  }
});

export default router;