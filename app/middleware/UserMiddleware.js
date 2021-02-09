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
    }
}