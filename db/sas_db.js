const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sv79.ifastnet.com',
  user: 'ntoweryo_mas_evans',
  password: 'M!le6545478510',
  database: 'ntoweryo_sellswords_and_spellcrafts'
});

connection.connect((err) => {
  if (err) {
    console.log('Error:'+ err);
    return;
  }
  console.log('connected');
});

connection.query('SELECT * FROM `player`', (err, results) => {
  if (err) {
    console.log('Error:', err);
    return;
  }
  console.log('Data from database:', results);

  connection.end((err) => {
    if (err) {
      console.error('Error closing connection:', err);
    }
    console.log('Connection closed');
  });
});