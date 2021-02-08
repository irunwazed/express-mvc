var jwt = require('jsonwebtoken');

export default  {
    checkUser : (req, res, next) => {
        var a = 2;
        if(a== 1){
            next()
        }else{
            res.redirect('/login');
        }
    }
}