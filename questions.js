const psycatgames = require("./api/psycatapi.js");
const truthOrDareGame = require("./api/truthOrDareGameAPI.js");
const utils = require("./utils")
const sites = ["psycat","truthordaregame"];
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.DECRYPT_PASSWORD);
const localQuestions = JSON.parse(cryptr.decrypt(require("./data/localquestions.json")));

module.exports.getQuestion = async function getQuestion(){
    return new Promise(async (resolve)=>{
        var question;
        do {
          await getRemoteQuestion()
          .then((remotequestion) => question = remotequestion)
          .catch(() => question = getLocalQuestion());
        } while (isExplicit(question));
        resolve(question);
    })
};

async function getRemoteQuestion(){
    return new Promise(async (resolve,reject)=>{
        var sito = sites[utils.getRandomIndex(sites)]
        switch (sito){
            case "psycat":
               await psycatgames.getQuestion()
               .then((question) => resolve(question))
               .catch((exception) => reject(exception));
               break;
            case "truthordaregame":
                await truthOrDareGame.getQuestion()        
                .then((question) => resolve(question))
                .catch((exception) => reject(exception));
                break
            default:
                reject("Default branch");    
        }
    })
};

function getLocalQuestion(){
    return localQuestions[utils.getRandomIndex(localQuestions)];
};

function isExplicit(question){
    if (question.includes("sesso")
    ||question.includes("sessuale") 
    ||question.includes("sextoys")) return true;
    return false;
  }