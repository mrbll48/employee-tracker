DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    title VARCHAR(30),
    department VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)

);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(50),
    manager_id INT
);

CREATE TABLE managers (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
)