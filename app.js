const todos = [];

const todoForm = document.getElementById('todo-form');
const todoTitleInput = document.getElementById('todo-title');
const todoDetailInput = document.getElementById('todo-detail');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const completedCount = document.getElementById('completed-count');
const deleteAllButton = document.getElementById('delete-all');

function updateCounts() {
  const completedTodos = todos.filter((todo) => todo.completed).length;
  todoCount.textContent = `${todos.length} todo`;
  completedCount.textContent = `${completedTodos} completed`;
}

function createTodoItem(todo) {
  const li = document.createElement('li');
  li.classList.add('todo-item');

  const titleP = document.createElement('p');
  titleP.classList.add('title');
  titleP.textContent = todo.title;

  const detailP = document.createElement('p');
  detailP.classList.add('detail');
  detailP.textContent = todo.detail;

  const completeButton = document.createElement('button');
  completeButton.classList.add('complete');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', () => {
    todo.completed = !todo.completed;
    titleP.classList.toggle('completed');
    updateCounts();
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    const todoIndex = todos.findIndex((t) => t.id === todo.id);
    todos.splice(todoIndex, 1);
    todoList.removeChild(li);
    updateCounts();
  });

  li.appendChild(titleP);
  li.appendChild(detailP);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  return li;
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = todoTitleInput.value;
  const detail = todoDetailInput.value;

  if (title === '') return;

  const newTodo = {
    id: Date.now(),
    title,
    detail,
    completed: false,
  };

  todos.push(newTodo);
  todoList.appendChild(createTodoItem(newTodo));
  todoTitleInput.value = '';
  todoDetailInput.value = '';

  updateCounts();
});

deleteAllButton.addEventListener('click', () => {
  todos.length = 0;
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  updateCounts();
});
