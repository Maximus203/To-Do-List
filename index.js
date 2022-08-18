/*
    We are going to create a basic to do list app in javascript with the following features:
    
        Add new task
        Delete task
        Mark task as completed
        Edit task
        Sort tasks by date
        Search tasks

*/

window.onload = loadTasks();

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
});

function loadTasks() {
    if (localStorage.getItem("tasks") == null)
        return;

    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach(task => {
        const list = document.getElementById('tasks');

        let element = document.createElement('li');
        element.setAttribute('class', 'list-group-item row');

        let myInput = document.createElement('input');
        myInput.setAttribute('type', 'checkbox');
        myInput.setAttribute('class', 'btn col-1');
        myInput.setAttribute('onclick', 'taskComplete(this)');
        if (task.completed)
            myInput.setAttribute('checked', '');


        let myButtonOne = document.createElement('button');
        myButtonOne.setAttribute('class', 'btn col-9 bg-secondary text-white' + ` ${task.completed ? 'completed' : ''}`);
        myButtonOne.setAttribute('onfocus', 'getCurrentTask(this)');
        myButtonOne.setAttribute('onblur', 'editTask(this)');
        myButtonOne.innerHTML = `${task}`;

        let myButtonTwo = document.createElement('button');
        myButtonTwo.setAttribute('class', 'btn col-2 btn-light bg-danger');
        myButtonTwo.setAttribute('onclick', 'removeTask(this)');
        myButtonTwo.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                class="bi bi-trash3" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>`;

        element.appendChild(myInput);
        element.appendChild(myButtonOne);
        element.appendChild(myButtonTwo);

        list.insertBefore(element, list.children[0]);
    });
}

function addTask(event) {

    if (document.getElementById('task').value == '') {
        alert('You must write some thing');
        return false;
    }


    let task = document.getElementById('task');

    let element = document.createElement('li');
    element.setAttribute('class', 'list-group-item row');

    let myInput = document.createElement('input');
    myInput.setAttribute('type', 'checkbox');
    myInput.setAttribute('class', 'btn col-1');
    myInput.setAttribute('onclick', 'taskComplete(this)');

    let myButtonOne = document.createElement('button');
    myButtonOne.setAttribute('class', 'btn col-9 bg-secondary text-white');
    myButtonOne.setAttribute('onfocus', 'getCurrentTask(this)');
    myButtonOne.setAttribute('onblur', 'editTask(this)');
    myButtonOne.innerHTML = `${task.value}`;

    let myButtonTwo = document.createElement('button');
    myButtonTwo.setAttribute('class', 'btn col-2 btn-light bg-danger');
    myButtonTwo.setAttribute('onclick', 'removeTask(this)');
    myButtonTwo.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                class="bi bi-trash3" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>`;

    element.appendChild(myInput);
    element.appendChild(myButtonOne);
    element.appendChild(myButtonTwo);

    document.getElementById('task').value = '';

    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

    document.getElementById('tasks').insertBefore(element, document.getElementById('tasks').children[0]);

}

function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove();
}