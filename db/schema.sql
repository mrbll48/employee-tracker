DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE departments (
    id INT,
    dept_name VARCHAR(50)
);

CREATE TABLE roles (
    id INT,
    job_title VARCHAR(50),
    department VARCHAR(50)
);

CREATE TABLE employees (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    employee_salary INT NOT NULL,
    department VARCHAR(50),
    managers VARCHAR (50)
);