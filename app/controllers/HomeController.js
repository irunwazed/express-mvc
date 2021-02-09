import LoginModel from '../models/LoginModel'

export default class HomeController{

	static async index(req, res)  {
		res.render("components/index");
	}

	static notFound(req, res) {
		res.render("pages/not-found");
	}
}