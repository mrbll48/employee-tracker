INSERT INTO departments (id, name)
VALUES  (1, "Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");

INSERT INTO roles (id, title, salary)
VALUES (1, "Sales Lead", 100000),
        (2, "Salesperson", 80000),
        (3, "Lead Engineer", 150000);

INSERT INTO employees (id, first_name, last_name, manager_id)
VALUES (1, "John", "Doe", "NULL"),
        (2, "Mike", "Chan", "John Doe"),
        (3, 'Ashley', "Rodriguez", "NULL");
