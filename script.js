document.addEventListener('DOMContentLoaded', function(){
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

//creating addTask Function.
function addTask(){
    let taskText = taskInput.value.trim();
    if (taskText ===""){
        alert('Enter Task');
        return; // Stop function execution if empty
    }
    // Task creation and removal.
    // We don't use the else statement because we used the return statement.
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a new button element for removing the task. Set its textContent to "Remove", and give it a class name of 'remove-btn'
    const removeButton = document.createElement('button');
    removeButton.textContent = ('Remove');
    removeButton.classList.add('remove-btn');

    //Assign an onclick event to the remove button that, when triggered, removes the li element from taskList.
    removeButton.onclick = function(){
        taskList.removeChild(li);
        //Append the remove button to the li element, then append the li to taskList.
        li.appendChild(removeButton);
        taskList.appendChild(li)
        //Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = "";
    }
}
//// ✅ Event listener added AFTER we define addTask
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event){
if (event.key==='Enter'){
    addTask();
}
});
});
