// controllers/employeeController.js
const db = require("../db/index");

// Create a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, job_title, salary, address } = req.body;

    const result = await db.query(
      `INSERT INTO employee (name, email, job_title, salary, address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, job_title, salary, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM employee");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM employee WHERE employee_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, job_title, salary, address } = req.body;

    const result = await db.query(
      `UPDATE employee
       SET name = $1,
           email = $2,
           job_title = $3,
           salary = $4,
           address = $5
       WHERE employee_id = $6
       RETURNING *`,
      [name, email, job_title, salary, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM employee WHERE employee_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
