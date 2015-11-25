
var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {
    var tweets = new models.Tweet().query('limit', 10).fetchAll({ withRelated: ['user', 'tags', 'categories', 'locations'] });
    tweets.then((models) => {
        // return res.json(models)
        res.render('index', { tweets: models.toJSON() });
    })
});

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
