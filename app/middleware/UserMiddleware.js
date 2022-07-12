import jwt from 'jsonwebtoken';
import {getTokenFromCookie} from '../config/library'

export default  {
  checkUser : (req, res, next) => {
    try {
      // console.log(req.headers);
      let token = getTokenFromCookie(req.headers.cookie, process.env.JWT_NAME);
      
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if(typeof decoded.id == "number"){
        next()
      }else{
        res.redirect('/login');
      }
    }
    catch(err) {
      res.redirect('/login');
    }
  },

  checkApi : (req, res, next) => {
    
    let except = [
      '/api/login',
      '/api/cek-login',
    ]
    // console.log(except.indexOf(req.originalUrl))
    
    if(except.indexOf(req.originalUrl) < 0){

      let token = req.header(process.env.JWT_NAME)
		
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
  
      status?next():res.send({
        pesan: 'Anda harus login terlebih dahulu', 
        status: false
      });
    }else{
      next()
    }

  }
}

// function getTokenFromCookie(cookie, name){

//   var token = cookie;
//   token = token.split('; ')
//   var hasil = '';
//   for(let i = 0; i < token.length; i++){
//     let _token = token[i].split("=");
//     if(_token[0] == name){
//       hasil = _token[1];
//     }
//   }
//   return hasil;
// }