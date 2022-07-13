import Schema from '../config/Schema';
import Model from '../../app/core/Model';


module.exports = class TablePenduduk{

  constructor() {
    
  }

  static async up(){
    
    await new Schema().create('ref_penduduk', (table)=>{
      table.id('id');
      table.string('penduduk_nama');
      table.string('penduduk_nik');
      table.tinyInteger('penduduk_status');
      table.timestamps();
    });
    this.DB = new Model();
    var data = {
			penduduk_nama: 'aka',
			penduduk_nik: '74711',
			penduduk_status: 1,
		};
		await this.DB.insert('ref_penduduk',data);
    
  }

  static down(){
    console.log("query")
  }
}