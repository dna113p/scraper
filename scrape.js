var cheerio = require('cheerio')
var Promise = require('bluebird')
var fs = require('fs')

var request = require('./requests.js')
var parse = require('./parse.js')
//create product file with buildProductList.js
var products = require('./products.js')


// Return Promise of http requests
// transfers global options to new site
var transferGlobals = function() { 
    request.oldOptions().then(function (response) {
        var arr = parse.optionIds(response)
        console.log(arr.length + ' ids found')
        var promises = []
        arr.forEach(function(val) {
            promises.push(request.getOldOption(val).then(function(response) {
                var option = parse.createGlobal(parse.optionData(response))
                return(request.postData(option))
            }))
        })
        Promise.all(promises)

    })
}


// Return Promise of http requests
// to delete all corrupt options
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

// Return Promise of http requests
// to add all new options to a product
var addOptions = function (id, options) {
    var promises = []
    options.forEach(function(option) {
        var newOption = parse.createOption(option,id)
        promises.push(request.postData(newOption).then(function(){
        }))
    })
    return Promise.all(promises)
}


// Return Promise of http requests
// to add all global options to a product
var addGlobalOptions = function (id, globals) {
    var promises = []
    globals.forEach(function(option) {
        var gid = parse.globalName(option.name);
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

// Transferring each product requires 4 core parts
// Find link from old product to new product
// Delete corrupt options
// Copy over global options
// Copy over regular options
var processProduct = function (product) {
    // Link product code from old site to new product id
    return(request.apiGetCode(product.code).then(function (productId) {
        // Delete corrupt options
        deleteBadOptions(productId).then(function() {
            // Add Relevent Global Options
            addGlobalOptions(productId, product.globalOptions).then(function() {
                // Add correct item options
                addOptions(productId, product.options)
            })
        })
    }))

}

// Call this function to begin looping through products
var main = function (key){
    console.log('Working on product' +key)
    if (products[key]) {
        processProduct(products[key]).then(function(){
            return main(key+1)
        })
    }
}

