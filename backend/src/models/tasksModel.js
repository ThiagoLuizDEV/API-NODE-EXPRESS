const connection = require('./connection');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');

  return tasks;
};

const createTask = async ({ title }) => {
  const createdAt = new Date(Date.now()).toUTCString();
  const status = 'pendente';

  const [resultCreateTask] = await connection.execute(
    'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)',
    [title, status, createdAt],
  );

  return { insertId: resultCreateTask.insertId };
};

module.exports = {
  getAll,
  createTask,
};
