const mysql = require('mysql');
require('dotenv').config()

module.exports = class Database{

  constructor() {
  }

  setConnection(){

    new Promise((resolve, reject) => {
      if (done) {
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
        const workDone = 'Here is the thing I built'
        resolve(workDone)
      } else {
        const why = 'Still working on something else'
        reject(why)
      }
    })
    

    // return this.con
  }

  setQuery(query){
  	this.con.query(query, function (err, result, fields) {
  		if (err) throw err;
  		console.log(result);
  	});
  }
  
}