var cheerio = require('cheerio')
var fs = require('fs')

var html = fs.readFileSync('./resource/output.html', 'utf8')


var optionData = function (html) {
    var $ = cheerio.load(html)
    var obj = {}
    $('form[name="option_form_1595"] input').each(function() {
        obj[$(this).attr('name')] = $(this).attr('value')
    })
    return obj
}

var createOption = function (optionsObj, productId) {
    optionsObj['option_id']                       = '0'
    optionsObj['object']                          = 'product'
    optionsObj['product_id']                      = productId
    optionsObj['dispatch[product_options.update'] = 'Create'
    return optionsObj
}

console.log(
    createOption( optionData(html), 623)
)
