var request = require('request-promise')
var cheerio = require('cheerio')
var x = require('./helpers.js')


var getOptions = function (productId) {
    return(
        request({
            method: 'GET',
            uri: x.dest,
            headers: x.header(x.destCookie),
            qs: {
                dispatch: 'products.update',
                product_id: productId
            }
        })
    )
}

var removeOption = function (productId, optionId) {
    return(
        request({
            method: 'POST',
            uri: x.dest,
            headers: x.header(x.destCookie),
            qs: {
                dispatch: 'product_options.delete',
                option_id: optionId,
                product_id: productId
            }
        })
    )
}

var addOption = function (productId, options) {
    return(
        request({
            method: 'POST',
            simple: false,
            uri: x.dest,
            headers: x.header(x.destCookie),
            form: options
        })
    )
}
