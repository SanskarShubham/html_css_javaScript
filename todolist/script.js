const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addtask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    saveData();
  }
}
listContainer.addEventListener('click', function(params) {
    if (params.target.tagName === "LI") {
        params.target.classList.toggle("checked");
        saveData();
    }else if (params.target.tagName === "SPAN") {
        params.target.parentElement.remove();
        saveData();
    }
},false);

function saveData() {
    localStorage.setItem('data',listContainer.innerHTML);
}
function showData() {
  const data = localStorage.getItem('data');
    listContainer.innerHTML =    data;
}
showData();