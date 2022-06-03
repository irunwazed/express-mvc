import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';

import LoginModel from '../../models/LoginModel'

export default class LoginController{

	static async login(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const login = new LoginModel()
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
				token: token,
			});
		}
	}

	static cekLogin(req, res){
		let token = req.header(process.env.JWT_NAME);
		let pesan = 'Server sedang bermasalah!'
		let status = false
		let decoded = ''
		
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
			pesan = ''
			status = true
		} catch(err) {
			pesan = err.message
			console.log(err);
		}

		res.send({
			pesan: pesan, 
			status: status,
			session: {
				username: decoded.username,
				level: decoded.level
			}
		});
	}

	static setSession(){
		
	}

}