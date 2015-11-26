var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/:tag', (req, res, next) => {

    var tags = new models.Tag({ title: req.params.tag }).fetch({ withRelated: ['tweets'] });

    tags.then((model) => {
        res.render('tag/index', { title: req.params.tag, tweets: model.relations.tweets.toJSON() });
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
