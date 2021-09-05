const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.getQuestions = async function getQuestions () {
    return new Promise(async (resolve, reject) => {
        try {
            let domande = [];
            await fetch("https://questooquello.it/")
            .then(response => response.text())
            .then(text => {
              const dom = new JSDOM(text);
              const document = dom.window.document;
              domande.push(document.querySelector(".question1-container").querySelector(".question-text").textContent);
              domande.push(document.querySelector(".question2-container").querySelector(".question-text").textContent);
            });
            return resolve(domande);
        } catch (e) {
            return reject(e);
        }
    })
}