import express from 'express'
import middleware from '../middleware/UserMiddleware'

// setting export all Controller
function route(_route){
  _route = _route.split("@")
  let path = '../controllers/'
  let con = _route[0].split("/")

  if(exports[con[con.length - 1]] == null){
    exports[con[con.length - 1]] = require(path+_route[0])
  }
  return exports[con[con.length - 1]].default[(_route.length==1?'index':_route[1])]
}
// . setting

const router = express.Router()


router.use('/api', middleware.checkApi);
router.get("/api/tes", route('api/HomeController@index'))

router.use('/admin', middleware.checkUser);
router.get("/admin/tes", route('HomeController@index'))
router.post("/admin/tes2", route('HomeController@index'))

router.get("/", route('HomeController'))
router.get("/login", route('LoginController@index'))
router.post("/login", route('LoginController@setLogin'))
router.get("*", route('HomeController@notFound'))


router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server sedang bermasalah');
});

module.exports = router