var cheerio = require('cheerio')
var fs = require('fs')

var $ = cheerio.load(fs.readFileSync('./resource/product', 'utf-8'))


var css = '#pagination_contents td:nth-child(3) div a'
$(css).each(function(index) {
    console.log($(this).attr('href')+ "     " + index)
})
