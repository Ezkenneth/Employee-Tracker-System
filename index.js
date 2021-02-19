const mysql = require('mysql');
const inquirer = require('inquirer');
const conTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your Port; if not 3306
    port: 3306,

    // Your Username
    user: "root",

    // Your password 
    password: "sqlPassword",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Employee_db is now connected");
    startApp();
});

function startAPP() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "Select an option from list",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Departments",
            "Add Roles",
            "Add Employees",
            "Update Employee Roles",
            "Update Employee Managers",
            "View Employees by Manager",
            "Delete Departments",
            "Delete Roles",
            "Delete Employees",
            "View Departmental Budgets",
            "Exit",
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "View Departments":
                deptView();
                break;

            case "View Roles":
                roleView();
                break;

            case "View Employees":
                empView();
                break;

            case "Add Departments":
                deptAdd();
                break;

            case "Add Roles":
                roleAdd();
                break;

            case "Add Employees":
                empAdd();
                break;

            case "Update Employee Roles":
                empUpdateRole();
                break;

            case "Update Employee Managers":
                empUpdateMan();
                break;

            case "View Employees by Manager":
                empManView();
                break;

            case "Delete Departments":
                deptDel();
                break;

            case "Delete Roles":
                roleDel();
                break;

            case "Delete Employees":
                empDel();
                break;
            
            case "View Departmental Budgets":
                deptBudgetView();
                break;

            case " Exit":
                connection.end();
                break;
        }
    });
}

// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Roles
function roleView() {
    console.log("All roles from database");
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Employees
function empView() {
    console.log("All employees from database");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Adding Departments
function deptAdd() {
  inquirer
  .prompt({
      name: "addDept",
      type: "input",
      message: "Name of new department?"
  })
  .then(function(answer) {
      connection.query("INSERT INTO department (name) VALUES (?)", answer.addDept, function(err, res){
          if (err) throw err;
          console.log(res);
          startAPP();
      });
  });
}

// Adding Roles
function roleAdd() {
    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "Name of new role?"
        },
        {
            name: "salary",
            type: "input",
            message: "Salary of new role?"
        },
        {
            name: "deptID",
            type: "input",
            message: "Department ID of new role?"
        }

    ])
    .then(function (answer) {
        connection.query("INSERT INTO role (title, salary, departmentId) VALUES (?, ?, ?", [answer.title, answer.salary, answer.deptID], function(err, res){
            if (err) throw err;
            console.log(res);
            startAPP();
        });
    });
}


// Adding Employees
function empAdd() {
   inquirer.prompt([
       {
           name: "firstName",
           type: "input",
           message: "Employee first name?"
       },

       {
        name: "lastName",
        type: "input",
        message: "Employee last name?"
    },
    {
        name: "roleID",
        type: "input",
        message: "Employee role ID?"
    },
    {
        name: "managerID",
        type: "input",
        message: "Employee manager ID?"
    },
   ])
   .then(function(answer) {
       connection.query("INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res){
           if (err) throw err;
           console.log(res);
           startAPP();
       });
   });
}

// Updating Employee Roles
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}


// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Viewing Departments
function deptView() {
    console.log("All departments from database");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}