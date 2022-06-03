module.exports = class Schema {
	
	constructor(_name){
		this.name = _name;
		this.column = [];
		this.table;

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
	}

	create(_name, table){
		// table.nama;
		console.log('dalam');
		console.log(table);
		console.log('dalam');
		
		return table;
	}


	

	integer(_name, _type = []){
		_type.unshift('INT');
		this.column.push({
			name: _name,
			type: _type
		})
	}


	getResult(){
		return this.table = {
			name: this.name,
			column: [... this.column, ... this.timeUpdate]
		};
	}



}
