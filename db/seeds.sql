USE employee_tracker_db;

INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal'),
  ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Senior Engineer', 180000, 1),
  ('Junior Engineer', 140000, 1),
  ('Sales Manager', 160000, 2),
  ('Salesperson', 100000, 2),
  ('Finance Officer', 190000, 3),
  ('Accountant', 145000, 3),
  ('Legal Officer', 200000, 4),
  ('Legal Analyst', 150000, 4),
  ('Legal Assistant', 100000, 4),
  ('Marketing Director', 170000, 5),
  ('Marketing Associate', 120000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ron', 'Swanson', 1, null), 
  ('Andrew', 'Dwyer', 2, 1),
  ('Leslie', 'Knope', 3, null),
  ('Sabastian', 'Little', 4, 3),
  ('Donna', 'Meagle', 5, null),
  ('Thomas', 'Haverford', 6, 5), 
  ('Gary', 'Gergich', 7, null),
  ('Chris', 'Traeger', 8, 7),
  ('April', 'Ludgate', 9, 7),
  ('Anne', 'Perkins', 10, null),
  ('Benjamin', 'Wyatt', 11, 10);
