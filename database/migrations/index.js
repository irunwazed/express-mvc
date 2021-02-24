const Database = require('../config/Database');
const DB = new Database()
DB.setConnection().then(()=>{

}, ()=>{
  
})
var fs = require('fs');

fs.readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    
    exports[name] = require('./' + file);
    exports[name].up(DB)
  }
});
