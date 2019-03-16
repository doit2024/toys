const superagent = require("superagent")

const pageUrl = `https://kjh.55128.cn/ssq-history-120.htm`

superagent
  .get(pageUrl)
  .end(function(err,pres){
    console.log(err, pres)
  });
  