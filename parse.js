var serialize = require('form-serialize')
var domify = require('domify')
var jsdom = require('jsdom').jsdom()
var cheerio = require('cheerio')
var flatten = require('flat')

module.exports = {
    // Parse out all Option Ids html
    optionIds : function (html) {
        var matches = html.match(/(option_id=)(\d+)/g)
        if (matches == null) return []
            var ids = matches.map(function (string, index) {
                return (string.split('=')[1])
            })
            .filter(function (string, index) {
                return (index%2 == 0)
            })
            return ids
    },

    globalOptions : function (html) {
        var $ = cheerio.load(html)
        var options = {}
        $('tr a.row-status').each(function() {
            options[$(this).text()] =
                $(this).parent().parent().parent().attr('data-ct-product_options')
        })
        return options
    },

    globals : function (html) {
        var $ = cheerio.load(html)
        var ids = []
        $('#product_options_list span').each(function () {
            if ($(this).text() == '(Global)'){
                var obj = {}
                var href = $(this).parent().siblings().find('a').attr('href')
                obj.id = href.split('&')[1].split('=')[1]
                obj.name = $(this).siblings().find('a').text()
                ids.push(obj)
            }
        })
        return ids
    },

    products : function (html) {
        var products = []
        var $ = cheerio.load(html)

        $("input[name$='[product_code]']").each(function () {
            var product = {}
            product.oldId = ($(this).attr('name').split(/(\[|\])+/))[2]
            product.code = ($(this).val())

            products.push(product)
        })

        return products
    },

    // Parse out option data from html
    optionData : function (html) {
        var document = domify(html, jsdom.defaultView.document);
        var form = document.querySelector('#main_column form')
        var obj = serialize(form, { hash: true });

        return flatten(obj)
    }

}
