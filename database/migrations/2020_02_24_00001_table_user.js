const Schema = require('../config/Schema')


module.exports = class TableUser{

  constructor() {
    // up()
  }

  static up(){
    return new Schema().create('ref_user', (table)=>{
      table.id('id');
      table.integer('number');
      return table.getResult();
    });
  }

  static down(){
    console.log("query")
  }
}