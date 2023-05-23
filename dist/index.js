const projectMaker = (() => {
  let projectHolder = [];
  let activeProject = 0;
  function Project(position, title, todoHolder) {
    this.position = position;
    this.title = title;
    this.todoHolder = todoHolder;
  }
  function Todo(
    project,
    position,
    title,
    description,
    dueDate,
    priority,
    checked
  ) {
    this.project = project;
    this.position = position;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = checked;
  }
  projectHolder.push(new Project(0, "test project 0", []));
  projectHolder.push(new Project(1, "test project 1", []));
  projectHolder
    .at(0)
    .todoHolder.push(
      new Todo(
        0,
        0,
        "test todo 0",
        "this is the first test todo",
        "29/03/2024",
        "high",
        true
      )
    );
  projectHolder
    .at(1)
    .todoHolder.push(
      new Todo(
        1,
        0,
        "test todo 0",
        "this is the first test todo",
        "29/03/2024",
        "high",
        true
      )
    );
  projectHolder
    .at(0)
    .todoHolder.push(
      new Todo(
        0,
        1,
        "test todo 1",
        "this is the second test todo",
        "29/03/2024",
        "high",
        true
      )
    );
  const projects = document.getElementById("projects");
  const todos = document.getElementById("mainright");
  function projectToDisplay(Project) {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.id = Project.position;
    projectDiv.setAttribute(
      "onclick",
      "projectMaker.getActiveProject(" + Project.position + ")"
    );
    projects.appendChild(projectDiv);

    let projectTitle = document.createElement("p");
    projectTitle.textContent = Project.title;
    projectDiv.appendChild(projectTitle);

    let projectEdit = document.createElement("img");
    projectEdit.classList.add("edit");
    projectEdit.src = "text-box-edit.svg";
    projectDiv.appendChild(projectEdit);

    let projectDelete = document.createElement("img");
    projectDelete.classList.add("delete");
    projectDelete.src = "delete-forever.svg";
    projectDelete.setAttribute("onclick", "buttons.projectDel()");
    projectDiv.appendChild(projectDelete);
  }

  function todoToDisplay(todo) {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todos.appendChild(todoDiv);

    let todoChecked = document.createElement("input");
    todoChecked.setAttribute("type", "checkbox");
    todoDiv.appendChild(todoChecked);

    let todoTitle = document.createElement("p");
    todoTitle.textContent = todo.title;
    todoDiv.appendChild(todoTitle);

    let todoDueDate = document.createElement("p");
    todoDueDate.textContent = todo.dueDate;
    todoDiv.appendChild(todoDueDate);

    let todoPriority = document.createElement("p");
    todoPriority.textContent = todo.priority;
    todoDiv.appendChild(todoPriority);

    let editDiv = document.createElement("div");
    todoDiv.appendChild(editDiv);
    let todoEdit = document.createElement("img");
    todoEdit.classList.add("edit");
    todoEdit.src = "text-box-edit.svg";
    editDiv.appendChild(todoEdit);

    let delDiv = document.createElement("div");
    todoDiv.appendChild(delDiv);
    let todoDel = document.createElement("img");
    todoDel.classList.add("delete");
    todoDel.src = "delete-forever.svg";
    todoDel.setAttribute("onclick", "buttons.todoDel()");
    delDiv.appendChild(todoDel);
  }
  projectToDisplay(projectHolder[0]);
  projectToDisplay(projectHolder[1]);
  const getActiveProject = (projectPosition) => {
    let toDel = document.getElementsByClassName("todo");
    console.log(toDel);
    Array.from(toDel).forEach((element) => {
      element.remove();
    });
    let activeProject = projectPosition;
    todoAmount = projectHolder.at(projectPosition).todoHolder.length;
    while (todoAmount > 0) {
      --todoAmount;
      todoToDisplay(projectHolder.at(projectPosition).todoHolder[todoAmount]);
    }
    return activeProject;
  };
  return {
    projectToDisplay,
    todoToDisplay,
    getActiveProject,
  };
})();
const buttons = (() => {
  const blackout = document.getElementById("blackout");
  const projectModal = document.getElementById("projectModal");
  const todoModal = document.getElementById("todoModal");
  const projectDelModal = document.getElementById("projectDelModal");
  const todoDelModal = document.getElementById("todoDelModal");

  const createProject = () => {
    projectModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };

  const createTodo = () => {
    todoModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };

  const closeModal = () => {
    blackout.style.visibility = "hidden";
    todoModal.style.visibility = "hidden";
    projectModal.style.visibility = "hidden";
    todoDelModal.style.visibility = "hidden";
    projectDelModal.style.visibility = "hidden";
  };

  const projectDel = () => {
    projectDelModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };

  const todoDel = () => {
    todoDelModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };
  const projectButton = () => {
    document.querySelector(".project").addEventListener("click", () => {
      document.querySelector(".project").style["background-color"] =
        "rgb(212, 212, 212)";
      document.querySelector(".project > .edit").style.visibility = "visible";
      document.querySelector(".project > .delete").style.visibility = "visible";
    });
  };

  return {
    createProject,
    createTodo,
    closeModal,
    projectDel,
    todoDel,
    projectButton,
  };
})();
