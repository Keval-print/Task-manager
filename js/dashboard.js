if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

const KEY = "tasks";
let tasks = JSON.parse(localStorage.getItem(KEY)) || [];

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function addTask() {
  const title = document.getElementById("title").value.trim();
  const due = document.getElementById("due").value;
  const priority = document.getElementById("priority").value;
  if (!title) return alert("Title required");

  tasks.push({
    id: Date.now(),
    title,
    due,
    priority,
    done: false,
  });
  save();
  clearForm();
  render();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("due").value = "";
}

function toggle(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save(); render();
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save(); render();
}

function render() {
  const q = document.getElementById("search").value.toLowerCase();
  const p = document.getElementById("filterPriority").value;
  const s = document.getElementById("filterStatus").value;

  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks
    .filter(t => t.title.toLowerCase().includes(q))
    .filter(t => !p || t.priority === p)
    .filter(t => !s || (s === "done" ? t.done : !t.done))
    .forEach(t => {
      const li = document.createElement("li");
      li.className = `item ${t.done ? "done" : ""}`;
      li.innerHTML = `
        <div>
          <strong>${t.title}</strong>
          <span class="tag ${t.priority.toLowerCase()}">${t.priority}</span>
          ${t.due ? `<small>Due: ${t.due}</small>` : ""}
        </div>
        <div class="actions">
          <button onclick="toggle(${t.id})">${t.done ? "Undo" : "Done"}</button>
          <button class="danger" onclick="removeTask(${t.id})">Delete</button>
        </div>
      `;
      list.appendChild(li);
    });
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

render();
