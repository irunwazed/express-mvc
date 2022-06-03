import util from 'util';
import config from '../config/config'

export default class Model{

	async query(_query){
		const queryExecute = util.promisify(config.DB.query).bind(config.DB);
		var data
		try{
			data = await queryExecute(_query)
		}catch(e){
			console.log(e.sqlMessage)
		}
		return data
	}
}