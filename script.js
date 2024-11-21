// Select DOM elements
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const taskDateInput = document.getElementById("taskDate");
const taskCategoryInput = document.getElementById("taskCategory");
const taskPriorityInput = document.getElementById("taskPriority");
const searchBar = document.getElementById("searchBar");
const filterCategory = document.getElementById("filterCategory");
const filterStatus = document.getElementById("filterStatus");
const taskList = document.getElementById("taskList");

// Array to store tasks
let tasks = [];

// Add a new task
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get input values
    const name = taskNameInput.value.trim();
    const date = taskDateInput.value;
    const category = taskCategoryInput.value;
    const priority = taskPriorityInput.value;

    if (!name || !date) {
        alert("Please fill in all fields!");
        return;
    }

    // Create a task object
    const task = {
        id: Date.now(),
        name,
        date,
        category,
        priority,
        completed: false,
    };

    tasks.push(task);
    updateTaskList();
    taskForm.reset();
});

// Update the task list UI
function updateTaskList() {
    taskList.innerHTML = "";

    // Filter tasks based on search, category, and status
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.name.toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesCategory = filterCategory.value === "All" || task.category === filterCategory.value;
        const matchesStatus =
            filterStatus.value === "All" ||
            (filterStatus.value === "Completed" && task.completed) ||
            (filterStatus.value === "Pending" && !task.completed);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Render tasks
    filteredTasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        // Add priority-specific classes
        if (task.priority === "High") listItem.classList.add("priority-high");
        if (task.priority === "Medium") listItem.classList.add("priority-medium");
        if (task.priority === "Low") listItem.classList.add("priority-low");

        // Add completed class if the task is done
        if (task.completed) listItem.classList.add("completed");

        listItem.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? "checked" : ""} class="form-check-input me-2" data-id="${task.id}">
                <strong>${task.name}</strong> <small>(${task.date})</small>
                <span class="badge bg-secondary">${task.category}</span>
            </div>
            <div>
                <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
            </div>
        `;

        taskList.appendChild(listItem);
    });
}

// Mark a task as complete or delete a task
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task")) {
        // Delete task
        const taskId = Number(e.target.dataset.id);
        tasks = tasks.filter((task) => task.id !== taskId);
        updateTaskList();
    } else if (e.target.type === "checkbox") {
        // Mark task as complete/incomplete
        const taskId = Number(e.target.dataset.id);
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.completed = e.target.checked;
        }
        updateTaskList();
    }
});

// Search tasks
searchBar.addEventListener("input", updateTaskList);

// Filter tasks by category and status
filterCategory.addEventListener("change", updateTaskList);
filterStatus.addEventListener("change", updateTaskList);

// Dark Mode Toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    addTask();
});

