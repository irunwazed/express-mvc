const mysql = require('mysql');
require('dotenv').config()
const util = require('util');

module.exports = class Database{

  constructor() {
  }

  async setConnection(){

    this.con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

		// await this.con.connect(function(err) {
    //   if (err) throw err;
		// 	// if (err){
		// 	// 	// reject()
		// 	// };
		// 	// console.log("Connected!");
		// 	// resolve()
		// })
		// console.log(this.con);
    
    return this.con
  }
}