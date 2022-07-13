import Model from '../core/Model'
import DB from '../library/DB'

export default class PendudukModel extends Model{
    constructor(){
			super()
			this.table = 'ref_login'
    }

    async getData(username, password){
			let status = false
			let pesan = 'Server sedang bermasalah!'

			let data = DB.table('ref_penduduk').where('id', 1).get();
			
			return {
				status: status,
				pesan: pesan
			}
    }
}