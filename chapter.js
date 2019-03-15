const program = require('commander')
const config = require('./package')
const superagent = require("superagent")
const cheerio = require("cheerio")

function getName() {
  return new Promise((resolve, reject) => {
    program
        .command('is <name>')
        .alias('sc')
        .description('输入你的章号')
        .action(function (option) {
          resolve(option);
        })
        .version(config.version)
    program.parse(process.argv)
  })
}

async function printLastInfo() {
  let name = await getName();
  const pageUrl = `https://www.kuaiyankanshu.net/6611/read_${name}.html`

  superagent.get(pageUrl)
    .end(function(err,pres){
    var $ = cheerio.load(pres.text);
    var titles = $('#chaptercontent');

    for(var i = 0 ; i < titles.length ; i++){
      var title = titles.eq(i).text();
      console.log(i, title)
    }
  });

}
printLastInfo();