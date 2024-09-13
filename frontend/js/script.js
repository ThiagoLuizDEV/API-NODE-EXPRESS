const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  return tasks;
};

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);
  if (innerHTML) element.innerHTML = innerHTML;

  if (innerText) element.innerText = innerText;

  return element;
};

const createSelect = (value) => {
  const options = `
    <option value="Pendente">Pendente</option>
    <option value="Em andamento">Em andamento</option>
    <option value="concluida">concluida</option>
  `;

  const select = createElement('select', '', options);

  select.value = value || 'Pendente';

  return select;
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  });

  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

const createRow = (task) => {
  const { id, title, created_at, status } = task;
  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

  select.addEventListener('change', ({ target }) => updateTask(
    { ...task, status: target.value },
  ));

  const editButton = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined">edit</span>',
  );
  const deleteButton = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined">delete</span>',
  );

  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTask({ ...task, title: editInput.value });
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  deleteButton.addEventListener('click', () => deleteTask(id));

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value = '';
};

addForm.addEventListener('submit', addTask);

loadTasks();
