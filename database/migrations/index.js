const Database = require('../config/Database');


async function readAll(){
  const database =  new Database()
  new Promise(database.setConnection());
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

readAll()