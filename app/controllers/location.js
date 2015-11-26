var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/:location', (req, res, next) => {

    var locations = new models.Location({ title: req.params.location }).fetch({ withRelated: ['tweets'] });

    locations.then((model) => {
        res.render('location/index', { title: req.params.location, tweets: model.relations.tweets.toJSON() });
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
