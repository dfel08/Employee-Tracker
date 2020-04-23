-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS employee_db;

-- Created the DB "employee_db" (only works on local connections)
CREATE DATABASE employee_db;

-- Use the DB employee_db for all the rest of the script
USE employee_db;

-- Created the table "schools"
CREATE TABLE department (
	id INT AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary decimal,
    department_id int,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (roles_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (dept_name)
VALUES ("Engineering");
INSERT INTO department (dept_name)
VALUES ("Sales");
INSERT INTO department (dept_name)
VALUES ("Legal");
INSERT INTO department (dept_name)
VALUES ("IT");
INSERT INTO department (dept_name)
VALUES ("Finance");
INSERT INTO department (dept_name)
VALUES ("Human Resources") ;
INSERT INTO roles (title, salary, department_id)
VALUES ("Web Developer",100000,1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer",120000,1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer",150000,1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Technology Officer",200000,1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Development Rep",60000,2);
INSERT INTO roles (title, salary, department_id) 
VALUES ("Account Executive",85000,2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Director",120000,2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Vice President - Sales",160000,2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Revenue Officer",200000,2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Compliance Analyst",100000,3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Compliance Manager",130000,3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Counsel",180000,3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Counsel",220000,3);
INSERT INTO roles (title, salary, department_id)
VALUES ("IT Analyst",90000,4);
INSERT INTO roles (title, salary, department_id)
VALUES ("IT Manager",130000,4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Finance Operations Analyst",80000,5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Finance Operations Manager",120000,5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant",95000,5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Controller",140000,5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Risk Analyst",120000,5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Risk Manager",160000,5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Financial Officer",200000,5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources Analyst",80000,6);
INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources Manager",120000,6);
INSERT INTO roles (title, salary, department_id)
VALUES ("Chief Human Resources Officer",180000,6);