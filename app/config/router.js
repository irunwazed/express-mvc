import express from 'express'
import middleware from '../middleware/UserMiddleware'
const { check } = require('express-validator');

// setting export all Controller
function route(_route){
  _route = _route.split("@")
  let path = '../controllers/'
  let name = _route[0].split("/").join("_")
  if(exports[name] == null){
    exports[name] = require(path+_route[0])
  }
  return exports[name].default[(_route.length==1?'index':_route[1])]
}
// . setting


const router = express.Router()

router.use('/api', middleware.checkApi);
router.get("/api/tes", route('api/HomeController@index'))
router.post("/api/login", [
  check('username').isLength({ min: 5 }),
  check('password').exists(),
], route('api/LoginController@login'))

router.use('/admin', middleware.checkUser);
router.get("/admin/tes", route('HomeController@index'))

router.get("/", route('HomeController'))
router.get("/login", route('LoginController@index'))
router.post("/login", route('LoginController@setLogin'))
router.get("*", route('HomeController@notFound'))

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server sedang bermasalah');
});

module.exports = router