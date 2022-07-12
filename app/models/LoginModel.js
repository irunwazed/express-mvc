import Model from '../core/Model'
import bcrypt from 'bcrypt';

export default class LoginModel extends Model{
    constructor(){
			super()
			this.table = 'ref_login'
    }

    async cek_login(username, password){
			let status = false
			let pesan = 'Server sedang bermasalah!'

			let hash = bcrypt.hashSync(password, 10);
			var data = await super.query("SELECT * FROM "+this.table+" WHERE login_username = '"+username+"'")
			let session = {}
			if(data.length == 1){
				if (bcrypt.compareSync(password, data[0].login_password)) {
					session = {
						id: data[0].id,
						username: data[0].login_username,
						level: data[0].login_level,
					}
					status = true
					pesan = 'Berhasil login'
				}else{

					pesan = 'Password Salah!'
				}
			}else{
				pesan = 'User tidak ditemukan'
			}
			
			return {
				status: status,
				pesan: pesan,
				data: session
			}
    }
}