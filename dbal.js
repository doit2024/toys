const superagent = require("superagent")
const cheerio = require("cheerio")

const pageUrl = `https://kjh.55128.cn/ssq-history-120.htm`

superagent
  .get(pageUrl)
  .end(function(err,pres){
    var $ = cheerio.load(pres.text);
    var boxes = $('.ballbox');

    for(var i = 0 ; i < boxes.length ; i++){
      var nums = boxes.eq(i).text();
      console.log(nums.split(/[^\d]+/).filter(v => v).map(v => v * 1))
    }
  });
