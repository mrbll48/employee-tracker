const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});

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
        .then(() => setTimeout(mainQuestion, 1000));
    });
}

function addRole() {
  db.promise()
    .query("SELECT * from departments")
    .then(([depts]) => {
      const departmentChoices = depts.map((dept) => {
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
            choices: departmentChoices,
          },
        ])
        .then((answers) => {
          db.promise()
            .query("INSERT INTO roles SET ?", answers)
            .then(() => setTimeout(mainQuestion, 1000));
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
              db.promise()
                .query("INSERT INTO employees SET ?", answers)
                .then(() => setTimeout(mainQuestion, 1000));
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
            .then(() => setTimeout(mainQuestion, 1000));
        });
    });
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
    }
  });
}

mainQuestion();
