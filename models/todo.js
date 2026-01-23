const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todoId: Number,
    title: String,
    completed: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
