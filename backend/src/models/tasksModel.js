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

const deleteTask = async (id) => {
  const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;

  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
  const [result] = await connection.execute(query, [title, status, id]);

  return result;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
