import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import LoginModel from '../models/LoginModel'

export default class LoginController{

	static index(req, res) {
		res.render("pages/login");
	}

	static login(req, res) {
		res.render("pages/login");
	}

	static set_login(req, res) {

        console.log(req.body.username)
        console.log(process.env.JWT_SECRET_KEY)

        // res.redirect('/login');
        var token = jwt.sign({ foo: 'bar' }, process.env.JWT_SECRET_KEY);
        console.log(token);
        var decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch(err) {
            console.log(err);
        }
        
        console.log('decoded');
        console.log(decoded);
        
		res.render("components/index");
	}

    static cek_login(req, res){

    }
}