import mysql from "mysql2/promise";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();


// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   port: 3307
// });

const pool =mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootpassword",
  database: "cns_db",
  port:3307
});

export default pool;
