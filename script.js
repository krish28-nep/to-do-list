const button = document.getElementById('search');
const taskInput = document.getElementById('add_new');
let jsonData=[];
button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the form from submitting

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
    } else {
        let task = taskInput.value.trim();
        createTask(task);
        taskInput.value = ''; // Clear the input after adding the task
    }
});

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateDate(timeText) {
    let currentTime = new Date();
    let hours = currentTime.getHours().toString().padStart(2, '0');
    let minutes = currentTime.getMinutes().toString().padStart(2, '0');
    timeText.textContent = `${month[currentTime.getMonth()]} ${currentTime.getDate()} ${currentTime.getFullYear()}, ${hours}:${minutes}`;
}

function createTask(task) {
    let taskList = document.getElementById('taskList');
    let taskElement = document.createElement('div');
    taskElement.className = 'task';

    let check = document.createElement('input');
    check.setAttribute("type", "checkbox");

    // Create a span element to hold the task text
    let taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.style.marginLeft = '10px';

    // Create a remove button
    let removeButton = document.createElement('i');
    removeButton.setAttribute('class', 'fa fa-remove');
    removeButton.style.fontSize = '24px';
    removeButton.style.color = 'red';
    removeButton.style.marginLeft = '10px';
    removeButton.style.cursor = 'pointer';

    // Create a time icon
    let timeButton = document.createElement('i');
    timeButton.setAttribute('class', 'fa fa-clock');
    timeButton.style.fontSize = '20px';
    timeButton.style.color = 'black';
    timeButton.style.Left = '1';

    // Create the edit button
    let editButton = document.createElement('i');
    editButton.setAttribute('class', 'fa-solid fa-file-pen');
    editButton.style.cursor = "pointer";
    editButton.style.marginLeft = '50px';

    editButton.addEventListener('click', e => {
        timeText.style.display = 'none';
        editButton.style.display = 'none';

        let editTask = document.createElement('input');
        editTask.setAttribute('type', 'text');
        editTask.value = taskText.textContent; // Pre-fill the input with the current task text

        // Positioning the editTask input field
        editTask.style.position = "absolute";
        editTask.style.left = "7"; // Adjust positioning as needed

        taskElement.appendChild(editTask);

        editTask.addEventListener('keypress', e => {
            if (e.key === "Enter") {
                taskText.textContent = editTask.value.trim();
                taskElement.removeChild(editTask);
                timeText.style.display = 'inline';
                editButton.style.display = 'inline';
                updateDate(timeText); // Update the date after editing
                taskText.prepend(check);
            }
        });
    });

    // Initialize timeText and update its content
    let timeText = document.createElement('span');
    timeText.style.marginLeft = '90px';
    timeText.style.paddingBottom = '20px';
    timeText.style.fontSize = '10px';
    timeText.style.color = 'gray';
    updateDate(timeText);

    // Add event listener to the remove button
    removeButton.addEventListener('click', () => {
        taskList.removeChild(taskElement);
        // Remove from local storage
        removeFromLocalStorage(taskText.textContent);
    });

    // Append checkbox, task text, time icon, time text, edit button, and remove button to task element
    taskText.prepend(check);
    taskElement.appendChild(taskText);
    timeText.prepend(timeButton);
    taskElement.appendChild(timeText);
    taskElement.appendChild(editButton);
    taskElement.appendChild(removeButton);

    // Append the task element to the task list
    taskList.appendChild(taskElement);

    let enteredData = {
        task: taskText.textContent,
        time: timeText.textContent
    }

    jsonData.push(enteredData);
    console.log(jsonData);

    let jsonString= JSON.stringify(jsonData);

    const localData= localStorage.setItem("Data", jsonString);
    
}

function removeFromLocalStorage(taskTextContent) {
    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("Data")) || [];

    // Filter out the task with taskTextContent
    tasks = tasks.filter(task => task.task !== taskTextContent);

    // Update local storage with the filtered tasks
    localStorage.setItem("Data", JSON.stringify(tasks));
}


window.addEventListener('load', () => {
    let tasks = JSON.parse(localStorage.getItem('Data')) || [];
    tasks.forEach(task => {
        createTask(task.task);
    });
});