// Live Clock
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  document.getElementById("clock").innerText = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Task Management
let tasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;
  const time = document.getElementById("taskTime").value;

  if (!title || !time) {
    alert("Please enter both task and time!");
    return;
  }

  const taskTime = new Date(time);
  const now = new Date();

  if (taskTime <= now) {
    alert("Please select a future time!");
    return;
  }

  const task = { title, desc, time: taskTime };
  tasks.push(task);
  displayTasks();

  scheduleNotification(task);
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskTime").value = "";
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task.title}</strong><br>${task.desc}<br><em>${new Date(task.time).toLocaleString()}</em>`;
    list.appendChild(li);
  });
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.desc}<br>
      <em>${new Date(task.time).toLocaleString()}</em>
      <button onclick="deleteTask(${index})" class="delete-btn">🗑 Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}


// Notifications
function scheduleNotification(task) {
  const now = new Date();
  const delay = task.time - now;

  setTimeout(() => {
    showNotification(task.title, task.desc);
  }, delay);
}

function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification("🔔 Task Reminder", { body: `${title}: ${body}` });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("🔔 Task Reminder", { body: `${title}: ${body}` });
      }
    });
  }
}
