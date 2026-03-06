import mongoose from "mongoose";
import goalSchema from "../Schema/GoalSchema.js";

const goalModel = mongoose.model("Goal", goalSchema);

export default goalModel;