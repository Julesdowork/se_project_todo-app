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
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView(todoConfig);
  return todoElement;
};

const renderTodo = (data) => {
  const todo = generateTodo(data);
  section.addItem(todo);
}

const handleCheck = (completed) => {
  todoCounter.updateCompleted(completed);
};

const handleDelete = () => {
  todoCounter.updateTotal(false);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => renderTodo(item),
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
    renderTodo(values);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);
  },
});
addTodoPopup.setEventListeners();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const addTodoForm = addTodoPopup.getForm();
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
