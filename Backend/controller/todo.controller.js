const Todo = require("../model/todo.schema");
exports.create_todo = async (req, res) => {
  const { title, content, labels, background_color, pinned, completed, user_id, } = req.body;
  try {
    const newTodo = await Todo.create({ title, content, labels, background_color, pinned, completed, user_id });
    return res.status(200).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.get_todo = async (req, res) => {
  const { userId } = req.query;

  try {
    const todo = await Todo.find({ user_id: userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.delete_todo = async (req, res) => {
  const { todo_id } = req.query;
  if (!todo_id) {
    return res.status(400).json({
      success: false,
      message: "Todo_id is required",
    });

  }
  try {
    const todo = await Todo.findByIdAndDelete(todo_id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
     
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.update_todo = async (req, res) => {
  const { title, content, labels, removelabel, background_color, pinned, completed, userId } = req.body;
  const { todo_id } = req.query;
  const updated_object = {};
  if (title) {
    updated_object.title = title;
  }
  if (labels) {
    updated_object.$push = { labels: labels }
  }
  if (removelabel) {
    updated_object.$pull = { labels: removelabel }
  }
  if (background_color) {
    updated_object.background_color = background_color;
  }
  if (completed) {
    updated_object.completed = completed;
  }
  if (pinned) {
    updated_object.pinned = pinned;
  }
  if (content) {
    updated_object.content = content;
  }
  if (userId) {
    updated_object.user_id = userId;
  }
  try {
    const updated_todo = await Todo.findByIdAndUpdate(todo_id, updated_object, { new: true, });
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updated_todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};