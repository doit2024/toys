const superagent = require("superagent")
const cheerio = require("cheerio")

const pageUrl = `https://kjh.55128.cn/ssq-history-120.htm`

superagent
  .get(pageUrl)
  .end(function(err,pres){
    const $ = cheerio.load(pres.text);
    const boxes = $('.ballbox');
    const data = [].slice.call(boxes).map((v, i) => boxes.eq(i).text()).map(v => {
      return v.split(/[^\d]+/).filter(v => v).map(v => v * 1)
    })
    console.log(data)
    // for(let i = 0 ; i < boxes.length ; i++){
    //   let nums = boxes.eq(i).text();
    //   console.log(nums.split(/[^\d]+/).filter(v => v).map(v => v * 1))
    // }
  });
