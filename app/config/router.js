import express from 'express';
import userMiddleware from '../middleware/UserMiddleware';
import { check } from 'express-validator';

// setting export all Controller
const route = (_route) => {
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

// Api
router.post("/api/login", [
  check('username').isLength({ min: 5 }),
  check('password').exists(),
], route('api/LoginController@login'))
router.get("/api/cek-login", route('api/LoginController@cekLogin'))
router.use('/api', userMiddleware.checkApi);
router.get("/api/tes", route('api/HomeController@index'))
// . Api


router.get("/", route('AwalController'))
router.get("/login", route('LoginController@index'))
router.post("/login", route('LoginController@setLogin'))
router.get("/logout", route('LoginController@logout'))

router.use('/admin', userMiddleware.checkUser);
router.get("/admin/tes", route('HomeController@index'))
router.get("/admin/data/penduduk", route('PendudukController@index'))
router.get("/admin/data/penduduk/get-data", route('PendudukController@getData'))
router.get("/admin/data/penduduk/get-data/:id", route('PendudukController@getDataById'))
router.post("/admin/data/penduduk/create", route('PendudukController@create'))
router.post("/admin/data/penduduk/update", route('PendudukController@update'))
router.get("/admin/data/penduduk/delete/:id", route('PendudukController@delete'))
// router.get('/admin/:userId', (req, res) => {
//   req.params; // { userId: '42' }
//   res.json(req.params);
// });

router.get("*", route('HomeController@notFound'))
router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server sedang bermasalah');
});

module.exports = router