//import App from '../App';
const axios = require('axios');
var store = require('store');
const Host = 'http://vkback.ru/index.php';
var FetchedUserInfo = null;
function SetFUI(fetchOrig){
  FetchedUserInfo = fetchOrig;
}
function GetInfo(){
  axios.get(Host, {
      params: {
        key: 'sample'
      }
    })
    .then(function (response) {
      console.log(response);
      return(response);
    })
    .catch(function (error) {
      console.log(error);
    })

}

function Query(qry){
  axios.get(Host, {
      params: {
        key: 'sample',
        qry: qry.split(' ').join('+')
      }
    })
    .then(response => {

    return response.data;

  })
    .catch(function (error) {
      console.log('Error from Query: ' + error);

    })
}

function Check(){
  axios.get(Host, {
      params: {
        key: 'sample',
        check: 1
      }
    })
    .then(response => {
document.write('checked');
    return response.data;


  })

}


export { Host, GetInfo, SetFUI, Query, Check };
