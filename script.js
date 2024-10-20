const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);
window.addEventListener('load', loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

   
    addTaskToDOM(task);
    saveTask(task);

    taskInput.value = '';
}


function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', toggleComplete);

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
        taskText.classList.add('completed');
    }

    const taskBtns = document.createElement('div');
    taskBtns.classList.add('task-btns');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => editTask(task.id, taskText));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => deleteTask(task.id, li));

    taskBtns.appendChild(editBtn);
    taskBtns.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(taskBtns);

    taskList.appendChild(li);
}
function toggleComplete(e) {
    const taskItem = e.target.parentElement;
    const taskId = taskItem.getAttribute('data-id');
    const taskText = taskItem.querySelector('span');

    taskText.classList.toggle('completed');
    updateTaskCompletion(taskId, e.target.checked);
}

function editTask(taskId, taskTextElement) {
    const newText = prompt('Edit your task:', taskTextElement.textContent);
    if (newText && newText.trim() !== '') {
        taskTextElement.textContent = newText.trim();
        updateTaskText(taskId, newText.trim());
    }
}


function deleteTask(taskId, taskItem) {
    taskItem.remove();
    removeTaskFromStorage(taskId);
}


function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
}


function updateTaskCompletion(taskId, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


function updateTaskText(taskId, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


function removeTaskFromStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
