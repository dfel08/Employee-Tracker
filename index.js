var mysql = require("mysql")
var inquirer = require("inquirer")
var cTable = require('console.table');


//first we make a connection to the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();


});

// prompt user allows for userto provide what they want to do next
function start(){
    return inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "option",
        choices: ["View Roles", "View Employees", "View Departments", "Add Roles", "Add Employees", "Add Departments", "Update Employee Role"]

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
            case ("Add Departments"):
                addDepartment();
                break;
            case ("Update Employee Role"):
                updateRole();
                break;
        }

    })
}




function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        var parsedRes = cTable.getTable(res.map(element => { return { id: element.id, department: element.dept_name } }));
        console.log(parsedRes)
        start()
    })
}


function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "dept_name",
        message: "What is the name of this new dept?"
    })
    .then(function (data) {
        connection.query(`INSERT INTO department (dept_name) VALUES ("${data.dept_name}")`, function (err) {
            if (err) throw err;
            console.log("Adding new department...")
            viewDepartments()
        });

    });
};


function viewRoles() {
    connection.query("SELECT roles.id as role_id, title, salary, department_ID, department.dept_name FROM roles LEFT JOIN department on roles.department_ID = department.id", function (err, res) {
        if (err) throw err;
        var parsedRes = cTable.getTable(res.map(element => { return { id: element.role_id, title: element.title, salary: element.salary, department: element.name } }));
        console.log(parsedRes)
        start()

    })
}

function addRoles() {
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What is the title of the role?"
    }, {
        type: "input",
        name: "salary",
        message: "What is the annualized salary?"
    }, {
        type: "input",
        name: "dept_id",
        message: "What department id does this role belong to?"
    }])
    .then(function (data) {
    connection.query(`INSERT INTO role(title,salary, department_id) VALUES ("${data.title}", ${data.salary}, ${data.dept_id})`, function (err) {
        console.log("Success! - You added a new role")
        viewRoles()
    });

});
};


function viewEmployees() {
    connection.query(`SELECT employee.id as employeeID, first_name, last_name, roles.title, roles.salary, department.dept_name as department, manager_ID
    FROM employee
    LEFT JOIN roles on employee.roles_ID = roles.id
    LEFT JOIN department on roles.department_ID = department.id`, function (err, res) {
        if (err) throw err;
        var parsedRes = cTable.getTable(res.map(element => { return { id: element.employeeID, name: element.first_name + " " + element.last_name, title: element.title, salary: element.salary, manager: element.manager_ID ,department: element.department } }));
        console.log(parsedRes)
        start()

    })
}


function addEmployees() {
    inquirer.prompt([{
        type: "input",
        name: "first",
        message: "First Name: "
    }, {
        type: "input",
        name: "last",
        message: "Last Name: "
    }, {
        type: "input",
        name: "roles_id",
        message: "Role id:"
    },
    {
        type: "input",
        name: "mgr_id",
        message: "Manager id:"
    }])
    .then(function (data) {
    connection.query(`INSERT INTO employee(first_name,last_name, roles_id, manager_id) VALUES ("${data.first}", "${data.last}","${data.roles_id}", "${data.mgr_id}")`, function (err) {
        if (err) throw err;
        console.log("You added a new employee")
        viewEmployees()
    });

});
};


function updateRole(new_id, roles_id) {
    connection.query(`UPDATE employee SET roles_ID = '${roles_id}' WHERE id='${new_id}'`)
    viewEmployees()
}
