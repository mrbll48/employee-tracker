const inquirer = require("inquirer");
const db = require("./config/mysql.js");

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "firstQuestion",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Update an employee's manager",
      "View employees by manager",
      "Delete departments",
      "Delete roles",
      "Delete employees",
      "Quit",
    ],
  },
];

function viewDepartments() {
  db.promise()
    .query("SELECT * from departments")
    .then(([rows]) => {
      console.table(rows);
      setTimeout(mainQuestion, 1000);
    });
}

function viewRoles() {
  db.promise()
    .query("SELECT * from roles")
    .then(([rows]) => {
      console.table(rows);
      setTimeout(mainQuestion, 1000);
    });
}

function viewEmployees() {
  db.promise()
    .query(
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id"
    )
    .then(([rows]) => {
      console.table(rows);
      setTimeout(mainQuestion, 1000);
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "name",
    })
    .then((answers) => {
      db.promise()
        .query("INSERT INTO departments SET ?", answers)
        .then(() => setTimeout(viewDepartments, mainQuestion, 1000));
    });
}

function addRole() {
  db.promise()
    .query("SELECT * FROM departments")
    .then(([depts]) => {
      const deptChoices = depts.map((dept) => {
        console.log(dept);
        return {
          name: dept.name,
          value: dept.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the name of the role?",
            name: "title",
          },
          {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary",
          },
          {
            type: "list",
            message: "Which department does the role belong to?",
            name: "department_id",
            choices: deptChoices,
          },
        ])
        .then((answers) => {
          console.log(answers);
          db.promise()
            .query("INSERT INTO roles SET ?", answers)
            .then(() => setTimeout(viewRoles, mainQuestion, 1000));
        });
    });
}

function addEmployee() {
  db.promise()
    .query("SELECT * FROM roles")
    .then(([roles]) => {
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      db.promise()
        .query("SELECT * FROM employees")
        .then(([emps]) => {
          const empChoices = emps.map((emp) => ({
            name: emp.first_name + " " + emp.last_name,
            value: emp.id,
          }));
          inquirer
            .prompt([
              {
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name",
              },
              {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name",
              },
              {
                type: "list",
                message: "What is the role for this employee?",
                name: "role_id",
                choices: roleChoices,
              },
              {
                type: "list",
                message: "Who is this employee's manager?",
                name: "manager_id",
                choices: empChoices,
              },
            ])
            .then((answers) => {
              console.log(answers);
              db.promise()
                .query("INSERT INTO employees SET ?", answers)
                .then(() => setTimeout(viewEmployees, mainQuestion, 1000));
            });
        });
    });
}

function updateEmployee() {
  db.promise()
    .query("SELECT * FROM employees")
    .then(([emps]) => {
      const employeeChoices = emps.map((emp) => {
        console.log(emp);
        return {
          name: emp.first_name + " " + emp.last_name,
          value: emp.role_id,
        };
      });
      db.promise()
        .query("SELECT * FROM roles")
        .then(([roles]) => {
          const roleChoices = roles.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
          inquirer
            .prompt([
              {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "name",
                choices: employeeChoices,
              },
              {
                type: "list",
                message: "What is this employee's new role?",
                name: "role_id",
                choices: roleChoices,
              },
            ])
            .then((answers) => {
              db.promise().query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [answers.role_id, answers.name]
              );
            })
            .then(() => setTimeout(viewEmployees, mainQuestion, 1000));
        });
    });
}

function updateEmpManager() {
  db.promise()
    .query("SELECT * FROM employees")
    .then(([managers]) => {
      const managerUpdate = managers.map((man) => ({
        name: man.first_name + " " + man.last_name,
        value: man.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employees manager would you like to update?",
            name: "name",
            choices: managerUpdate,
          },
          {
            type: "list",
            message: "Which manager would you like to assign to this employee?",
            name: "newManager",
            choices: managerUpdate,
          },
        ])
        .then((answers) => {
          db.promise().query(
            "UPDATE employees SET manager_id = ? WHERE id = ?",
            [answers.newManager, answers.name]
          );
        })
        .then(() => setTimeout(viewEmployees, mainQuestion, 1000));
    });
}

function viewEmpByManager() {
  db.promise()
    .query("SELECT * FROM managers")
    .then(([managers]) => {
      const managerList = managers.map((manager) => {
        return {
          name: manager.first_name + " " + manager.last_name,
          value: manager.manager_id,
        };
      });

      inquirer
        .prompt({
          type: "list",
          message: "Select a manager to view managed employees",
          name: "managers",
          choices: managerList,
        })
        .then((answers) => {
          db.promise()
            .query(`SELECT ${answers.value} FROM employees`)
            .then(([rows]) => {
              console.table(rows);
            });
        });
    });
}

function deleteDepartments() {
  db.promise().query().then();
}

function deleteRoles() {
  db.promise().query().then();
}

function deleteEmployees() {
  db.promise().query().then();
}

function quit() {
  db.end();
}

function mainQuestion() {
  inquirer.prompt(questions).then((answers) => {
    console.log(answers.firstQuestion);
    switch (answers.firstQuestion) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployee();
        break;
      case "Update an employee's manager":
        updateEmpManager();
        break;
      case "View employees by manager":
        viewEmpByManager();
        break;
      case "Delete departments":
        deleteDepartments();
        break;
      case "Delete roles":
        deleteRoles();
        break;
      case "Delete employees":
        deleteEmployees();
        break;
      case "Quit":
        quit();
        break;
    }
  });
}

mainQuestion();
