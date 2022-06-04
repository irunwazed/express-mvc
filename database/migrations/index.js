import Database from '../config/Database';
import fs from 'fs';
import util from 'util';
import Model from '../../app/core/Model';


/////////// versi baru


class Migration {

	constructor(){
	}


	async truncate(){
		// const DB = new Model();
		let query = 'DROP DATABASE '+process.env.MYSQL_DATABASE;
		const database =  await new Database().setConnection();
		const queryExecute = util.promisify(database.query).bind(database);
		var data = await queryExecute(query);
		let query2 = 'CREATE DATABASE '+process.env.MYSQL_DATABASE;
		data = await queryExecute(query2);
		
	}

	async loadFile(){
		const dataExports = {};
		let no = 0;
		await fs.readdirSync(__dirname + '/').forEach( async function(file) {
			no++;
			if (file.match(/\.js$/) !== null && file !== 'index.js') {
				try {
					
					var name = file.replace('.js', '');
					dataExports[name] = require('./' + file);
					await dataExports[name].up();
				}
				catch(err) {
					console.log(err);
				}
				if(no == fs.readdirSync(__dirname + '/').length){
					console.log('selesai');
					process.exit();
				}
			}
		});
	}

	async run(){
		await this.truncate();
		await this.loadFile();
		
	}

}
start()
async function start(){
	const migration = new Migration();
	await migration.run();
}

/////////// . versi baru









/////////// versi awal

// jalan();

let dataExport = {};

async function jalan(){
	await truncate2();
	await loadFile2();
}
async function loadFile2(){
	let no = 0;
  fs.readdirSync(__dirname + '/').forEach( async function(file) {
		no++;
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
			try {
				
				var name = file.replace('.js', '');
				dataExport[name] = require('./' + file);
				await dataExport[name].up();

			
			}
			catch(err) {
				console.log(err);
			}
			if(no == fs.readdirSync(__dirname + '/').length){
				console.log('selesai');
				process.exit();
			}
    }
  });
	

}

async function truncate2(){
	let query = 'DROP DATABASE '+process.env.MYSQL_DATABASE;
	const database =  await new Database().setConnection();
	const queryExecute = util.promisify(database.query).bind(database);
	let data = await queryExecute(query);

	query = 'CREATE DATABASE '+process.env.MYSQL_DATABASE;
	data = await queryExecute(query);
}

/////////// .  versi awal