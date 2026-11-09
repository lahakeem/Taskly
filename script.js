// ---------- Helper functions ----------

// Shows the message under a field and colours the box. Returns true when the field is OK.
function showError(fieldId, message) {
  var input = document.getElementById(fieldId);
  document.getElementById(fieldId + "-error").innerHTML = message;

  if (message != "") {
    input.style.borderColor = "#A96F76";
    input.style.backgroundColor = "#FBEFEE";
    return false;
  }
  input.style.borderColor = "#686B4B";
  input.style.backgroundColor = "";
  return true;
}

function isEmail(text) {
  var at = text.indexOf("@");
  var dot = text.lastIndexOf(".");
  return at > 0 && dot > at + 1 && dot < text.length - 1 && text.indexOf(" ") == -1;
}

function onlyDigits(text) {
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) < "0" || text.charAt(i) > "9") {
      return false;
    }
  }
  return text.length > 0;
}

function hasLetterAndDigit(text) {
  var letter = false;
  var digit = false;

  for (var i = 0; i < text.length; i++) {
    var c = text.charAt(i).toLowerCase();
    if (c >= "a" && c <= "z") { letter = true; }
    if (c >= "0" && c <= "9") { digit = true; }
  }
  return letter && digit;
}

// ---------- Home page ----------

// Dynamic picture + text: called by the onclick of the three buttons
function changePicture(button, src, alt, text) {
  for (var i = 1; i <= 3; i++) {
    var other = document.getElementById("thumb" + i);
    other.style.backgroundColor = "";
    other.style.color = "";
    other.style.borderColor = "";
  }
  button.style.backgroundColor = "#263E35";
  button.style.color = "#FFFFFF";
  button.style.borderColor = "#263E35";

  document.getElementById("hero-image").src = src;
  document.getElementById("hero-image").alt = alt;
  document.getElementById("hero-tip").innerHTML = text;
}

// Dynamic element: adds a new row to the task table (onsubmit of the form)
var taskNumber = 105;

function addTask() {
  var name = document.getElementById("new-task-name").value.trim();
  var course = document.getElementById("new-task-course").value.trim();
  var date = document.getElementById("new-task-date").value;
  var priority = document.getElementById("new-task-priority").value;

  var ok1 = showError("new-task-name", name.length < 3 ? "Task name must be at least 3 characters." : "");
  var ok2 = showError("new-task-course", course == "" ? "Please enter the course." : "");
  var ok3 = showError("new-task-date", date == "" ? "Please choose a due date." : "");

  if (ok1 && ok2 && ok3) {
    taskNumber = taskNumber + 1;
    document.getElementById("task-body").innerHTML +=
      "<tr><td>#TSK-" + taskNumber + "</td><td>" + name + "</td><td>" + course + "</td><td>" + date + "</td>" +
      '<td><span class="status-badge priority-' + priority.toLowerCase() + '">' + priority + "</span></td>" +
      '<td><span class="status-badge status-pending">Pending</span></td></tr>';

    document.getElementById("add-task-form").reset();
    showError("new-task-name", "");
    showError("new-task-course", "");
    showError("new-task-date", "");
  }
  return false;
}

// ---------- Login page ----------

function validateUser() {
  var user = document.getElementById("username").value.trim();
  var message = "";

  if (user == "") {
    message = "Please enter your email or username.";
  } else if (user.indexOf("@") != -1 && !isEmail(user)) {
    message = "Please enter a valid email.";
  } else if (user.length < 3) {
    message = "A username needs at least 3 characters.";
  }
  return showError("username", message);
}

function validateLoginPassword() {
  var pass = document.getElementById("password").value;
  return showError("password", pass.length < 8 ? "Password must be at least 8 characters." : "");
}

function validateLogin() {
  var ok1 = validateUser();
  var ok2 = validateLoginPassword();

  if (ok1 && ok2) {
    window.location.href = "index.html";
  }
  return false;
}

// ---------- Sign-up page ----------

function validateName() {
  var name = document.getElementById("fullname").value.trim();
  return showError("fullname", name.split(" ").length < 2 ? "Please enter your first and last name." : "");
}

function validateId() {
  var id = document.getElementById("studentid").value.trim();
  var ok = onlyDigits(id) && id.length >= 7 && id.length <= 9;
  return showError("studentid", ok ? "" : "Student ID must be 7 to 9 digits.");
}

function validateEmail() {
  var email = document.getElementById("email").value.trim();
  return showError("email", isEmail(email) ? "" : "Please enter a valid email.");
}

function validateNewPassword() {
  var pass = document.getElementById("signup-password").value;
  var ok = pass.length >= 8 && hasLetterAndDigit(pass);
  return showError("signup-password", ok ? "" : "Password needs 8+ characters with a letter and a number.");
}

function validateConfirm() {
  var pass = document.getElementById("signup-password").value;
  var confirm = document.getElementById("confirm-password").value;
  var ok = confirm != "" && confirm == pass;
  return showError("confirm-password", ok ? "" : "The two passwords do not match.");
}

function validateSignup() {
  var results = [validateName(), validateId(), validateEmail(), validateNewPassword(), validateConfirm()];
  var valid = true;

  for (var i = 0; i < results.length; i++) {
    if (results[i] == false) {
      valid = false;
    }
  }

  if (valid) {
    window.location.href = "login.html";
  }
  return false;
}
