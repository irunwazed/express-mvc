const mysql = require('mysql');
require('dotenv').config()
const util = require('util');

module.exports = class Database{

  constructor() {
  }

  setConnection(resolve, reject){

    this.con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    return new Promise(
      this.con.connect(function(err) {
        if (err){
          reject()
        };
        console.log("Connected!");
        resolve()
      })
    ); 
    

    // return this.con
  }

  setQuery(query){
    console.log(query)
    var data;
  	this.con.query(query, function (err, result, fields) {
  		if (err){
        // throw err
        Promise.reject(err)
      }
      // data = result
      Promise.resolve(result)
  		// console.log(result);
  	});
    // return data
  }
  
}