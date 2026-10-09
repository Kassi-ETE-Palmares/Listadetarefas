
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const taskCount = document.getElementById("task-count");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const clearCompleted = document.getElementById("clear-completed");

let tasks = [];

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Concluir " + task.text);

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.textContent = "Excluir";
        deleteButton.setAttribute("aria-label", "Excluir " + task.text);

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            renderTasks();
        });

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    });

    const total = tasks.length;
    const completed = tasks.filter(
        (task) => task.completed
    ).length;

    const percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    taskCount.textContent =
        `${completed} de ${total} tarefas concluídas`;

    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;

    emptyMessage.hidden = total > 0;
    clearCompleted.hidden = completed === 0;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        id: crypto.randomUUID(),
        text: text,
        completed: false
    });

    input.value = "";
    input.focus();

    renderTasks();
});

clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    renderTasks();
});

renderTasks();