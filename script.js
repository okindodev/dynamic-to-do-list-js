document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't re-save
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // Remove the text of the button from li.textContent
            const taskText = li.firstChild.textContent.trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a new task (with optional save)
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim();
            if (taskText === "") {
                alert('Enter Task');
                return;
            }
        }

        // Create the list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(taskText));

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Remove task when clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append button and li
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            saveTasks();
        }

        // Clear input field
        taskInput.value = "";
    }

    // Event listener for add button
    addButton.addEventListener('click', () => addTask());

    // Event listener for pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize by loading saved tasks
    loadTasks();
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