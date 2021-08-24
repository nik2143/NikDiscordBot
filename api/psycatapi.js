const fetch = require('node-fetch');
const utils = require('./../utils');
var question_cache = [];
var questionType = ['party','classic','kids']

module.exports.getQuestion =  async function getQuestion(){
    return new Promise((resolve,reject)=> {
        if (question_cache.length == 0)
        {
              updateQuestions().then(fine=>{
                var domanda = question_cache[0];
                question_cache.splice(0,1)
                resolve(domanda);
            }).catch(errore=>{
                reject(errore);
            })
        } else {
            var domanda = question_cache[0];
             question_cache.splice(0,1)
            resolve(domanda);
        }
    })
}

async function updateQuestions(){
    return new Promise((resolve,reject)=>{
        fetch("https://psycatgames.com/api/tod-v2/",{
        method: 'POST',
        headers: {
            "referer": "https://psycatgames.com/it/app/truth-or-dare/",
            "Content-Type":"application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            'id': 'truth-or-dare',
            'language': 'it',
            'category': 'party',
            'type': 'truth'
          })
    })
    .then((serverPromise) => serverPromise.json()
      .then((j) => {
          question_cache = [...j.results]
          resolve("finished");
        })
      .catch((e) => reject(e)))
    })
}