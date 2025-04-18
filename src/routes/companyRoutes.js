// routes/comproute.js
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// Create a new company
router.post("/", companyController.addCompany);

// Get all companies
router.get("/", companyController.getAllCompanies);

// Get one company by ID
router.get("/:id", companyController.getCompanyById);

// Update an existing company
router.put("/:id", companyController.updateCompany);

// Delete a company
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
