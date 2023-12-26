const dateContainer = document.querySelector(".date");
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
let taskList = document.querySelector(".taskList");
let emptyMessage = document.querySelector("#empty");
const display = document.querySelector(".display");

// Local Storage functions
const saveDisplay = () => {
    localStorage.setItem("data", display.innerHTML);
}

const getDisplay = () => {
    display.innerHTML = localStorage.getItem("data");
}

// Setting today's date
let setDate = new Date;
let day = setDate.toLocaleString('en-US', {weekday: 'short', day: 'numeric'});
let month = setDate.toLocaleString('en-US', {month: 'long'});
dateContainer.innerHTML = `<p>${day}</p><p>${month}</p>`;


// Event listener function for list items
const eventFunction = (task) => {
    task.addEventListener("click", (event) => {
            if(event.target.tagName == "I") {
                let parent = task.parentElement;
                parent.removeChild(task);
                if (parent.children.length == 0) {
                    emptyMessage.style.display = "inline-block";
                }
                saveDisplay();
            } else if (event.target.tagName == "P") {
                task.classList.toggle("done");
                saveDisplay();
            }
        })
}

// Initialization
if(localStorage.getItem("data")) {
    getDisplay();
    emptyMessage = document.querySelector("#empty");
    taskList = document.querySelector(".taskList");
    if (taskList.children.length) {
        let tasks = document.querySelectorAll(".task")
    tasks.forEach(task => {
        eventFunction(task);
    });
    }
}
    

// Creating addTask function
const addTask = () => {
    if (taskInput.value.trim() != "") {
        let newTask = document.createElement("li");
        newTask.setAttribute("class", "task");
        let taskValue = taskInput.value;
        newTask.innerHTML = `<p>${taskValue}</p><i class='bx bxs-trash-alt'></i>`;
        taskList.appendChild(newTask);

        taskInput.value = "";
        emptyMessage.style.display = "none";

        eventFunction(newTask);
        saveDisplay()
    }
}


// Event listeners for addTask
addBtn.addEventListener("click", addTask, saveDisplay);
taskInput.addEventListener("keydown", function(event) {
    if(event.key == "Enter") {
        addTask();
    }
})


