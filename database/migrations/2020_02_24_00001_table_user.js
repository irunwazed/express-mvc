import Schema from '../config/Schema';
import Model from '../../app/core/Model';


module.exports = class TableUser{

  constructor() {
    
  }

  static async up(){
    
    await new Schema().create('ref_login', (table)=>{
      table.id('id');
      table.string('login_username');
      table.text('login_password');
      table.tinyInteger('login_akun');
      table.tinyInteger('login_level');
      table.tinyInteger('login_status');
      table.timestamps();
    });

    this.DB = new Model();

		var data = {
			login_username: 'admin',
			login_password: '$2b$10$MqG33qZt8CJQD/gPKWmL6u0o/bMC8Sa8Phn3v96eHVZjpZa5oreni',
			login_akun: 1,
			login_level: 1,
			login_status: 1,
		};
		await this.DB.insert('ref_login',data);

  }

  static down(){
    console.log("query")
  }
}