const mysql = require('mysql');
const credentials = require('./configuration');

let connection = mysql.createPool({
    host     : credentials.mysql.host, 
    user     : credentials.mysql.user,
    password : credentials.mysql.password,
    database : credentials.mysql.database
});

connection.getConnection( (err) => {
    if(err){
        console.log(' Error connecting to database',err);
    } else {
        console.log(' Conected to MySQL ');
    }
});

module.exports = mysqlConnection;