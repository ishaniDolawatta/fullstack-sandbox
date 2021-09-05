const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create TodoList schema & model
const todoListItem = new Schema({
  id: {
    type: String,
    required: [true, "Id field is required"],
  },
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completeAt: {
    type: Date,
  },
});


const TodoListSchema = new Schema({
  id: {
    type: String,
    required: [true, "Id field is required"],
  },
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  todoItems: [todoListItem],
});

const TodoList = mongoose.model("todoList", TodoListSchema);

module.exports = TodoList;
