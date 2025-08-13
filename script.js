document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Load saved tasks or empty array

    // Render all tasks from the array
    function renderTasks() {
        taskList.innerHTML = ""; // Clear the list before re-rendering
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            removeButton.onclick = function () {
                tasks.splice(index, 1); // Remove from array
                localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated list
                renderTasks(); // Refresh UI
            };

            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        let taskText = taskInput.value.trim();

        if (taskText === "") {
            alert('Enter Task');
            return;
        }

        tasks.push(taskText); // Add to array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to Local Storage
        renderTasks(); // Re-render

        taskInput.value = "";
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks(); // Load saved tasks on page load
});
/*function renderTasks() {
    taskList.innerHTML = ""; // 1️⃣ Clear the current list in the DOM

    tasks.forEach(function(taskText) { // 2️⃣ Loop through each task in the array
        const li = document.createElement('li'); // 3️⃣ Create a new <li>
        li.textContent = taskText; // 4️⃣ Add the task text to the <li>

        const removeButton = document.createElement('button'); // 5️⃣ Create a remove button
        removeButton.textContent = 'Remove'; // 6️⃣ Set button text

        // 7️⃣ Remove task on click
        removeButton.onclick = function() {
            tasks = tasks.filter(t => t !== taskText); // Remove from array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated array
            renderTasks(); // Refresh the list
        };

        li.appendChild(removeButton); // 8️⃣ Add button to <li>
        taskList.appendChild(li); // 9️⃣ Add <li> to the task list
    });
}

Step-by-step breakdown:

    taskList.innerHTML = "";

        This clears any existing HTML inside the list, so we don’t duplicate tasks when we re-render.

    tasks.forEach(function(taskText) { ... })

        Loops through each task in the tasks array.

        taskText is the text for each individual task.

    const li = document.createElement('li');

        Creates a new <li> element for the current task.

    li.textContent = taskText;

        Sets the list item’s text to the task description.

    const removeButton = document.createElement('button');

        Creates a button so the user can delete the task.

    removeButton.textContent = 'Remove';

        Adds the word "Remove" on the button.

    removeButton.onclick = function() { ... }

        Runs when the "Remove" button is clicked:

            Filters out the clicked task from the tasks array.

            Saves the updated array in Local Storage.

            Calls renderTasks() again to refresh the UI.

    li.appendChild(removeButton);

        Puts the button inside the list item.

    taskList.appendChild(li);

        Adds the complete <li> (with text + button) into the task list on the page.

*/