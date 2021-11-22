const inquirer = require("inquirer");
require("console.table");
const deps = [];
const role = [];
const emps = [];
const mans = [];

const db = require("./config/connection");

const task = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((res) => {
      if (res.action === "view all departments") {
        db.query(`SELECT * FROM department`, (err, rows) => {
          if (err) throw err;
          console.table(rows);
          task();
        });
      } else if (res.action === "view all roles") {
        db.query(
          `SELECT roles.title, roles.id, department.name AS department, roles.salary
          FROM roles
          LEFT JOIN department ON roles.department_id=department.id;`,
          (err, roles) => {
            if (err) throw err;
            console.table(roles);
            task();
          }
        );
      } else if (res.action === "view all employees") {
        db.query(
          `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name AS department, roles.salary, employees.manager_id AS manager 
          FROM employees
          LEFT JOIN roles 
          ON employees.role_id=roles.id
          LEFT JOIN department
          ON roles.department_id = department.id;`,
          (err, rows) => {
            if (err) throw err;
            console.table(rows);
            task();
          }
        );
      } else if (res.action === "add a department") {
        addDep();
      } else if (res.action === "add a role") {
        addRole();
      } else if (res.action === "add an employee") {
        addEmp();
      } else if (res.action === "update an employee role") {
        empUpdate();
      }
    });
};
// function to add new departments
const addDep = () => {
  db.query(`SELECT * FROM department`, (err, rows) => {
    if (err) throw err;
    // for loop to update departments array
    for (let i = 0; i < rows.length; i++) {
      const newDep = { name: rows[i].name, value: rows[i].id };
      deps.push(newDep);
    }
    //console.log(deps);

    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the new department?",
        },
      ])
      .then((answers) => {
        console.log(answers);
        // add the new department to the department table
        db.query(`INSERT INTO department SET ?`, answers, (err, rows) => {
          if (err) throw err;
          console.log("Success!");
          task();
        });
      });
  });
};
// function to add new roles
const addRole = () => {
  db.query(`SELECT * FROM department`, (err, rows) => {
    if (err) throw err;
    // for loop to get complete department array
    for (let i = 0; i < rows.length; i++) {
      const newDep = { name: rows[i].name, value: rows[i].id };
      deps.push(newDep);
    }
    
    db.query(`SELECT * FROM roles`, (err, rows) => {
      if (err) throw err;
      // for loop to get complete roles array
      for (let i = 0; i < rows.length; i++) {
        const newRole = { name: rows[i].title, value: rows[i].id };
        role.push(newRole);
      }
      //console.log(role);
      //console.log(deps);

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the new role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?",
          },
          {
            type: "list",
            name: "department_id",
            message: "What is this roles department?",
            choices: deps,
          },
        ])
        .then((answers) => {
          console.log(answers);
          // add new role to the roles table
          db.query(`INSERT INTO roles SET ?`, answers, (err, rows) => {
            if (err) throw err;
            console.log("Success!");
            task();
          });
        });
    });
  });
};
// function to add new employee
const addEmp = () => {
  db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) throw err;
    // for loop to get the manager/employees array
    for (let i = 0; i < rows.length; i++) {
      const newMan = { name: rows[i].first_name, value: rows[i].id };
      mans.push(newMan);
      //console.log(mans)
    }

    db.query(`SELECT * FROM roles`, (err, rows) => {
      if (err) throw err;
      // for loop to get the employee roles array
      for (let i = 0; i < rows.length; i++) {
        const newEmp = { name: rows[i].title, value: rows[i].id };
        emps.push(newEmp);
      }
      //console.log(emps);

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: emps,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is this employee's manager?",
            choices: mans,
          },
        ])
        .then((answers) => {
          console.log(answers);
          // add employee to employees table
          db.query(`INSERT INTO employees SET ?`, answers, (err, rows) => {
            if (err) throw err;
            console.log("Success!");
            task();
          });
        });
    });
  });
};
//function to udate role of current employee
const empUpdate = () => {
  db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) throw err;
    // for loop to get employee names
    for (let i = 0; i < rows.length; i++) {
      const newArr = { name: rows[i].first_name, value: rows[i].id };
      mans.push(newArr);
    }
    //console.log(emps);
    db.query(`SELECT * FROM roles`, (err, rows) => {
      if (err) throw err;
      // for loop to get employee roles
      for (let i = 0; i < rows.length; i++) {
        const newEmp = { name: rows[i].title, value: rows[i].id };
        emps.push(newEmp);
      }

      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Please choose an employee to update.",
            choices: mans,
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's new role?",
            choices: emps,
          },
        ])
        .then((answers) => {
          console.log(answers);
          db.query(
            `SELECT *
          FROM employees`
          );
          //query to update employee's role 
          db.query(
            `UPDATE employees
          SET role_id= ${answers.role_id}
          WHERE id= ${answers.id}`,
            (err, rows) => {
              if (err) throw err;
              task();
            }
          );
        });
    });
  });
};

task();
