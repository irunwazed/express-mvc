import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const { check, validationResult } = require('express-validator');
dotenv.config()

import LoginModel from '../../models/LoginModel'

export default class LoginController{

	static async login(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const login = new LoginModel(req)
		let cek = await login.cek_login(req.body.username, req.body.password)
		let pesan = 'Server sedang bermasalah!'
		let status = false

		if(!cek.status){
			res.send({
				pesan: pesan, status: status
			});
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