module.exports = class Schema {
	
	create(_name, _callBack){
		return _callBack(new Table(_name));
	}

}

class Table {

	constructor(_name){
		this.table = _name;
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
	}

	integer(_name, _type = []){
		_type.unshift('INT');
		this.column.push({
			name: _name,
			type: _type,
		})
	}

	id(_name){
		this.column.push({
			name: _name,
			type: [
				'INT',
				'AUTO_INCREMENT',
				'PRIMARY KEY',
			],
		})
	}

	getResult(){
		return {
			name: this.table,
			column: [... this.column, ... this.timeUpdate],
		}
	}

}
