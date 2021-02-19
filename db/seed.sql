USE employee_db;

INSERT INTO department (name)
VALUES ('HR'), ('Finance'), ('Administration'), ('Engineering'), ('Testers');

INSERT INTO role (role, salary, departmentId)
VALUES ('HR Officer', 70000, 1),
('HR Manager', 90000, 1);
INSERT INTO role (role, salary, departmentId)
VALUES ('Junior Accountant', 80000, 2),
('Senior Accountant', 120000, 2);
INSERT INTO role (role, salary, departmentId)
VALUES ('Junior Software Developer', 60000, 3),
('Full Stack Developer', 90000, 3),
('Senior Software Developer', 120000, 3);
INSERT INTO role (role, salary, departmentId)
VALUES ('Software Tester', 70000, 4);

INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES ('Michael', 'Wazowski', 1, null),
('Angela', 'Cleo', 1, 1),
('Ophelia', 'Fuuls', 2, 2),
('Donna', 'Karma', 2, null),
('Gael', 'Sung', 3, 3),
('Gloria', 'Young', 3, 3),
('Onee', 'Ara', 3, 3),
('Jimmy', 'Sparks', 3, null),
('James', 'Sullivan', 4, null);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
