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
  return {
    createProject,
    createTodo,
    closeModal,
    projectDel,
    todoDel,
  };
})();
