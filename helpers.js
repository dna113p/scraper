//URL helpers

module.exports = {
    //url and cookie for new website
    dest: '',
    destCookie: '',

    //Url and cookie for old website
    origin: '',
    originCookie: '',

    //API url for cscart
    api: 'http://localhost/cscart/api/products',
    apiKey: '',
    username: 'user@localhost',

    //Return header data for faked http requests
    header: function (cookie) {
        return {
            'Cookie' : cookie,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.13 Safari/537.36',
        }
    }
}
