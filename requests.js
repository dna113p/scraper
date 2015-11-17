var request = require('request-promise')
var cheerio = require('cheerio')
var x = require('./helpers.js')

module.exports = {

    getOption : function (productId) {
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
    },

    getOldOption : function (id) {
        return(
            request({
                method: 'GET',
                uri: x.origin,
                headers: x.header(x.originCookie),
                qs: {
                    dispatch : 'product_options.update',
                    option_id : id,
                }
            })
        )
    },

    oldOptions : function () {
        return(
            this.getOldSite({dispatch : 'product_options.manage'})
        )
    },

    getOldSite : function (qs) {
        return(
            request({
                method: 'GET',
                uri: x.origin,
                headers: x.header(x.originCookie),
                qs: qs
            })
        )
    },

    getNewSite : function (qs) {
        return(
            request({
                method: 'GET',
                uri: x.dest,
                headers: x.header(x.destCookie),
                qs: qs
            })
        )
    },

    postQS : function (qs) {
        return(
            request({
                method: 'POST',
                uri: x.dest,
                headers: x.header(x.destCookie),
                qs: qs
            })
        )
    },

    postData : function (data) {
        return(
            request({
                method: 'POST',
                simple: false,
                uri: x.dest,
                headers: x.header(x.destCookie),
                form: data
            })
        )
    },

    apiGetCode : function (code ) {
        return (
            request({
                uri: x.api,
                headers: x.header(x.destCookie),
                auth: {
                    username: x.username,
                    password: x.apiKey
                },
                qs: {pcode: code}
            }).then(function(response) {
                var newCode = JSON.parse(response).products[0]
                if (newCode){
                    return newCode.product_id
                }
            })
        )
    },

    deleteOption : function ( optionId, productId ) {
        return(this.postQS({
            dispatch: 'product_options.delete',
            option_id: optionId,
            product_id: productId })
              )
    }


}
