import util from 'util';
import config from '../config/config'
import Database from '../config/database';

export default class Model{

	async query(_query){
		
		// always load
		// const DB = await new Database().setConnection();
		// const queryExecute = util.promisify(DB.query).bind(DB);

		// sekali load
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