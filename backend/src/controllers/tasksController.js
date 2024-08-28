const tasksModel = require('../models/tasksModel');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;

const getAll = async (req, res) => {
  const tasks = await tasksModel.getAll();
  return res.status(HTTP_OK).json(tasks);
};

const createTask = async (req, res) => {
  const resultCreateTask = await tasksModel.createTask(req.body);
  return res.status(HTTP_CREATED).json(resultCreateTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await tasksModel.deleteTask(id);
  return res.status(HTTP_NO_CONTENT).json({ message: 'Tarefa excluída com sucesso' });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  await tasksModel.updateTask(id, task);
  return res.status(HTTP_NO_CONTENT).json();
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
