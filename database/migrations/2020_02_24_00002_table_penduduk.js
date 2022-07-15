import Schema from '../config/Schema';
import DB from '../../app/library/DB';


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

    var data = [
      { penduduk_nama: 'aka', penduduk_nik: '74711', penduduk_status: 1, },
      { penduduk_nama: 'irun', penduduk_nik: '74711', penduduk_status: 1, },
      { penduduk_nama: 'sinta', penduduk_nik: '74711', penduduk_status: 1, },
      { penduduk_nama: 'jojo', penduduk_nik: '74711', penduduk_status: 1, },
    ];
		await DB.table('ref_penduduk').insert(data);
    
  }

  static down(){
    console.log("query")
  }
}