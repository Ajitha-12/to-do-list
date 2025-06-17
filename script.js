const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add(`category-${task.category}`);
    li.innerHTML = `
      <strong>${task.name}</strong><br/>
      <small>Due: ${task.deadline} | Category: ${task.category}</small>
      <button class="delete" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.getElementById('task').value;
  const deadline = document.getElementById('deadline').value;
  const category = document.getElementById('category').value;

  if (task && deadline && category) {
    saveTask({ name: task, deadline, category });
    taskForm.reset();
  }
});

window.onload = loadTasks;
