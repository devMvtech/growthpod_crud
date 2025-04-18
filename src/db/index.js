const { Pool } = require("pg");
const { config } = require("dotenv");
config();

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.PORT,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD ,
//   port: process.env.DBPORT,
// });


// const pool = new Pool({
//   user: "postgres",
//   host: "db.millmtdhlxklbiacamzt.supabase.co",
//   database: "postgres",
//   password: "Mohit@123",
//   port: 5432,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Example: "postgresql://user:password@host:port/dbname"
  ssl: {
    rejectUnauthorized: false, // Only if you're using services like Heroku
  },
});

console.log(pool)

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully!");
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};
