import Schema from '../config/Schema';
import Model from '../../app/core/Model';


module.exports = class TablePendudukUser{

  constructor() {

  }

  static async up(){
    
    await new Schema().create('ref_penduduk_user', (table)=>{
      table.id('id');
      table.integer('penduduk_id');
      table.integer('user_id');
      table.timestamps();

      table.foreign('user_id').references('ref_login', 'id');
      
      return table.getResult();
    });

  }

  static down(){
    console.log("query")
  }
}