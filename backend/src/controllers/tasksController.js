const tasksModel = require('../models/tasksModel');

const HTTP_OK = 200;
const HTTP_CREATED = 201;

const getAll = async (req, res) => {
  const tasks = await tasksModel.getAll();
  return res.status(HTTP_OK).json(tasks);
};

const createTask = async (req, res) => {
  const resultCreateTask = await tasksModel.createTask(req.body);
  return res.status(HTTP_CREATED).json(resultCreateTask);
};

module.exports = {
  getAll,
  createTask,
};
