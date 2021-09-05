const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const searchApiUrl = "https://it.wikipedia.org/w/api.php?action=opensearch&format=json&smaxage=0&uselang=it&search=%search%&namespace=0&limit=8&profile=engine_autoselect";


module.exports.getSearchResults = async function getSearchResults(tosearch){
  return new Promise((resolve,reject)=>{
      fetch(searchApiUrl.replace("%search%",tosearch),{
      method: 'GET',
  })
  .then((serverPromise) => serverPromise.json()
    .then((j) => {
        resolve(j[1]);
      })
    .catch((e) => reject(e)))
  })
};

module.exports.getInfo = async function getInfo(pageTitle){
  return new Promise(async (resolve,reject)=>{
    try {
      let info = [];
      let gotinfo = [];
      await fetch(getUrl(pageTitle))
      .then(response => response.text())
      .then(text => {
        const dom = new JSDOM(text);
        const arr = dom.window.document.querySelector("#mw-content-text > div.mw-parser-output").childNodes;
        let parts = [];
        for (let el of arr) {
          if (el.tagName=="P") {
            parts.push(el);
          }
          if (el.className=="toc") break
        }
        parts.forEach(textpart=>gotinfo.push(textpart.textContent));
        info = gotinfo.join("\n");
      })
      info = info.replace(/(\[\d+\])/g,"");
      return resolve(info);
    } catch (e) {
        return reject(e);
    }
  })
};

/*module.exports.getInfo = async function getInfo(pageTitle){
  return new Promise(async (resolve,reject)=>{
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(getUrl(pageTitle));
      let info = await page.evaluate(() => {
          let gotinfo = [];
          let arr = document.querySelector("#mw-content-text > div.mw-parser-output").childNodes;
          let parts = [];
          for (let el of arr) {
            if (el.tagName=="P") {
              parts.push(el);
            }
            if (el.className=="toc") break
          }
          parts.forEach(textpart=>gotinfo.push(textpart.innerText));
          return gotinfo.join("\n");
      })
      browser.close();
      info = info.replace(/(\[\d+\])/g,"");
      return resolve(info);
    } catch (e) {
        return reject(e);
    }
  })
};*/

function getUrl(pageTitle){
  pageTitle = pageTitle.replace(/ /g, '_');
  return "https://it.wikipedia.org/wiki/"+pageTitle ;
}

