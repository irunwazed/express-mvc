import Schema from '../config/Schema';
import Model from '../../app/core/Model';


module.exports = class TablePenduduk{

  constructor() {

  }

  static async up(){
    
    await new Schema().create('ref_penduduk', (table)=>{
      table.id('id');
      table.string('penduduk_username');
      table.text('penduduk_password');
      table.tinyInteger('penduduk_akun');
      table.tinyInteger('penduduk_level');
      table.tinyInteger('penduduk_status');
      table.timestamps();
      
      return table.getResult();
    });

  }

  static down(){
    console.log("query")
  }
}