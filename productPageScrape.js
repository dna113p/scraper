var cheerio = require('cheerio')
var fs = require('fs')

var $ = cheerio.load(fs.readFileSync('./product', 'utf-8'))

$('tr a').each(function(val) {
    console.log($(this).attr('href'))
})
