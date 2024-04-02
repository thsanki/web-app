document.addEventListener('DOMContentLoaded', () => {
    getTasks(); 
});

async function submitTask() {
    const courseId = document.getElementById('courseId').value;
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const additionalDetails = document.getElementById('additionalDetails').value;

    const taskData = {
        courseId,
        taskName,
        dueDate,
        additionalDetails,
    };

    try {
        const response = await fetch('/submitTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            alert('Task submitted successfully!');
            getTasks();
        } else {
            const data = await response.json();
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error submitting task:', error);
    }
}

async function getTasks() {
    const courseId = document.getElementById('courseId').value;

    try {
        const response = await fetch(`/courses/${courseId}/tasks`);

        if (response.ok) {
            const tasks = await response.json();
            displayTasks(tasks);
        } else {
            const data = await response.json();
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = ''; 

    if (tasks.length === 0) {
        const noTasksMessage = document.createElement('li');
        noTasksMessage.textContent = 'No tasks found for the course';
        tasksList.appendChild(noTasksMessage);
    } else {
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = `Task: ${task.taskName}, Due Date: ${task.dueDate}, Additional Details: ${task.additionalDetails || 'N/A'}`;
            tasksList.appendChild(taskItem);
        });
    }
}
