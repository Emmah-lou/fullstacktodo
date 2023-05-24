import "./requests";
import $, { post } from "jquery";

import { indexTasks, postTask } from "./requests.js";

$(document).ready(function () {
  // Load tasks on page load
  indexTasks(function (response) {
    displayTasks(response.tasks);
  });

  // Function to display tasks
  function displayTasks(tasks) {
    var htmlString = tasks.map(function (task) {
      return (
        "<div class='col-12 mb-3 p-2 border rounded task' data-id='" +
        task.id +
        "'>" +
        task.content +
        "</div>"
      );
    });

    $("#tasks").html(htmlString);
  }

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
// $("#new_task").on("submit", function (event) {
//   event.preventDefault();
//   postTask($("#task_content").val(), function (response) {
//     $("#tasks").append(
//       "<div class='col-12 mb-3 p-2 border rounded task' data-id='" +
//         response.task.id +
//         "'> \
//       " +
//         response.task.content +
//         "\
//       </div>"
//     );
//   });
// });

// indexTasks(function (response) {
//   var htmlString = response.tasks.map(function (task) {
//     return (
//       "<div class='col-12 mb-3 p-2 border rounded task' data-id='" +
//       task.id +
//       "'> \
//       " +
//       task.content +
//       "\
//       </div>"
//     );
//   });

//   $("#tasks").html(htmlString);
// });
