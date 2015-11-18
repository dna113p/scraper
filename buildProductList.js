var buildProducts = function () {
    var products = require('./resource/products.js')
    var main = function (key) {
        if (products[key]){

            //Request product page
            var qs = {dispatch: 'products.update', product_id: products[key].oldId}
            request.getOldSite(qs).then(function(response) {

                //Parse global options from page
                products[key].globalOptions =  parse.globals(response)
                var gids = []
                products[key].globalOptions.forEach(function(obj){
                    gids.push(obj['id'])
                })

                //Get local option IDs
                products[key].options = []
                var arr = parse.optionIds(response)
                var ids = arr.filter( function( id ) {
                    return gids.indexOf( id ) < 0
                } )


                //Request and parse option data
                var promises = []
                ids.forEach(function (id) {
                    promises.push(request.getOldOption(id).then(function(response) {
                        //Push option data into current product
                        products[key].options.push(parse.optionData(response))
                        console.log('Option ID: ' + id)
                    }))
                })
                Promise.all(promises).then(function() {
                    fs.appendFile('./products.txt', JSON.stringify(products[key]) + ",\n")
                    console.log('Finished product --------- ' + products[key].oldId)
                    return main(key+1)
                })
            })

        }
    }
}
