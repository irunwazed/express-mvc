import Schema from '../config/Schema';
import DB from '../../app/library/DB';


module.exports = class TablePendudukUser{

  constructor() {
    
  }

  static async up(){
    
    await new Schema().create('ref_penduduk_user', (table)=>{
      table.id('id');
      table.bigInteger('penduduk_id');
      table.bigInteger('user_id');
      table.timestamps();

      table.foreign('user_id').references('ref_login', 'id').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('penduduk_id').references('ref_penduduk', 'id').onDelete('CASCADE').onUpdate('CASCADE');
      
    });
    var data = {
			penduduk_id: 1,
			user_id: 1,
		};
		await DB.table('ref_penduduk_user').insert(data);

  }

  static down(){
    console.log("query")
  }
}