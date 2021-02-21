import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const { validationResult } = require('express-validator');
dotenv.config()

import LoginModel from '../../models/LoginModel'

export default class LoginController{

	static async login(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const login = new LoginModel(req)
		let pesan = 'Server sedang bermasalah!'
		let status = false
		let cek = await login.cek_login(req.body.username, req.body.password)
		
		if(!cek.status){
			res.send({
				pesan: cek.pesan, 
				status: cek.status,
				token: ''
			});
		}else{
			var token = jwt.sign(cek.data, process.env.JWT_SECRET_KEY);

			res.send({
				pesan: cek.pesan,
				status: cek.status,
				token: token
			});
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