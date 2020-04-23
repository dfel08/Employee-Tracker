const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  promptUser();
});

function promptUser() {
  return inquirer.prompt({
    type: "list",
    message: "Please select an option: ",
    name: "option",
    choices: ["View Roles", "View Employees", "View Departments", "Add Roles", "Add Employees", "Add Department", "Update Employee Role"]
  }).then(function (res) {
    switch (res.option) {
      case ("View Roles"):
        viewRoles();
        break;
      case ("View Employees"):
        viewEmployees();
        break;
      case ("View Departments"):
        viewDepartments();
        break;
      case ("Add Roles"):
        addRoles();
        break;
      case ("Add Employees"):
        addEmployees();
        break;
      case ("Add Department"):
        addDepartment();
        break;
      case ("Update Employee Role"):
        updateRole();
        break;
    }
  })
}

function viewRoles() {
  connection.query("SELECT title as Title, roles_id as Role #, salary as Salary, department_id as Department")
}