import mysql2 from "mysql2";

console.log("connecting to RDS db:", process.env.DB_BOOK_IT_HOST);

export const db = mysql2.createConnection({
  host: process.env.DB_BOOK_IT_HOST,
  user: process.env.DB_BOOK_IT_USER,
  password: process.env.DB_BOOK_IT_PASSWORD,
  database: process.env.DB_BOOK_IT_DATABASE,
});

export default db;
