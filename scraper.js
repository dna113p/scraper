var client = require('request-promise')
var product = require('./payload.js')
var cheerio = require('cheerio')

var cookies = {
    'sid_customer_b6dab': '560e6b8f0ba0832128b2880d81da754e_1_C',
    'sid_admin_b6dab': 'e3146243f1bd9194efdd6745af4f8f43_0_A',
    '_ga': 'GA1.1.656842484.1437094543'
}


var cookie = 'sid_customer_b6dab=560e6b8f0ba0832128b2880d81da754e_1_C; sid_admin_b6dab=e3146243f1bd9194efdd6745af4f8f43_0_A; _ga=GA1.1.656842484.1437094543'
var livecookie = 'sid_admin=ip9ib221nqqeqc55bm7dcce1n7; quick_menu_offset=left%3A%20665px%3B%20top%3A103px%3B; __utma=249861916.748258049.1443726287.1443726287.1443726287.1; __utmz=249861916.1443726287.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ajs_anonymous_id=%2243da17e0-8728-4afe-9db4-22f9e6d40f20%22; _cb_ls=1; ajs_user_id=null; ajs_group_id=null; _ga=GA1.2.748258049.1443726287; _chartbeat2=5RFWEDfZTaBLpIdK.1444019918188.1444020074704.1; olfsk=olfsk8204470637720078; hblid=Z8GxZJ98RIXqgNAz6T6pC83pDW0OEQJO; _ga=GA1.3.748258049.1443726287; _hp2_id.1532377119=0031607811000109.1521087985.3388090712; __unam=2c7a46c-15024cb6392-63fa80b0-13'


var liveUrl = 'https://kenwoodusa.dealerarena.com/shop/admin-kwmstore.php'
var liveOptions = '?dispatch=product_options.update&option_id=1595&product_id=30465&result_ids=content_group_product_option_1595&skip_result_ids_check=true'


var url = "http://localhost/cscart/admin.php"
//var product = "?dispatch=products.update&product_id=623"
var querystring = {"dispatch":"product_options.delete","option_id":"1088","product_id":"623"}
var urlproduct = 'http://localhost/cscart/admin.php?dispatch=products.update&product_id=623'

var header = {
    'Cookie' : livecookie,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.13 Safari/537.36',
}

var options = {
    method: 'GET',
    uri: liveUrl+'?dispatch=products.manage',
    headers: header
    //form: product
};

getOptionData = function(optionId) {
}

client(options)
.then(function(result){
        console.log(result)
    
}, function(error){
    console.log(error);
});
