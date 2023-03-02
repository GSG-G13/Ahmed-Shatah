// @DESC - This is CSS-Create-Dark-Light-Mode  issue code
const toggleButton = document.querySelector("#dark-mode-toggle");
const body = document.querySelector("body");
const icon = document.querySelector("button i");

toggleButton.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
 
    icon.classList.toggle("light-mode");
  
  
});

const todoInput = document.querySelector(".t_input");
const todoButton = document.querySelector(".t_button");
const todoList = document.querySelector(".t_list");
const filterOption = document.querySelector(".filter_todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", editTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
  event.preventDefault();
  const todoText = todoInput.value;
  if (todoText === "") {
    return;
  }
  const todo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };
  addToLocalStorage(todo);
  todoInput.value = "";
  displayTodo(todo);
}

function displayTodo(todo) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.setAttribute("data-id", todo.id);

  const todoText = document.createElement("span");
  todoText.classList.add("todo-text");
  todoText.innerText = todo.text;
  todoItem.appendChild(todoText);

  const todoActions = document.createElement("div");
  todoActions.classList.add("todo-actions");
  todoItem.appendChild(todoActions);

  const todoEdit = document.createElement("button");
  todoEdit.classList.add("todo-action", "todo-edit");
  todoEdit.innerText = "Edit";
  todoActions.appendChild(todoEdit);

  const todoDone = document.createElement("button");
  todoDone.classList.add("todo-action", "todo-done");
  todoDone.innerText = "Done";
  todoActions.appendChild(todoDone);

  if (todo.completed) {
    todoItem.classList.add("completed");
  }

  const todoDelete = document.createElement("button");
  todoDelete.classList.add("todo-action", "todo-delete");
  todoDelete.innerText = "Delete";
  todoActions.appendChild(todoDelete);
  

  todoList.appendChild(todoItem);
}

function deleteCheck(event) {
  const item = event.target;
  if (item.classList.contains("todo-done")) {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
    toggleTodoLocalStorage(todo);
  } else if (item.classList.contains("todo-delete")) {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeTodoFromLocalStorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  location.reload();

}

function filterTodo() {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (filterOption.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function addToLocalStorage(todo) {
  const todos = getTodosFromLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function getTodos() {
  const todos = getTodosFromLocalStorage();
  todos.forEach(function (todo) {
    displayTodo(todo);
  });
}

function removeTodoFromLocalStorage(todo) {
  const todos = getTodosFromLocalStorage();
  const todoIndex = todo.dataset.id;
  todos.splice(
    todos.findIndex(function (todo) {
      return todo.id === Number(todoIndex);
    })
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleTodoLocalStorage(todo) {
  const todos = getTodosFromLocalStorage();
  const todoIndex = todo.dataset.id;
  const todoObj = todos.find(function (todo) {
    return todo.id === Number(todoIndex);
  });
  todoObj.completed = !todoObj.completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editTodo(event) {
  const item = event.target;
  if (item.classList.contains("todo-edit")) {
    const todo = item.parentElement.parentElement;
    const todoText = todo.querySelector(".todo-text");
    const newTodoText = prompt("Edit Todo", todoText.innerText);
    if (newTodoText != null) {
      todoText.innerText = newTodoText;
      const todoIndex = todo.dataset.id;
      const todos = getTodosFromLocalStorage();
      const todoObj = todos.find(function (todo) {
        return todo.id === Number(todoIndex);
      });
      todoObj.text = newTodoText;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}
