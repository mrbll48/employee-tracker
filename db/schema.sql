DROP DATABASE IF EXIST employee_db;
CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(50)
    ON DELETE SET NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(50),
    department VARCHAR(50)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    employee_salary INT NOT NULL,
    department VARCHAR(50),
    managers VARCHAR (50)
    ON DELETE SET NULL
);