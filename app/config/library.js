// export default {
//   getTokenFromCookie :  (cookie, name) => {
//     console.log('terss')
//     var token = cookie;
//     token = token.split('; ')
//     var hasil = '';
//     for(let i = 0; i < token.length; i++){
//       let _token = token[i].split("=");
//       if(_token[0] == name){
//         hasil = _token[1];
//       }
//     }
//     return hasil;
//   },
// }

function getTokenFromCookie(cookie, name){
  var token = cookie;
  token = token.split('; ')
  var hasil = '';
  for(let i = 0; i < token.length; i++){
    let _token = token[i].split("=");
    if(_token[0] == name){
      hasil = _token[1];
    }
  }
  return hasil;
}


export {getTokenFromCookie};