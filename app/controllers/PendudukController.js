import LoginModel from '../models/LoginModel'

export default class PendudukController{

	static async index(req, res)  {
		res.render("components/index");
	}
	
	static async getData(req, res)  {
		res.render("components/index");
	}

}