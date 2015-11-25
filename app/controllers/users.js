
var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/:username', (req, res, next) => {
    var user = new models.User({ username: req.params.username }).fetch({ withRelated: ['tweets'] });

    user.then((model) => {
        res.render('user/index', { user: model.toJSON(), tweets: model.relations.tweets.toJSON() });
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
