let mysql = require('mysql2/promise');

let connection =  mysql.createPool({
  host: 'localhost',
  port: 3307, 
  user: 'root',
  password: 'root',
  database: 'Blog' 
});


module.exports = connection;
