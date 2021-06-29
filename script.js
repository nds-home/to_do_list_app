const input = document.querySelector(".message"); // get the value from <input class="message">
const button = document.querySelector(".add"); // get the value from <button class="add">
const ul = document.querySelector(".todo"); // get the value from <ul class="todo">

let todoList = []; // create an array for data

const displayMessages = () => {
  let li = "";

  todoList.forEach((item, i) => {
    li += `
      <li>
      <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
      <label for="item_${i}" ${item.important ? 'class="important"' : ""}> 
        ${item.description}
      </label>
      </li>
    `;

    ul.innerHTML = li;
  });
};

const addNote = () => {
  const newTodo = {
    description: input.value,
    checked: false,
    important: false,
  };

  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem("ul", JSON.stringify(todoList));

  input.value = "";
};

if (localStorage.getItem("ul")) {
  todoList = JSON.parse(localStorage.getItem("ul"));
  displayMessages();
}

// event listener for add button (keyboard)
input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    addNote();
  }
});

// event listener for add button (mouse)
button.addEventListener("click", () => addNote());

// event listener for "checked" field
ul.addEventListener("change", (event) => {
  const valueLabel = ul.querySelector(
    "[for=" + event.target.getAttribute("id") + "]"
  ).innerHTML;

  todoList.forEach((item) => {
    if (item.description === valueLabel.trim()) {
      item.checked = !item.checked;
      localStorage.setItem("ul", JSON.stringify(todoList));
    }
  });
});

// event listener for "important" field
ul.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  todoList.forEach((item) => {
    if (item.description === event.target.innerHTML) {
      item.important = !item.important;
      displayMessages();
      localStorage.setItem("ul", JSON.stringify(todoList));
    }
  });
});
