const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Database = require('./database');

const connection = new Database({
    host: "localhost",

    // Your Port; if not 3306
    port: 3306,

    // Your Username
    user: "root",

    // Your password 
    password: "sqlPassword",
    database: "employee_db"
});



async function uiPrompt() {
    console.log('\n')
    return inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "Select an option from list",
        choices: [
            "View Departments",
            "View Employees",
            "View All Roles",
            "View Employee Details",
            "Add Departments",
            "Add Roles",
            "Add Employees",
            "Update Employee Roles",
            "Update Employee Managers",
            // "View Employees by Manager",
            "Delete Departments",
            "Delete Roles",
            "Delete Employees",
            // "View Departmental Budgets",
            "Exit",
        ]
    })
  
}


// Viewing Departments
async function deptView() {
    const query = "SELECT * FROM department";
    const rows = await connection.query(query);
    console.table(rows)
}

// Viewing Roles
async function roleView() {
    const query = "SELECT roles FROM roles";
    const rows = await connection.query(query);
    console.table(rows)
    
}

// Viewing Employees
async function empView() {
    const query = "SELECT * FROM employee";
    const rows = await connection.query(query);
    console.table(rows)
}

// Viewing employee details 
async function viewEmployeesDetails() {
    console.log('\n')
    const query = `SELECT employee.id AS 'ID',
    firstName AS 'First Name',
    lastName AS 'Last Name',
    roles.roles AS 'Title',
    department.name AS 'Department',
    roles.salary AS 'Salary',
    managerId AS 'Manager ID'
    FROM employee, roles, department
    WHERE employee.roleId = roles.id
    AND roles.departmentId = department.id
    ORDER BY employee.id ASC;`;
    const rows = await connection.query(query);
    console.table(rows)

    
};

//Getting employee names for DB
async function getEmpNames () {
    const query = `SELECT * FROM employee`;
    const rows = await connection.query(query);
    let empNames = [];
    for (const eployee of rows) {
        empNames.push(`${employee.firstName} ${employee.lastName}`);
    }
    return empNames
};

// View Employees by department
async function getEmployeesByDept() {
    console.log('\n')
    const query = `SELECT firstName AS 'First Name', lastName AS 'Last Name', department.name AS 'Department Name' FROM 
    ((employee INNER JOIN role ON roleId = role.id)
    INNER JOIN department ON departmentId = department.id)
    ORDER BY employee.id ASC`;
    const rows = await connection.query(query, args)
            return rows[0].id
};
// Adding the departments
async function getDeptInfo (deptInfo) {
    const deptName = deptInfo.deptName;
    const query = `INSERT into department (name) VALUES (?)`;
    const args = [deptName];
    const rows = await connection.query(query, args);
    console.log(`${deptName} added as new department.`)
}
// Adding Departments
async function deptAdd() {
  return inquirer
  .prompt({
      name: "deptName",
      type: "input",
      message: "Name of new department?"
  })

}


// Get department names 
async function getDepartmentNames() {
    const query = `SELECT name FROM department`;
    const rows = await connection.query(query);
    let departments = [];
    console.log(rows)
    for (const row of rows) {
        departments.push(row.name)
    }
    return departments
};

// Get Role names 
async function getRoleNames() {
    const query = `SELECT name FROM roles`;
    const rows = await connection.query(query);
    let roles = [];
    console.log(rows)
    for (const row of rows) {
        roles.push(row.name)
    }
    return departments
};


// Adding Roles to database
async function getRoleInfo() {
    const departments = await getDepartmentNames();
    console.log(departments)
    return inquirer
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
            type: "list",
            message: "Department of new role?",
            choices: [
                ...departments
            ]
        }

    ])
    
}

// get departments by ID 
async function getDepartmentsByID(departmentName) {
    const query = `SELECT * FROM department WHERE department.name = ?`;
    const args = [departmentName];
    const rows = await connection.query(query, args);
    return rows[0].id
};


// Get role ID
async function getRoleId (roleName) {
    const query = `SELECT id FROM roles WHERE roles.roles = ?`
    const args = [roleName];
    const rows = await connection.query(query, args)
            return rows[0].id
};


// Getting employee ID 
async function getEmployeeId(employeeName) {
    if (employeeName === "None") {
        return null
    }
    const first_name = employeeName.split(' ')[0]; 
    const last_name = employeeName.split(' ')[1];
    const query = `SELECT id FROM employee WHERE firstName = ? AND lastName = ?`;
    const rows = await connection.query(query, [first_name, last_name], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            return rows[0].id
        }
    }); 
};

// Getting roles
async function getRoles() {
    const query = `SELECT id AS 'ID', roles AS 'Title', salary AS 'Salary' FROM roles`;
    const rows  = await connection.query(query);
    console.table(rows)
}

// Add the employees
async function addEmployee (employee) {
    const roleID = await getRoleId(employee.role);
    const managerID = await getEmployeeId(employee.manager);
    const query = `INSERT INTO employee (firstName, lastName, roleId, managerId)
            VALUES (?, ?, ?, ?)`;
    const args = [employee.firstName, employee.lastName, roleID, managerID];
    const rows = await connection.query(query, args, (error) => {
        if (error){
            console.log(error)
            throw error
        } else {
            console.log(`${employee.firstName} ${employee.lastName} added.`)
            return rows
        }
    });
};

// Getting employee Info for database
async function getEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
    .prompt([
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
        name: "role",
        type: "list",
        message: "Employee role ID?",
        choices: [
            ...roles
        ]
    },
    {
        name: "manager",
        type: "list",
        message: "Employee manager?",
        choices: [
            ...managers, "null"
        ]
    },
   ])
  //Manager Names 
  async function getManagerNames() {
      const query = `SELECT * FROM employee WHERE managerId IS NULL`;
      const rows = await connection.query(query);
            let employNames = [];
      for (const employee of rows) {
          employNames.push(`${employee.firstName} ${employee.lastName}`)
      }
      return employNames
  }
}

// Adding new Role
async function roleAdd(roleInfo) {
    const deptId = await getDepartmentsByID(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const role = roleInfo.roleName
    const query = `INSERT into roles (roles, salary, departmentId) VALUES (?, ?, ?, ?)`;
    const args = [role, salary, deptId];
    await connection.query(query, args);
    console.log(`New role added`)
}

// Getting employee list 
const employList = (name) => {
    console.log(name)
    let hireList = name.split(' ');
    return hireList;
}
// updating the employee role 
async function updateEmpRole(info) {
    console.log(info);
    const role_Id = await getRoleId(info.role)
    const employee = getEmpNames(info.employee);
    const query = `UPDATE employee SET roleId = ? WHERE employee.firstName = ? AND employee.lastName = ?`;
    const args = [role_id, employee[0], employee[1]];
    await connection.query(query, args);
    console.log(`${employee[0]} ${employee[1]} updated with new role - ${info.role}`)
}

// Updating Employee Roles
async function empRoleUpdate() {
    const employList = await getEmpNames();
    const roles = await getRoles();
    return inquirer.prompt([
        {
        name : "employee",
        type: "list",
        message: "Employee to update?",
        choices: [
            ...employList
        ]
        },
        {
            name : "role",
            type: "list",
            message: "Employee role?",
            choices: [
                ...roles
            ]
            }
    ])
}



// function empUpdate() {
//     connection.query("SELECT concat(firstName,' ', lastName) as fullName FROM employee", function (err, res) {
//         if (err) throw err;
//         let employeeList = [];
//         res.forEach(element.fullName)
//     });
//     inquirer
//     .prompt({
//         name: "updateEmployee",
//         type: "list",
//         message: "Employee to update?",
//         choices: employeeList
//     })
//     .then(function(answer) {
//         let choice = answer.employee.split(" ");
//         inquirer
//         .prompt({
//             name: "employee",
//             type: "list",
//             message: "What would you like to change?",
//             choices: ["First Name", "Last Name", "Role ID", "Manager ID"]
//         })
//         .then(function (answer) {
//             inquirer
//             .prompt({
//                 name: "employee",
//                 type: "input",
//                 message: `Enter new ${answer.employee}:`
//             })
        
//         })
//         .then(function (userInput) {
//             let option = "";
//             switch (answer.employee) {
//                 case "First Name":
//                     option = "firstName"
//                     break;
//                 case "Last Name":
//                     option = "lastName"
//                     break;
//                 case "Role ID":
//                     option = "roleId"
//                     break;
//                 case "Manager ID":
//                     option = "managerId"
//                     break;

//             }
//             connection.query(`UPDATE employee SET ${option} = "${userInput.employee}" WHERE id = ${id[0]}`, function (err){
//                 if (err) throw err;
//                 startAPP();
//             } )
//         })
//     })
// }

// Deleting Departments
function deptDel() {
    inquirer
    .prompt([
        {
            name: "department",
            type: "list",
            message: "Department to delete?",
            choices: name
        }
    ])
    .then(function (res) {
        var sql = "DELETE FROM  department WHERE name = ?";
        connection.query(sql, [res.department], function (err, res) {
            if (err) throw err;
            console.log(res);
            startAPP();
        });
    });
}

// Deleting Roles
function roleDel() {
    inquirer
    .prompt([
        {
            name: "roles",
            type: "list",
            message: "Role to delete?",
            choices: names
        }
    ])
    .then(function (res) {
        var sql = "DELETE FROM  role WHERE name = ?";
        connection.query(sql, [res.roles], function (err, res) {
            if (err) throw err;
            console.log(res);
            startAPP();
        });
    });
}

// Deleting Departments
function empDel() {
    inquirer
    .prompt([
        {
            name: "employee",
            type: "list",
            message: "Department to delete?",
            choices: name
        }
    ])
    .then(function (res) {
        var sql = "DELETE FROM  employee WHERE name = ?";
        connection.query(sql, [res.employee], function (err, res) {
            if (err) throw err;
            console.log(res);
            startAPP();
        });
    });
}

async function startAPP() {
   
    let endProgram = false
    while(!endProgram) {
        const prompt = await uiPrompt();

    switch (prompt.action.toLowerCase()) {
        case "view employees":{
            await empView();
            break;
        }
        
        case "view employees by dept":{
            await getEmployeesByDept();
            break;
        }

        case "view employee details":{
            await viewEmployeesDetails();
            break;
        }
        
        case "view departments":{
            await deptView();
            break;
        }
        case "view all roles":{
           await roleView();
            break;
        }    
        case "view employees":{
          await empView();
            break;
        }
        case "add departments":{
           const departmentAdd = await deptAdd();
           await getDeptInfo(departmentAdd)
            break;
        }
        case "add roles": {
            await roleAdd();
            break;
        }
        case "add employees":{
          const addEmployees = addEmployee();
          await getEmployeeInfo(addEmployees)
            break;
        }
        case "update employee roles":{
           await empRoleUpdate();
            break;
        }
        case "view employees by manager":{
           await empManView();
            break;
        }
        case "delete departments":{
          await  deptDel();
            break;
        }
        case "delete roles":{
           await roleDel();
            break;
        }
        case "delete employees":{
           await empDel();
            break;
        }  
        case "view departmental budgets":{
           await deptBudgetView();
            break;
        }
        case " exit":
            endProgram = true;
            console.log("GoodBye")
           process.exit(0);
        }
        
    }
// });
}
startAPP()
