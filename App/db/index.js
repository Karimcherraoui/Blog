let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3307, 
  user: 'root',
  password: 'root',
  database: 'Blog' 
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');
  
  
});

module.exports = connection;
