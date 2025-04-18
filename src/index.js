const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const path = require("path");


// initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// // import routes
const employeeRoutes = require("./routes/employeeRoutes");
const companyRoutes = require("./routes/companyRoutes");
const authRoute = require("./routes/auth")


// initialize routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/company", companyRoutes);

app.use("/", (req, res) => {
  console.log("Welcome to Student Management System");
});

// app start
const appStart = () => {
  try {
    // res.send('Hello World!')
    app.listen(PORT, () => {
      // SERVER_URL: process.env.SERVER_URL,
        console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

appStart();
