const util = require('util');

export default class Model{
	constructor(req){
		this.req = req
	}

	async query(_query){
		const queryExecute = util.promisify(this.req.app.get('config').DB.query).bind(this.req.app.get('config').DB);
		var data
		try{
			data = await queryExecute(_query)
		}catch(e){
			console.log(e.sqlMessage)
		}
		return data
	}
}