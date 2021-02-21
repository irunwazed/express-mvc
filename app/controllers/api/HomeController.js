import LoginModel from '../../models/LoginModel'

export default class HomeController{

	static async index(req, res)  {
		let api = {
			status: true,
			data: [],
		}
		res.send(api);
	}

	
}