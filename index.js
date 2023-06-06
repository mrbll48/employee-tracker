const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    message: "What would you like to do?",
    name: "firstQuestion",
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
