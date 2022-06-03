const Database = require('../config/Database');
const util = require('util');

let dataExport = {};
let dataSchema = [];
loadFile();
async function loadFile(){
  var fs = require('fs');
  fs.readdirSync(__dirname + '/').forEach(function(file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      var name = file.replace('.js', '');
			dataExport[name] = require('./' + file);
			let tes =  dataExport[name].up();
      dataSchema.push(tes);
    }
  });
	console.log(dataSchema);
	createTable(dataSchema)
}

// console.log(dataSchema);


async function  createTable(Schema){
	let querySQL = '';

	for(let i = 0; i < Schema.length; i++){
		querySQL += 'CREATE TABLE '+ Schema[i].name+ ' (';
		for(let j = 0; j < Schema[i].column.length; j++){
			querySQL += ' '+ Schema[i].column[j].name + ' ';
			for(let k = 0; k < Schema[i].column[j].type.length; k++){
				querySQL += ' '+ Schema[i].column[j].type[k] + ''; 
			}
			if(j+1 < Schema[i].column.length){
				querySQL += ', '
			}
		}
	}
	querySQL += '); ';
	console.log(querySQL);
	
  const database =  await new Database().setConnection();
	const queryExecute = util.promisify(database.query).bind(database);
	let query = "SELECT * FROM login";
	let data = await queryExecute(querySQL);
}



async function schemaToQuery(){
  const database =  await new Database().setConnection();
	const queryExecute = util.promisify(database.query).bind(database);
	// console.log(database); 


	const timeUpdate = [
		{
			name: 'created_at',
			type: [
				'TIMESTAMP',
				'DEFAULT',
				'CURRENT_TIMESTAMP',
			],
		},
		{
			name: 'updated_at',
			type: [
				'DATETIME',
				'DEFAULT',
				'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
			],
		},
	];

	const Schema = {
		table: [
			{
				name: 'ref_login',
				column: [
					{
						name: 'id',
						type: [
							'INT',
							'AUTO_INCREMENT',
							'PRIMARY KEY'
						],
					},
					{
						name: 'login_username',
						type: [
							'varchar(45)',
						],
					},
					{
						name: 'login_password',
						type: [
							'text',
						],
					},
					timeUpdate[0],
					timeUpdate[1],
				],
			},
		]
	}


	let querySQL = '';

	for(let i = 0; i < Schema.table.length; i++){
		querySQL += 'CREATE TABLE '+ Schema.table[i].name+ ' (';
		for(let j = 0; j < Schema.table[i].column.length; j++){
			querySQL += ' '+ Schema.table[i].column[j].name + ' ';
			for(let k = 0; k < Schema.table[i].column[j].type.length; k++){
				querySQL += ' '+ Schema.table[i].column[j].type[k] + ''; 
			}
			if(j+1 < Schema.table[i].column.length){
				querySQL += ', '
			}
		}
	}
	querySQL += ');';
	console.log(querySQL);
	let query = "SELECT * FROM login";
	let data = await queryExecute(querySQL);
	console.log(data);


	// const data = await database.query("SELECT * FROM login", function (err, result, fields) {
  //   if (err) throw err;
	// 	console.log(result);
	// 	return result;
  // });

  // const DB = database.setConnection();
  // var fs = require('fs');
  // console.log('tes')
  // fs.readdirSync(__dirname + '/').forEach(function(file) {
  //   if (file.match(/\.js$/) !== null && file !== 'index.js') {
  //     var name = file.replace('.js', '');
      
  //     exports[name] = require('./' + file);
  //     exports[name].up(database)
  //   }
  // });
}
