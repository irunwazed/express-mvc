import Model from "../core/Model";

class DB {
  constructor(){
    this.reset();
    return this;
  }

  reset(){
    
    this.query = '';
    this.qTable = '';
    this.qSelect = '*';
    this.qWhere = '';
    this.qJoin = '';
  }

  select(_select){
    this.qSelect = _select;
    return this;
  }

  table(_name){
    this.qTable = _name;
    return this;
  }

  where(_val1, _val2){
    let where = 'WHERE';
    if(this.qWhere != ''){
      where = ' AND'
    }
    this.qWhere += where+" "+_val1+" = "+_val2;
    return this;
  }

  whereRaw(_raw){
    this.qWhere += _raw;
    return this;
  }

  join(_table, _val1, _opr = '=', _val2){
    this.qJoin += ' JOIN '+_table+' ON '+_val1+' '+_opr+' '+_val2;
    return this;
  }

  leftJoin(_table, _val1, _opr = '=', _val2){

    if(typeof _val1 == "string"){
      this.qJoin += ' LEFT JOIN '+_table+' ON '+_val1+' '+_opr+' '+_val2;
    }else if(typeof _val1 == "function"){
      this.qJoin += ' LEFT JOIN '+_table;
      let aa = new Tambahan();
      _val1(aa);
      this.qJoin += aa.getResult();
    }

    return this;
  }


  async get(_table = null){
    let query = `
    SELECT ${this.qSelect}
    FROM ${this.qTable}

    ${this.qJoin}

    ${this.qWhere}
    `;
    
    
    this.reset();

    let model = new Model();
    return await model.query(query);
  }

  getSQL(){
    let query = `
    SELECT ${this.qSelect}
    FROM ${this.qTable}

    ${this.qJoin}

    ${this.qWhere}
    `;
    return query;
  }


}

class Tambahan{

  constructor(){

    this.qWhere = '';

    return this;
  }

  on(_val1, _opr = '=', _val2){
    let where = ' ON';
    if(this.qWhere != ''){
      where = ' AND'
    }
    this.qWhere += where+" "+_val1+" = "+_val2;
    return this;
  }

  getResult(){
    return this.qWhere;
  }
}


export default new DB();