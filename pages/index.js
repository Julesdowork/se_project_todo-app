import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import {
  initialTodos,
  validationConfig,
  todoConfig,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView(todoConfig);
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    const todoElement = todo.getView(todoConfig);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const id = uuidv4();

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;
//   const id = uuidv4();

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const values = { name, date, id };
//   const todo = generateTodo(values);
//   section.addItem(todo);
//   closeModal(addTodoPopup);
//   newTodoValidator.resetValidation();
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
