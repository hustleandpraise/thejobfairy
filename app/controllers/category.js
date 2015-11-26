var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/:category', (req, res, next) => {

    var tags = new models.Category({ title: req.params.category }).fetch({ withRelated: ['tweets'] });

    tags.then((model) => {
        res.render('category/index', { title: req.params.category, tweets: model.relations.tweets.toJSON() });
    }).catch((err) => {
        console.log(err);
    })
   
});

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
