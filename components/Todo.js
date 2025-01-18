class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl(settings) {
    this._todoCheckboxEl = this._todoElement.querySelector(settings.todoCheckbox);
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    const todoLabel = this._todoElement.querySelector(settings.todoLabel);
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDueDate(settings) {
    this._todoDate = this._todoElement.querySelector(settings.todoDate);
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView(config) {
    this._todoElement = this._templateElement.content
      .querySelector(config.todoClass)
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(config.todoName);
    todoNameEl.textContent = this._data.name;
    this._todoDeleteBtn = this._todoElement.querySelector(
      config.todoDeleteButton
    );

    this._generateCheckboxEl(config);
    this._generateDueDate(config);
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
