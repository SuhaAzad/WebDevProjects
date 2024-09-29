let taskList = [];

// Function to add a new task
function addTask(task) {
    taskList.push({
        text: task,
        completed: false
    });
    renderTaskList();
}

// Function to render the task list
function renderTaskList(filterValue = 'all', searchValue = '') {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';
    taskList.forEach((task) => {
        if ((filterValue === 'all' || task.completed === (filterValue === 'completed')) &&
            task.text.toLowerCase().includes(searchValue.toLowerCase())) {
            const taskElement = document.createElement('li');
            taskElement.textContent = task.text;
            taskElement.className = task.completed ? 'completed' : '';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                renderTaskList();
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                taskList = taskList.filter((t) => t !== task);
                renderTaskList();
            });
            taskElement.appendChild(checkbox);
            taskElement.appendChild(deleteButton);
            taskListElement.appendChild(taskElement);
        }
    });
}

// Function to handle the "Add Task" button click
document.getElementById('add-task-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

// Function to handle the filter radio buttons
document.querySelectorAll('input[name="filter"]').forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
        const filterValue = radioButton.value;
        renderTaskList(filterValue);
    });
});

// Function to handle the search input
document.getElementById('search-input').addEventListener('input', () => {
    const searchValue = document.getElementById('search-input').value.trim();
    renderTaskList('all', searchValue);
});

// Initial render of the task list
renderTaskList();