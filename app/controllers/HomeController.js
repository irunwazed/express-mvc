// import Database from '../config/database';

// const db = Database.getConnection()


export default class HomeController{

	static async index(req, res)  {
		var data;
		data = await req.app.get('config').DB.query("SELECT * FROM ref_penduduk", function (err, result, fields) {
			if (err) throw err;
			data = result
			// console.log(result);
		  })
		  console.log(data)
		res.render("components/index");
	}

	static notFound(req, res) {
		res.render("pages/not-found");
	}
}