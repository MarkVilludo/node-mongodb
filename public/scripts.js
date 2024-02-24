// public/scripts.js
$(document).ready(function() {

    // Event listener for creating a task
    $('#createTaskForm').submit(function(event) {
      event.preventDefault();

      // Gather form data
      const title = $('#title').val();
      const description = $('#description').val();
      const completed = $('#completed').prop('checked');

      // Send AJAX request to create the task
      $.ajax({
        url: '/tasks',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ title, description, completed }),
        success: function(newTask) {
          // Handle success, e.g., show a success message
          alert('Task created successfully');
          console.log('Task created successfully', newTask);
          // Optionally, redirect to the task list or another page
          window.location.href = '/';
        },
        error: function(error) {
          // Handle error, e.g., show an error message
          console.error('Error creating task', error);
        }
      });

      // After creating the task, fetch and refresh the task list
      // fetchTasks();
    });

    // Event listener for deleting a task
    $('#deleteTaskLink').click(function(event) {
      event.preventDefault(); // Prevent the default link behavior

      // Display a confirmation prompt
      const confirmed = window.confirm('Are you sure you want to delete this task?');

      if (confirmed) {
        const taskId = $(this).data('task-id'); // Get task ID from data attribute

        // Send AJAX request to delete the task
        $.ajax({
          url: `/tasks/${taskId}`,
          method: 'DELETE',
          success: function() {
            // Handle success, e.g., show a success message
            console.log('Task deleted successfully');
            // Optionally, redirect to the task list or another page
            window.location.href = '/tasks';
          },
          error: function(error) {
            // Handle error, e.g., show an error message
            console.error('Error deleting task', error);
          }
        });
      }
    });

    // Fetch tasks from the server and display them in the table
    $.get("http://localhost:3000/tasks", function(tasks) {
      const taskList = $("#taskList");

      tasks.forEach(function(task) {
        // Append a new row for each task
        taskList.append(
          `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">${task._id}</td>
            <td class="px-6 py-4">${task.title}</td>
            <td class="px-6 py-4">${task.description}</td>
            <td class="px-6 py-4">${task.completed ? 'Yes' : 'No'}</td>
          </tr>`
        );
      });
    });
  });
  