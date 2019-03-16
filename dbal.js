const superagent = require("superagent")
const cheerio = require("cheerio")

const pageUrl = `https://kjh.55128.cn/ssq-history-120.htm`

superagent
  .get(pageUrl)
  .end(function(err,pres){
    const $ = cheerio.load(pres.text);
    const boxes = $('.ballbox');
    const data = [].slice.call(boxes).map((v, i) => boxes.eq(i).text()).map(v => v.split(/[^\d]+/).filter(v => v).map(v => v * 1))
    const rst = data.reduce((p, xs) => (xs.forEach((x, i) => p[i] ? (p[i].push(x)) : (p[i] = [])), p), [])
    console.log(rst)
  });
