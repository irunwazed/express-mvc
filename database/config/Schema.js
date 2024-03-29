import Model from '../../app/core/Model';

export default class Schema {
	
	constructor(){
		this.DB = new Model();
		this.SQL = '';
	}

	create(_name, _callBack){
		let table = new Table(_name);
		_callBack(table)
		this.createTable(table.getResult());
	}

	async createTable(Schema){
		// this.DB = new Model();
		let querySQL = '';
	
		querySQL += 'CREATE TABLE '+ Schema.name+ ' (';
		for(let j = 0; j < Schema.column.length; j++){
			querySQL += ' '+ Schema.column[j].name + ' ';
			for(let k = 0; k < Schema.column[j].type.length; k++){
				querySQL += ' '+ Schema.column[j].type[k] + ''; 
			}
			if(j+1 < Schema.column.length){
				querySQL += ', '
			}
		}
		querySQL += '); ';
		try {
			var data = await this.DB.query(querySQL);
			console.log(Schema.name+' berhasil terbuat!');
		}
		catch(err) {
			console.log(err);
		}

	}
	
}

class Table {

	constructor(_name){
		this.name = _name;
		this.column = [];
		
		this.timeUpdate = [
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

		return this;
	}

	double(_name, from, to){
		this.column.push({
			name: _name,
			type: [
				'DOUBLE('+from+','+to+')'
			],
		})
		return this;
	}

	bigInteger(_name){
		this.column.push({
			name: _name,
			type: [
				'BIGINT(8)'
			],
		})
		return this;
	}

	integer(_name){
		this.column.push({
			name: _name,
			type: [
				'INT'
			],
		})
		return this;
	}

	tinyInteger(_name){
		this.column.push({
			name: _name,
			type: [
				'TINYINT',
			],
		})
		return this;
	}

	string(_name, bts = 225){
		this.column.push({
			name: _name,
			type: [
				'varchar('+bts+')',
			],
		})
		return this;
	}

	text(_name){
		this.column.push({
			name: _name,
			type: [
				'TEXT',
			],
		})
		return this;
	}

	id(_name){
		this.column.push({
			name: _name,
			type: [
				'BIGINT(8)',
				'AUTO_INCREMENT',
				'PRIMARY KEY',
			],
		});
		return this;
	}

	dateTime(){
		this.column.push({
			name: _name,
			type: [
				'DATETIME',
			],
		})
		return this;
	}


	timestamps(){
		this.column = [... this.column, ... this.timeUpdate];
		return this;
	}


  nullable(){
    this.column[this.column.length-1].type.push('NULL');
    return this;
  }

	foreign(_name){
		this.column.push({
			name: 'CONSTRAINT foreign_'+_name+' FOREIGN KEY ('+_name+')',
			type: [
				'',
			],
		})
		return this;
	}

	references(_table, _name){
    this.column[this.column.length-1].type.push('REFERENCES '+_table+'('+_name+')');
    return this;
	}

	onDelete(_type = 'CASCADE'){
		this.column[this.column.length-1].type.push('ON DELETE '+_type);
    return this;
	}

	onDelete(_type = 'CASCADE'){
		this.column[this.column.length-1].type.push('ON DELETE '+_type);
    return this;
	}

	onUpdate(_type = 'CASCADE'){
		this.column[this.column.length-1].type.push('ON UPDATE '+_type);
    return this;
	}

	getResult(){
		return {
			name: this.name,
			column: this.column,
		}
	}

}
