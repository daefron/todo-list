const projectMaker = (() => {
  let projectHolder = [];
  let activeProject = -1;
  let activeTodo = -1;
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

  const createProject = () => {
    buttons.closeModal();
    let title = document.getElementById("title").value;
    let position = projectHolder.length;
    document.getElementById("title").value = "";
    projectHolder.push(new Project(position, title, []));
    return projectToDisplay(projectHolder.at(position));
  };

  const deleteProject = () => {
    buttons.closeModal();
    buttons.delProject("project" + activeProject);
    delete projectHolder[activeProject];
    document.getElementById("rightHeader").style.visibility = "hidden";
  };

  const editProject = () => {
    buttons.closeModal();
    let title = document.getElementById("titleEdit").value;
    projectHolder.at(activeProject).title = title;
    document.querySelector("#project" + activeProject + " p").textContent =
      title;
  };

  const createTodo = () => {
    buttons.closeModal();
    let project = activeProject;
    let position = projectHolder.at(project).todoHolder.length;
    let title = document.getElementById("todoTitle").value;
    document.getElementById("todoTitle").value = "";
    let description = document.getElementById("todoDescription").value;
    document.getElementById("todoDescription").value = "";
    let dueDate = document.getElementById("date").value;
    document.getElementById("date").value = "";
    let priority = document.getElementById("priority").value;
    let checked = false;
    projectHolder
      .at(project)
      .todoHolder.push(
        new Todo(
          project,
          position,
          title,
          description,
          dueDate,
          priority,
          checked
        )
      );
    return todoToDisplay(projectHolder.at(project).todoHolder.at(position));
  };

  const deleteTodo = () => {
    buttons.closeModal();
    console.log(activeProject + "todo" + activeTodo);
    buttons.delTodo(activeProject + "todo" + activeTodo);
    delete projectHolder.at(activeProject).todoHolder[0];
  };

  const getActiveTodo = (position) => {
    activeTodo = position;
    return activeTodo;
  };

  const editTodo = () => {
    buttons.closeModal();
    // let title = document.getElementById("todoTitleEdit").value;
    // projectHolder.at(activeProject).
    // let description = document.getElementById("todoDescriptionEdit").value;
    // let dueDate = document.getElementById("dateEdit").value;
    // let priority = document.getElementById("priorityEdit").value;
  };

  const projects = document.getElementById("projects");
  const todos = document.getElementById("mainright");
  function projectToDisplay(Project) {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.id = "project" + Project.position;
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
    projectEdit.setAttribute("onclick", "buttons.projectEdit()");
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
    todoDiv.id = activeProject + "todo" + todo.position;
    todos.appendChild(todoDiv);

    let todoChecked = document.createElement("input");
    todoChecked.id = "check";
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
    todoEdit.setAttribute("onclick", "buttons.todoEdit()");
    editDiv.appendChild(todoEdit);

    let delDiv = document.createElement("div");
    todoDiv.appendChild(delDiv);
    let todoDel = document.createElement("img");
    todoDel.classList.add("delete");
    todoDel.src = "delete-forever.svg";
    todoPosition = todo.position;
    todoDel.setAttribute(
      "onclick",
      "projectMaker.getActiveTodo(" + todoPosition + "); buttons.todoDel()"
    );
    delDiv.appendChild(todoDel);
  }

  const getActiveProject = (projectPosition) => {
    document.getElementById("rightHeader").style.visibility = "visible";
    let toClean = document.getElementsByClassName("project");
    Array.from(toClean).forEach((element) => {
      buttons.cleanProjects(element.id);
    });
    buttons.projectButton(projectPosition);
    let toDel = document.getElementsByClassName("todo");
    Array.from(toDel).forEach((element) => {
      element.remove();
    });
    activeProject = projectPosition;
    todoAmount = projectHolder.at(projectPosition).todoHolder.length;
    while (todoAmount > 0) {
      --todoAmount;
      if (projectHolder.at(projectPosition).todoHolder[todoAmount] !== undefined) {
        todoToDisplay(projectHolder.at(projectPosition).todoHolder[todoAmount]);
      }
    }
    return activeProject;
  };
  return {
    createProject,
    deleteProject,
    createTodo,
    deleteTodo,
    projectToDisplay,
    todoToDisplay,
    getActiveProject,
    getActiveTodo,
    editProject,
    editTodo,
    projectHolder,
    activeProject,
    activeTodo,
  };
})();

const buttons = (() => {
  const blackout = document.getElementById("blackout");
  const projectModal = document.getElementById("projectModal");
  const todoModal = document.getElementById("todoModal");
  const projectDelModal = document.getElementById("projectDelModal");
  const todoDelModal = document.getElementById("todoDelModal");
  const projectEditModal = document.getElementById("projectEditModal");
  const todoEditModal = document.getElementById("todoEditModal");

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
    projectEditModal.style.visibility = "hidden";
    todoEditModal.style.visibility = "hidden";
  };

  const projectDel = () => {
    projectDelModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };

  const todoDel = () => {
    todoDelModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };

  const projectEdit = () => {
    projectEditModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };

  const todoEdit = () => {
    todoEditModal.style.visibility = "visible";
    blackout.style.visibility = "visible";
  };
  const cleanProjects = (element) => {
    document.getElementById(element).style["background-color"] = "white";
    document.querySelector("#" + element + " .edit").style.visibility =
      "hidden";
    document.querySelector("#" + element + " .delete").style.visibility =
      "hidden";
  };

  const delProject = (element) => {
    document.getElementById(element).remove();
  };

  const delTodo = (element) => {
    document.getElementById(element).remove();
  }

  const projectButton = (projectPosition) => {
    document.getElementById("project" + projectPosition).style[
      "background-color"
    ] = "rgb(200, 200, 200)";
    document.querySelector(
      "#project" + projectPosition + " .edit"
    ).style.visibility = "visible";
    document.querySelector(
      "#project" + projectPosition + " .delete"
    ).style.visibility = "visible";
  };

  return {
    createProject,
    createTodo,
    closeModal,
    projectDel,
    todoDel,
    projectButton,
    cleanProjects,
    delProject,
    projectEdit,
    todoEdit,
    delTodo,
  };
})();
