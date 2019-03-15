const program = require('commander')
const config = require('./package')
const superagent = require("superagent")
const cheerio = require("cheerio")

function getName() {
  return new Promise((resolve, reject) => {
    program
        .command('is <name>')
        .alias('sc')
        .description('输入你的书名')
        .action(function (option) {
          resolve(option);
        })
        .version(config.version)
    program.parse(process.argv)
  })
}

async function printLastInfo() {
  let name = await getName();
  const pageUrl = `https://www.kuaiyankanshu.net/search/result.html?searchkey=${encodeURIComponent(name)}`

  superagent.get(pageUrl)
    .end(function(err,pres){
    var $ = cheerio.load(pres.text);
    var curPageUrls = $('p.info .novelname');
    var curPageAuthors = $('p.info > span:nth-child(2) > a');

    for(var i = 0 ; i < curPageUrls.length ; i++){
      var url = curPageUrls.eq(i).attr('href');
      var name = curPageUrls.eq(i).text();
      const author = curPageAuthors.eq(i).text()
      console.log(url.replace(/[\/]/g, ''), name, author)
    }
  });

}
printLastInfo();