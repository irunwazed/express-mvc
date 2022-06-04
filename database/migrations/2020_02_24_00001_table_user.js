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
      
      return table.getResult();
    });

    this.DB = new Model();
    let query = "INSERT INTO `ref_login` (`id`, `login_username`, `login_password`, `login_akun`, `login_level`, `login_status`, `created_at`, `updated_at`) VALUES (NULL, 'admin', '$2b$10$MqG33qZt8CJQD/gPKWmL6u0o/bMC8Sa8Phn3v96eHVZjpZa5oreni', '1', '1', '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
    var data = await this.DB.query(query);

  }

  static down(){
    console.log("query")
  }
}