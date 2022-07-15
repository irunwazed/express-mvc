import DB from '../library/DB';

export default class PendudukController{

	static async index(req, res)  {
		res.render("components/index");
	}
	
	static async getData(req, res)  {

		let data = await DB.table('ref_penduduk').get();
		
		res.send({
			data: data,
			status: true,
		});
	}
	
	static async getDataById(req, res)  {

		let data = await DB.table('ref_penduduk').where('id', req.params.id).get();
		
		res.send({
			data: data[0],
			status: true,
		});
	}
	
	static async create(req, res)  {
		let data = {
			penduduk_nama: req.body.penduduk_nama,
			penduduk_nik: req.body.penduduk_nik,
		};

		let result = await DB.table('ref_penduduk').insert(data);

		res.send({
			pesan: 'Data berhasil diubah',
			status: true,
		});
	}
	
	static async update(req, res)  {
		let data = {
			penduduk_nama: req.body.penduduk_nama,
			penduduk_nik: req.body.penduduk_nik,
		};

		let result = await DB.table('ref_penduduk').where('id', req.body.id).update(data);

		res.send({
			pesan: 'Data berhasil diubah',
			status: true,
		});
	}
	
	static async delete(req, res)  {
		let data = await DB.table('ref_penduduk').where('id', req.params.id).delete();
		res.send({
			pesan: 'Data berhasil terhapus',
			status: true,
		});
	}

}