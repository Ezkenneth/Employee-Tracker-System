DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INT(11) AUTO_INCREMENT NOT NULL,
    role VARCHAR(30),
    salary DECIMAL(12,4),
    departmentId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(departmentId) REFERENCES department(id)
);
CREATE TABLE employee (
    id INT(11) AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleId INT NOT NULL,
    managerId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(roleId) REFERENCES role(id),
    FOREIGN KEY(managerId) REFERENCES role(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;