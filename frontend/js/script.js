const tbody = document.querySelector('tbody');
// const addForm = document.querySelector('.add-form');
// const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  return tasks;
}

// const addTask = async (event) => {
//   event.preventDefault();

//   const task = { title: inputTask.value };

//   await fetch('http://localhost:3000/tasks', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify(task),
//   });

//   loadTasks();
// }

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);
  if (innerHTML) element.innerHTML = innerHTML;

  if (innerText) element.innerText = innerText;

  return element;
}

const createSelect = (status) => {
  const select = createElement('select');
  const options = ['Pendente', 'Em andamento', 'Concluída'];

  options.forEach(option => {
    const optionElement = createElement('option', option);
    if (option === status) optionElement.selected = true;
    select.appendChild(optionElement);
  });

  return select;
}

const createRow = (task) => {
  const { id, title, created_at, status } = task;
  const row = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', created_at);
  const tdStatus = createElement('td');
  const tdActions = createElement('td');
  
  const select = createSelect(status);

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  row.appendChild(tdTitle);
  row.appendChild(tdCreatedAt);
  row.appendChild(tdStatus);
  row.appendChild(tdActions);

  return row;
}


const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = '';

  tasks.forEach(task => {
    const row = createRow(task);
    tbody.appendChild(row);
  });
}

// addForm.addEventListener('submit', addTask);

loadTasks();
