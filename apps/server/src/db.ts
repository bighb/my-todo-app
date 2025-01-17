import mysql from "mysql2/promise";
import dotenv from "dotenv";
// 加载 .env 文件中的环境变量
dotenv.config();

console.log(process.env.DB_HOST); // 输出 localhost

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
