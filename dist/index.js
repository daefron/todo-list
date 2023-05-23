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
    console.log(projectHolder);
    buttons.delProject("project" + activeProject);
    delete projectHolder[activeProject];
    console.log(projectHolder);
  }

  const createTodo = () => {
    buttons.closeModal();
    let project = activeProject;
    console.log(project);
    let position = projectHolder.at(project).todoHolder.length;
    console.log(position);
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
    editDiv.appendChild(todoEdit);

    let delDiv = document.createElement("div");
    todoDiv.appendChild(delDiv);
    let todoDel = document.createElement("img");
    todoDel.classList.add("delete");
    todoDel.src = "delete-forever.svg";
    todoDel.setAttribute("onclick", "buttons.todoDel()");
    delDiv.appendChild(todoDel);
  }

  const getActiveProject = (projectPosition) => {
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
      todoToDisplay(projectHolder.at(projectPosition).todoHolder[todoAmount]);
    }
    return activeProject;
  };
  return {
    createProject,
    deleteProject,
    createTodo,
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

  const cleanProjects = (element) => {
    document.getElementById(element).style["background-color"] = "white";
    document.querySelector("#" + element + " .edit").style.visibility =
      "hidden";
    document.querySelector("#" + element + " .delete").style.visibility =
      "hidden";
  };

  const delProject = (element) => {
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
  };
})();
