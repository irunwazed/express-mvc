const mysql = require('mysql');
require('dotenv').config()

class Database{

  constructor() {
  }

  setConnection(){
    this.con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    this.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

    return this.con
  }

  setQuery(query){
  	this.con.query(query, function (err, result, fields) {
  		if (err) throw err;
  		console.log(result);
  	});
  }
  
}
const DB = new Database()

DB.setConnection()
console.log("tes")
