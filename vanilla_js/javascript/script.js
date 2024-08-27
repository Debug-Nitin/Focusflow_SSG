const input = document.getElementById("input");
const insrch = document.getElementById("srch");
const create = document.getElementById("create");
var todoList = document.getElementById("todo-list");
var todos = [];

var todoslocal = JSON.parse(localStorage.getItem("todos"));
var todosCompletedLocalArray = JSON.parse(
  localStorage.getItem("completedToDos")
);

var todosCompletedLocalSet = new Set();

function init() {
  if (!todosCompletedLocalArray) {
    todosCompletedLocalArray = [];
  }

  for (let i = 0; i < todosCompletedLocalArray.length; i++) {
    todosCompletedLocalSet.add(todosCompletedLocalArray[i]);
  }
}

init();

var todoListTemplate = document.getElementsByTagName("template")[0];
var todoitem = todoListTemplate.content.querySelector("div");

//event listeners
create.addEventListener("click", addTodo);

//get data from local storage

// if (localStorage.getItem("completedToDos"))
//   completedToDos = localStorage.getItem("completedToDos");
// console.log(todoslocal);

if (todoslocal) {
  todos = [...todoslocal];
  render(todoslocal, todoitem);
}

//functions
function render(todos, todoitem) {
  todoList.innerHTML = "";

  for (i = 0; i < todos.length; i++) {
    a = document.importNode(todoitem, true);
    a.setAttribute("item", i);
    console.log(a.childNodes);
    a.childNodes[3].textContent = todos[i];
    a.childNodes[5].textContent = "description here";

    const deleteButton = a.childNodes[7].childNodes[3].childNodes[3];
    deleteButton.addEventListener("click", dlt);
    //checking where is my button
    // console.log(a.childNodes[5].childNodes[3].childNodes[1]);
    const editbutton = a.childNodes[7].childNodes[3].childNodes[1];
    editbutton.addEventListener("click", edt);

    // to mark completed
    const chk = a.childNodes[1];
    chk.addEventListener("click", complet);

    if (todosCompletedLocalSet.has(i)) {
      chk.checked = true;
      a.childNodes[3].classList.add("completed");
    }

    todoList.appendChild(a);
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  let todoText = input.value;

  if (todoText) {
    todoitem = todoListTemplate.content.querySelector("div");

    todos.push(input.value.toString());
    render(todos, todoitem);

    //creating a todo item properties
    //     let todoitem = document.createElement("div");
    //     todoitem.classList.add("todo-item");
    //     todoList.appendChild(todoitem);

    //     console.log(todoList);
    //     //creating checkbox for marking todo
    //     let newCheckbox = document.createElement("input");
    //     newCheckbox.type = "checkbox";
    //     newCheckbox.name = "check";
    //     newCheckbox.id = "check";
    //     newCheckbox.value = document.getElementById("input").value;
    //     todoitem.appendChild(newCheckbox);

    //     // creating paragraph for the todo text
    //     let itemtext = document.createElement("p");
    //     itemtext.id = "todo-text";
    //     itemtext.innerText = todoText;
    //     todoitem.appendChild(itemtext);

    //     //to strikethrough if todo done
    //     newCheckbox.addEventListener("click", () => {
    //       if (newCheckbox.checked == true) {
    //         itemtext.classList.add("completed");
    //       } else {
    //         itemtext.classList.remove("completed");
    //       }
    //     });

    //     // adding hamburger icon to todo list
    //     let ham = document.createElement("div");
    //     ham.classList.add("hamburger");
    //     let hambutton = document.createElement("button");
    //     hambutton.classList.add("hambutton");
    //     let ham_img = document.createElement("img");
    //     ham_img.src = "../images/hamburger.png";
    //     ham_img.classList.add("ham-icon");
    //     hambutton.appendChild(ham_img);

    //     ham.appendChild(hambutton); //inserted ham-button

    //     //creating buttons div
    //     let div_buttons = document.createElement("div");
    //     div_buttons.classList.add("ham-buttons");

    //     //creating edit button
    //     let editbutton = document.createElement("button");
    //     editbutton.classList.add("edit");
    //     let edit = document.createElement("img");
    //     edit.src = "../images/edit.png";
    //     edit.classList.add("ham-icon");
    //     editbutton.appendChild(edit);

    //     //creating delete button
    //     let deletebutton = document.createElement("button");
    //     deletebutton.classList.add("dlt");
    //     let dlt = document.createElement("img");
    //     dlt.src = "../images/delete.png";
    //     dlt.classList.add("ham-icon");
    //     deletebutton.appendChild(dlt);

    //     //adding buttons to ham-buttons div
    //     div_buttons.appendChild(editbutton);
    //     div_buttons.appendChild(deletebutton);

    //     //adding buttons to hambutton
    //     ham.appendChild(div_buttons);

    //     todoitem.appendChild(ham);
    //   }
    input.value = "";
    input.focus();
  }
}

function dlt(e) {
  let index = +e.target.parentNode.parentNode.parentNode.getAttribute("item");
  todos.splice(index, 1);
  if (
    e.target.parentNode.parentNode.parentNode
      .querySelector("p")
      .classList.contains("completed")
  ) {
    todosCompletedLocalSet.delete(index);
    localStorage.setItem(
      "completedToDos",
      JSON.stringify([...todosCompletedLocalSet])
    );
  } else {
    let array = Array.from(todosCompletedLocalSet);
    let larger = array.filter((x) => x > index);
    if (!(larger.length === 0)) {
      let smaller = array.filter((x) => x < index);
      larger = larger.map((x) => x - 1);
      array = [...larger, ...smaller];
      console.log(array);
      todosCompletedLocalSet = new Set(array);
      localStorage.setItem("completedToDos", JSON.stringify(array));
    }
  }
  render(todos, todoitem);

  // console.log(e.target); // e is the event created on click
  // e.target tells where we have clicked
}

function edt(e) {
  //   console.log(
  //     e.target.parentNode.parentNode.parentNode.querySelector("#todo-text")
  //       .textContent
  //   ); found the todo text to edit
  todotextpara =
    e.target.parentNode.parentNode.parentNode.querySelector("#todo-text");
  todotext =
    e.target.parentNode.parentNode.parentNode.querySelector(
      "#todo-text"
    ).textContent;
  if (todotextpara.classList.contains("completed")) {
    alert("this to do is already complete");
  } else {
    let editedtodo = prompt("Edit your to-do", todotext);
    while (editedtodo == "") {
      editedtodo = prompt(
        "you can not have an empty todo, edit your todo again.",
        todotext
      );
    }
    if (editedtodo) {
      let index = todos.indexOf(todotext);
      if (~index) todos[index] = editedtodo;
    }
    render(todos, todoitem);
  }
}

function complet(e) {
  let mytodo = e.target.parentNode.querySelector("#todo-text");
  let index = +e.target.parentNode.getAttribute("item");
  if (e.target.checked) {
    mytodo.classList.add("completed");
    todosCompletedLocalSet.add(index);
    // console.log(todosCompletedLocalSet);
  } else {
    mytodo.classList.remove("completed");
    todosCompletedLocalSet.delete(index);
    // console.log(todosCompletedLocalSet);
  }

  localStorage.setItem(
    "completedToDos",
    JSON.stringify([...todosCompletedLocalSet])
  );
}

function srch() {
  // console.log(insrch.value);
  // todoitem = todoList.getElementsByClassName("todo-item");
  // console.log(todoitem);

  let filteredToDOs = todos.filter((todo) => {
    return todo.includes(insrch.value);
  });

  render(filteredToDOs, todoitem);
  // insrch.value = "";
}
