INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, department, salary, department_id)
VALUES
    ('Sales Lead', "Sales", 100000, 1),
    ('Salesperson', "Sales", 80000, 1),
    ('Lead Engineer', "Engineering", 150000, 2),
    ('Software Engineer', "Engineering", 120000, 2),
    ('Account Manager', "Finance", 160000, 3),
    ('Accountant', "Finance", 125000, 3),
    ('Legal Team Lead', "Legal", 250000, 4),
    ('Lawyer', "Legal", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);

INSERT INTO managers (first_name, last_name)
VALUES 
    ('John', 'Doe'),
    ('Ashley', 'Rodriguez'),
    ('Kunal', 'Singh'),
    ('Sarah', 'Lourd');

