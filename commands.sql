-- create employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  designation VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL
);


-- create payroll table
CREATE TABLE payroll (
  id SERIAL PRIMARY KEY,
  employee_id INT REFERENCES employees(id),
  month INT NOT NULL,
  year INT NOT NULL,
  hours_worked DECIMAL(10, 2) NOT NULL,
  deductions DECIMAL(10, 2) NOT NULL
);


-- insert employees data
INSERT INTO employees (name, designation, department, salary)
VALUES
  ('John Doe', 'Manager', 'Sales', 5000),
  ('Jane Smith', 'Developer', 'IT', 4000),
  ('Mark Johnson', 'Accountant', 'Finance', 4500);

-- insert payroll data
INSERT INTO payroll (employee_id, month, year, hours_worked, deductions)
VALUES
  (1, 6, 2023, 160, 200),
  (2, 6, 2023, 160, 150),
  (3, 6, 2023, 160, 180);


-- 
-- 
-- 
-- calculate employee's net salary
SELECT e.id, e.name, p.month, p.year,
  (e.salary * (p.hours_worked / 160)) - p.deductions AS net_salary
FROM employees e
JOIN payroll p ON e.id = p.employee_id;

-- update payroll data
UPDATE payroll
SET hours_worked = 176
WHERE employee_id = 1 AND month = 6 AND year = 2023;


-- delete payroll data
DELETE FROM payroll
WHERE employee_id = 3 AND month = 6 AND year = 2023;
