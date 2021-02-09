import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import LoginModel from '../models/LoginModel'

export default class LoginController{

	static index(req, res) {
		console.log(req.headers)
		res.render("pages/login");
	}

	static async set_login(req, res) {
		const login = new LoginModel(req)
		let cek = await login.cek_login(req.body.username, req.body.password)
		
		if(!cek.status){
			res.redirect('/login');
		}else{
			var token = jwt.sign(cek.data, process.env.JWT_SECRET_KEY);
			// res.header('X-JWT-TOKEN' , token )
			res.setHeader('X-JWT-TOKEN', token);
			res.render("pages/login");
			// res.render("pages/login");
		}
	}

	static cek_login(req, res){
		token = ''
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		} catch(err) {
			console.log(err);
		}
	}
}