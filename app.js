// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear tasks
  clearBtn.addEventListener("click", clearTask);
  // Filter task events
  filter.addEventListener("keyup", filterTask);
}

//Get task from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create text node and append li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task ");
  }

  // Create li element
  const li = document.createElement("li");
  // Add Class
  li.className = "collection-item";
  // Create text node and append li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Task
function clearTask() {
  taskList.innerHTML = "";

  // Below mentioned works Faster as compared to taskList.innerHTML=''
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLS();
}

// Clear Tasks from LS
function clearTaskFromLS() {
  localStorage.clear();
}

// Filter tasks
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function () {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  });
}
