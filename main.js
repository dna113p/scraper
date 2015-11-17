var cheerio = require('cheerio')
var request = require('./requests.js')
var parse = require('./parse.js')
var Promise = require('bluebird')
var fs = require('fs')

var globalName = function (name) {
    var globals = require('./globals.js')
    return(globals[' '+name])
}

// Returns a new option Object for submission with a form
var createOption = function (optionsObj, productId) {
    optionsObj["option_id"]                       = '0'
    optionsObj["option_data[product_id]"]         = productId
    optionsObj["object"]                          = 'product'
    optionsObj["option_data[company_id]"]        = 1
    optionsObj["dispatch[product_options.update]"] = 'Create'
    delete optionsObj["product_id"]

    return optionsObj
}

// Returns a new option Object for submission with a form
var createGlobal = function (optionsObj, productId) {
    optionsObj["option_id"]                        = '0'
    optionsObj["object"]                           = 'global'
    optionsObj["option_data[company_id]"]          = 1
    optionsObj["dispatch[product_options.update]"] = 'Create'

    return optionsObj
}


var deleteBadOptions = function (id) {
    qs = {dispatch: 'products.update', product_id: id}
    return(request.getNewSite(qs).then(function(response){
        var promises= []
        var ids = parse.optionIds(response)
        ids.forEach(function (optionId) {
            promises.push(request.deleteOption(optionId, id))
        })
        return( Promise.all(promises))
    }))
}

var addOptions = function (id, options) {
    var promises = []
    options.forEach(function(option) {
        var newOption = createOption(option,id)
        promises.push(request.postData(newOption).then(function(){
        }))
    })
    return Promise.all(promises)
}

var addGlobalOptions = function (id, globals) {
    var promises = []
    globals.forEach(function(option) {
        var gid = globalName(option.name);
        var data = {
            'product_id':id,
            'selected_section':'options',
            'global_option[id]':gid,
            'global_option[link]':'N',
            'global_option[link]':'Y',
            'dispatch[products.apply_global_option]':'Apply'
        }
        promises.push(request.postData(data))
    })
    return Promise.all(promises)
}


var processProduct = function (product) {
    return(request.apiGetCode(product.code).then(function (productId) {
        deleteBadOptions(productId).then(function() {
            addGlobalOptions(productId, product.globalOptions).then(function() {
                addOptions(productId, product.options)
            })
        })
    }))

}

var products = require('./products.js')
var main = function (key){
    console.log('Working on product' +key)
    if (products[key]) {
        processProduct(products[key]).then(function(){
            return main(key+1)
        })
    }
}
main(600)

var transferGlobals = function() {

    request.oldOptions().then(function (response) {
        var arr = parse.optionIds(response)
        console.log(arr.length + ' ids found')
        var promises = []
        arr.forEach(function(val) {
            promises.push(request.getOldOption(val).then(function(response) {
                var option = createGlobal(parse.optionData(response))
                return(request.postData(option))
            }))
        })
        Promise.all(promises)
    })
}
