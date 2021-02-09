import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import LoginModel from '../models/LoginModel'

export default class LoginController{

	static index(req, res) {
		res.render("pages/login");
	}

	static async setLogin(req, res) {
		const login = new LoginModel(req)
		let cek = await login.cek_login(req.body.username, req.body.password)
		if(!cek.status){
			res.redirect('/login');
		}else{
			var token = jwt.sign(cek.data, process.env.JWT_SECRET_KEY);

			// set session token
			res.cookie('cokkieName', token, { maxAge: 900000, httpOnly: true })
			// . set session token
			
			res.redirect('/admin/tes');
		}
	}

	static cekLogin(req, res){
		token = ''
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		} catch(err) {
			console.log(err);
		}
	}

	static setSession(){
		
	}

}