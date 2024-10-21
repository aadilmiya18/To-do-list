let inputBox = document.querySelector("#inputbox");
const addButton = document.querySelector("#addbutton");
const listContainer = document.querySelector("#list-container");


let addTask = () => {
  let userInput = inputBox.value; 

  if (userInput !== "") {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="textdiv">
      <input type="checkbox" class="checkBox">
      <span class="text">${userInput}</span>
    </div>
    <div class="listbutton">
      <button class="libutton editBtn">Edit</button>
      <button class="libutton delBtn">Delete</button>
    </div>
    `;
    listContainer.appendChild(listItem);
    addTaskEvents(listItem); 
    inputBox.value = ""; 
    saveData(); 
  } else {
    alert("Write your task first to add.");
  }
};


function addTaskEvents(listItem) {
  const checkBox = listItem.querySelector(".checkBox");
  let textSpan = listItem.querySelector(".text");

  checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
      textSpan.style.textDecoration = "line-through";
      textSpan.style.color = "red";
      textSpan.style.fontStyle = "italic";
      checkBox.setAttribute("checked", "true")
    } else {
      textSpan.style.textDecoration = "none";
      textSpan.style.color = "white";
      textSpan.style.fontStyle = "normal";
      checkBox.removeAttribute("checked");
    }
    saveData(); 
  });

  const editButton = listItem.querySelector(".editBtn");

  editButton.addEventListener("click", () => {

    editedIask = inputBox.value;

    let editedTask = prompt("Edit your task!", textSpan.innerText);
    if (editedTask !== '') {
      textSpan.innerText = editedTask;
      saveData(); 
    }else{
      editedTask;
    }
  });

  const deleteButton = listItem.querySelector(".delBtn");

  deleteButton.addEventListener("click", () => {
    listItem.remove();
    saveData(); 
  });
}


function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}


function showtaskk() {
  const savedData = localStorage.getItem("tasks");
  console.log(savedData);
  
  if (savedData) {
    listContainer.innerHTML = savedData;
    const allTasks = listContainer.querySelectorAll("li");
    allTasks.forEach((task) => {
      addTaskEvents(task); 
    });
  }
}

addButton.addEventListener("click", addTask);


window.addEventListener("load", showtaskk);


