DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    department VARCHAR(50),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employees (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(50),
    manager_id VARCHAR (50)
);