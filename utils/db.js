import mysql  from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "breyner_adso2894667",
  password: "Breyner.051207",
  database: "node_adso2894667"
});

export default connection;