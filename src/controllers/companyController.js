// controllers/companyController.js
const db = require("../db/index");

// Create a new company
exports.addCompany = async (req, res) => {
  try {
    const { name, email, phone, website, no_of_emp, address } = req.body;

    const result = await db.query(
      `INSERT INTO company (name, email, phone, website, no_of_emp, address)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, phone, website, no_of_emp, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM company");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM company WHERE company_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, website, no_of_emp, address } = req.body;

    const result = await db.query(
      `UPDATE company
       SET name       = $1,
           email      = $2,
           phone      = $3,
           website    = $4,
           no_of_emp  = $5,
           address    = $6
       WHERE company_id = $7
       RETURNING *`,
      [name, email, phone, website, no_of_emp, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM company WHERE company_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
