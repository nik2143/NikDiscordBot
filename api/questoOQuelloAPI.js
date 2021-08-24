const puppeteer = require('puppeteer');

module.exports.getQuestions = async function getQuestions () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://questooquello.it/");
            let dom = await page.evaluate(() => {
                let domande = [];
                domande.push(document.querySelector(".question1-container").querySelector(".question-text").innerText),
                domande.push(document.querySelector(".question2-container").querySelector(".question-text").innerText);
                return domande;
            })
            browser.close();
            return resolve(dom);
        } catch (e) {
            return reject(e);
        }
    })
}