import "./requests";
import $, { post } from "jquery";

import { indexTasks, postTask, deleteTask, updateTask } from "./requests.js";

$(document).ready(function () {
  // Load tasks on page load
  indexTasks(function (response) {
    displayTasks(response.tasks);
  });

  // Function to display tasks
  function displayTasks(tasks) {
    var htmlString = tasks.map(function (task) {
      var taskClass = task.completed ? "completed" : "active";
      return (
        "<div class='col-12 mb-3 p-2 border rounded task " +
        taskClass +
        "' data-id='" +
        task.id +
        "'>" +
        task.content +
        "<button class='remove-button'>Remove</button>" +
        "<button class='active-complete'>Active/Complete</button>" +
        "</div>"
      );
    });

    $("#tasks").html(htmlString);
  }
  $(document).on("click", ".remove-button", function () {
    var id = $(this).parent(".task").data("id");
    deleteTask(
      id,
      function (response) {
        console.log("Task deleted successfully:", response);
        displayTasks(response.tasks);
      },
      function (error) {
        console.error("Error deleting task:", error);
      }
    );
  });

  $(document).on("click", ".active-complete", function () {
    var id = $(this).parent(".task").data("id");
    console.log(id);
    //if task is active, mark as complete
    updateTask(
      id,
      function (response) {
        console.log("Task updated successfully:", response);
        displayTasks(response.tasks);
      },
      function (error) {
        console.error("Error updating task:", error);
      }
    );
  });

  // Event listener for form submission
  $("#new_task").on("submit", function (event) {
    event.preventDefault();
    var taskContent = $("#task_content").val();
    postTask(
      taskContent,
      function (response) {
        console.log("Task posted successfully:", response);
        displayTasks(response.tasks);
        $("#task_content").val(""); // Clear the input field after successful submission
      },
      function (error) {
        console.error("Error posting task:", error);
      }
    );
  });
});
