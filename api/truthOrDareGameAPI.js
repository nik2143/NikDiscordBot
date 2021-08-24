const fetch = require('node-fetch');
const utils = require('./../utils');
const apiUrl = "https://truthordare-game.com/api/truth/";
const idDomanda = [32,33,34]
var exclude = 0;

module.exports.getQuestion =  async function getQuestion(){
    return new Promise((resolve,reject)=>{
        fetch(apiUrl+idDomanda[utils.getRandomIndex(idDomanda)]+"?exclude="+exclude,{
        method: 'GET',
    })
    .then((serverPromise) => serverPromise.json()
      .then((j) => {
          exclude = j.id;
          resolve(j.text);
        })
      .catch((e) => reject(e)))
    })
}