import jwt from 'jsonwebtoken'
const url = require('url'); 

import LoginModel from '../models/LoginModel'

export default class LoginController{

	static index(req, res) {
		res.render("pages/login");
	}

	static async setLogin(req, res) {
		const login = new LoginModel()
		let cek = await login.cek_login(req.body.username, req.body.password)
		if(!cek.status){

			// buat session singkat untuk kirim pesan error
			res.cookie('pesan', "ERROR", { maxAge: 10000, httpOnly: true })

			res.redirect('/login');
		}else{
			var token = jwt.sign(cek.data, process.env.JWT_SECRET_KEY);

			// set session token
			res.cookie(process.env.JWT_NAME, token, { maxAge: 900000000000000, httpOnly: true })
			// . set session token
			
			res.redirect('/admin/tes');
		}
	}

	static logout(req, res){
		res.clearCookie(process.env.JWT_NAME);
		res.redirect('/login');
	}

	static cekLoginApi(req, res){
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