


module.exports = class TableLogin{

  constructor() {
    // up()
  }

  static async up(DB){
    // let data = await DB.setQuery("SELECT * FROM `users` WHERE 1")
    // console.log(data)
    let data = new Promise.resolve("SELECT * FROM `users` WHERE 1")
                          .then(DB.setQuery)
                          .catch(error => {console.log(`Caught: ${error}`); return 3;})
    console.log(data)
  }

  static down(){
    console.log("query")
    
  }
}