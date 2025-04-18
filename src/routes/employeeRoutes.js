// routes/emproute.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Create a new employee
router.post("/", employeeController.addEmployee);

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get one employee by ID
router.get("/:id", employeeController.getEmployeeById);

// Update an existing employee
router.put("/:id", employeeController.updateEmployee);

// Delete an employee
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;