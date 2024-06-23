const input = document.getElementById('input');
const button = document.getElementById('search');
const taskInput = document.getElementById('add_new');

button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the form from submitting
    let message = [];
    if (taskInput.value === '' || taskInput.value === null) {
        message.push('Type anything you want');
    }

    if (message.length > 0) {
        alert(message.join(', '));
    } else {
        let task = taskInput.value;
        createTask(task);
        taskInput.value = ''; // Clear the input after adding the task
    }
});

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
    timeButton.style.marginLeft = '10px';

    let currentTime = new Date();
    let timeText = document.createElement('span');
    timeText.textContent = `Created at: ${currentTime.getHours()}:${currentTime.getMinutes()}`;
    timeText.style.marginLeft = '10px';
    timeText.style.fontSize = '14px';
    timeText.style.color = 'gray';

    // Add an event listener to the remove button
    removeButton.addEventListener('click', () => {
        taskList.removeChild(taskElement);
    });

    // Append the checkbox, task text, time icon, and remove button to the task element
    taskText.prepend(check);
    taskElement.appendChild(taskText);
    taskElement.appendChild(timeButton);
    timeButton.append(timeText)
    taskElement.appendChild(removeButton);

    // Append the task element to the task list
    taskList.appendChild(taskElement);
}
