var jwt = require('jsonwebtoken');

export default  {
  checkUser : (req, res, next) => {

    console.log(req.headers)
    var a = 1;
    if(a== 1){
      next()
    }else{
      res.redirect('/login');
    }
  },

  checkApi : (req, res, next) => {

    let except = [
      '/api/login',
      '/api/cek-login',
    ]
    console.log(except.indexOf(req.originalUrl))
    
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