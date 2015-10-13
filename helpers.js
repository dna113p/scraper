module.exports = {
    dest: 'http://localhost/cscart/admin.php',
    destCookie: 'sid_customer_b6dab=560e6b8f0ba0832128b2880d81da754e_1_C; sid_admin_b6dab=c50a6211e087e814bb85ea3bbf9af93e_0_A; _ga=GA1.1.656842484.1437094543',

    origin: 'https://kenwoodusa.dealerarena.com/shop/admin-kwmstore.php',
    originCookie: 'sid_admin=ip9ib221nqqeqc55bm7dcce1n7; quick_menu_offset=left%3A%20665px%3B%20top%3A103px%3B; __utma=249861916.748258049.1443726287.1443726287.1443726287.1; __utmz=249861916.1443726287.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ajs_anonymous_id=%2243da17e0-8728-4afe-9db4-22f9e6d40f20%22; _cb_ls=1; ajs_user_id=null; ajs_group_id=null; _ga=GA1.2.748258049.1443726287; _chartbeat2=5RFWEDfZTaBLpIdK.1444019918188.1444020074704.1; olfsk=olfsk8204470637720078; hblid=Z8GxZJ98RIXqgNAz6T6pC83pDW0OEQJO; _ga=GA1.3.748258049.1443726287; _hp2_id.1532377119=0031607811000109.1521087985.3388090712; __unam=2c7a46c-15024cb6392-63fa80b0-13',

    header: function (cookie) {
        return {
            'Cookie' : cookie,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.13 Safari/537.36',
        }
    },

    dispatch: {
        product: function (productId) {
            return 'products.update&product_id=' + productId
        },
        deleteProductOption(productId, optionId) {
            return 'product_options.delete&option_id=' + optionId + '&product_id=' + productId
        }
    },
}
