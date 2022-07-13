import Schema from '../config/Schema';
import Model from '../../app/core/Model';


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

    this.DB = new Model();
    var data = {
			penduduk_id: 1,
			user_id: 1,
		};
		await this.DB.insert('ref_penduduk_user',data);

  }

  static down(){
    console.log("query")
  }
}