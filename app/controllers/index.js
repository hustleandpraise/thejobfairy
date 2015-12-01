
var express = require('express'),
    router  = express.Router(),
    models  = require('../models'),
    _       = require('lodash'),
    Moment  = require('moment'),
    services = require('../services');


var linkify_tweet = function(str) {
    var tweet = str.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,"<a href='$1'>$1</a>");
    tweet = tweet.replace(/(^|\s)@(\w+)/g, "$1<a href=\"http://www.twitter.com/$2\">@$2</a>");
    return tweet.replace(/(^|\s)#(\w+)/g, "$1<a href=\"http://search.twitter.com/search?q=%23$2\">#$2</a>");
};



/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {

    var perPage = 28,
        page = req.query.page > 0 ? req.query.page : 0;

    console.log(req.query)


    var tweets = new models.Tweet().query(function(q) {
        q.orderBy('created_at', 'desc');
        q.limit(perPage);
        return q.offset(perPage * page);
    }).fetchAll({ withRelated: ['user'] });

    var getTags        = new models.Tag().query('orderBy', 'title', 'asc').fetchAll();
    var getCategories  = new models.Category().query('orderBy', 'title', 'asc').fetchAll();
    var getLocations   = new models.Location().query('orderBy', 'title', 'asc').fetchAll();
    var getTweetCount  = new models.Tweet().count();

    

    Promise.all([getTags, getCategories, getLocations, tweets, getTweetCount]).then((models) => {

        var tweets = models[3].toJSON().map((tweet) => {
            return _.assign(tweet, {
                text: linkify_tweet(tweet.text),
                color: services.Str.getColor()
            })
        });

        var tags = models[0].toJSON().map((tag) => {
            return _.assign(tag, {
                color: services.Str.getColor()
            })
        });

        var count = models[4];

        res.render('index', { 
            tags: tags, 
            categories: models[1].toJSON(), 
            locations: models[2].toJSON(), 
            tweets: tweets, 
            moment: Moment,
            count: count,
            page: page,
            pages: count / perPage
        });

    })

});

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
