const axios = require("axios");
const Todo = require("../models/Todo");

exports.fetchAndSaveTodo = async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    const { id, title, completed } = response.data;

    const todo = await Todo.create({
      todoId: id,
      title,
      completed,
    });

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch external API",
      error: error.message,
    });
  }
};
