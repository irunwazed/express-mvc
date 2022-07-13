import util from "util";
import config from "../config/config";
// import Database from '../config/database';

export default class Model {
  async query(_query) {
    // always load
    // const DB = await new Database().setConnection();
    // const queryExecute = util.promisify(DB.query).bind(DB);

    // sekali load
    const queryExecute = util.promisify(config.DB.query).bind(config.DB);

    var data = [];
    try {
      data = await queryExecute(_query);
    } catch (e) {
      console.log(e.sqlMessage);
    }
    return data;
  }

  async insert(table, data) {
    const queryExecute = util.promisify(config.DB.query).bind(config.DB);
    let column = "";
    let valueText = "";
    let value = [];
    Object.keys(data).forEach((element) => {
      column += " " + element + ",";
      valueText += "? ,";
      value.push(data[element]);
    });
    column = column.slice(0, -1);
    valueText = valueText.slice(0, -1);

    let query = `INSERT INTO ${table} 
		(${column} ) 
		VALUES 
		(  ${valueText} );`;
    try {
      data = await queryExecute(query, value);
    } catch (e) {
      console.log(e.sqlMessage);
    }
    return data;
  }

  // async insert(table, _data) {

  //   try {
  // 		let query = "INSERT INTO " + table + " ( ";
  // 		let name = [];
  // 		let data = [];
  // 		for (let i = 0; i < Object.keys(_data).length; i++) {
  // 			name.push(Object.keys(_data)[i]);
  // 			data.push(_data[Object.keys(_data)[i]]);

  // 			query += Object.keys(_data)[i];
  // 			if (i + 1 < Object.keys(_data).length) {
  // 				query += ", ";
  // 			}
  // 		}
  // 		query += " ) VALUES ( ";

  // 		for (let i = 0; i < Object.keys(_data).length; i++) {
  // 			name.push(Object.keys(_data)[i]);
  // 			data.push(_data[Object.keys(_data)[i]]);

  // 			query += ' \''+_data[Object.keys(_data)[i]]+'\' ';
  // 			if (i + 1 < Object.keys(_data).length) {
  // 				query += ", ";
  // 			}
  // 		}
  // 		query += " );";

  // 		const queryExecute = util.promisify(config.DB.query).bind(config.DB);
  // 		console.log(query);
  //     // let result = await queryExecute(query);
  // 		this.query(query);
  //   } catch (e) {
  //     console.log(e.sqlMessage);
  //   }
  // }
}

class Table {}
