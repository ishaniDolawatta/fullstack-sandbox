const express = require("express");
const Joi = require("joi");
const router = express.Router();
const TodoList = require("../models/TodoList");

// get a list of TodoLists from the database
router.get("/todo", function (req, res, next) {
  TodoList.find({}, { _id: 0, _v: 0, "todoItems._id": 0 })
    .then(function (todoLists) {
      res.send(todoLists);
    })
    .catch(next);
});

// update a TodoList in the database
router.put("/todo/:id", function (req, res, next) {
  const { error } = validateUpdateTodoList(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  TodoList.findOneAndUpdate({ id: req.params.id }, req.body).then(function (
    todoList
  ) {
    TodoList.findOne({ id: req.params.id }).then(function (todoList) {
      res.send(todoList);
    });
  });
});

function validateUpdateTodoList(todoList) {
  const schema = Joi.object({
    todoItems: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required().allow(""),
        completed: Joi.boolean().required(),
        completeAt: Joi.date().required(),
      })
    ),
  });
  return schema.validate(todoList);
}

module.exports = router;
