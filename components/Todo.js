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

  _generateCheckboxEl(config) {
    this._todoCheckboxEl = this._todoElement.querySelector(config.todoCheckbox);
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    const todoLabel = this._todoElement.querySelector(config.todoLabel);
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView(config) {
    this._todoElement = this._templateElement.content
      .querySelector(config.todoClass)
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(config.todoName);
    todoNameEl.textContent = this._data.name;

    const todoDate = this._todoElement.querySelector(config.todoDate);
    this._todoDeleteBtn = this._todoElement.querySelector(
      config.todoDeleteButton
    );

    this._generateCheckboxEl(config);
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
