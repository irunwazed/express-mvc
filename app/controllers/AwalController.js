import DB from '../library/DB'

export default class AwalController{

	static async index(req, res) {

		let data = await DB.table('ref_penduduk')
												.select('ref_penduduk.*, ref_login.id as login_id')
												// .leftJoin('ref_penduduk_user', 'ref_penduduk_user.penduduk_id', '=', 'ref_penduduk.id')
												.leftJoin('ref_penduduk_user', (join) => {
													join.on('ref_penduduk_user.penduduk_id', '=', 'ref_penduduk.id');
												})
												.leftJoin('ref_login', (join) => {
													join.on('ref_login.id', '=', 'ref_penduduk_user.user_id');
												})
												.where('ref_penduduk.id', 1)
												// .where('ref_penduduk.penduduk_nama', 'aka')
												.get();


		console.log(data);

		res.render("pages/awal");
	}


}