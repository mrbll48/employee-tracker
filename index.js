const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`connected to ${database}`)
);

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
  {
    type: "input",
    message: "What is the name of the department?",
    name: "department",
  },
  {
    type: "input",
    message: "What is the name of the role?",
    name: "role",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "salary",
  },
  {
    type: "input",
    message: "Which department does the role belong to?",
    name: "department",
  },
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "lastName",
  },
  {
    type: "input",
    message: "Who is the employee's manager?",
    name: "manager",
  },
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    name: "roleUpdate",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(answers);
});
