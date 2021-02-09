import express from 'express'
import middleware from '../middleware/UserMiddleware'

// setting export all Controller
var fs = require('fs');
fs.readdirSync('./app/controllers').forEach(function(file){
    if ( file.indexOf(".js") > -1 && file != "index.js" ) {
        exports[ file.replace('.js','') ] = require('../controllers/'+file);
    }
});
function route(_route){
    _route = _route.split("@")
    return exports[_route[0]].default[(_route.length==1?'index':_route[1])]
}
// . setting

const router = express.Router()

router.use('/admin', middleware.checkUser);
router.get("/admin/tes", route('HomeController@index'))
router.post("/admin/tes2", route('HomeController@index'))

router.get("/", route('HomeController'))
router.get("/login", route('LoginController@index'))
router.post("/login", route('LoginController@set_login'))
router.get("*", route('HomeController@notFound'))


router.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Server sedang bermasalah');
});

module.exports = router