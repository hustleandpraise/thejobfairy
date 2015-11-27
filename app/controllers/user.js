var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/:user', (req, res, next) => {

    var tags = new models.User({ username: req.params.user }).fetch({ withRelated: ['tweets'] });

    tags.then((model) => {
        res.render('user/index', { user: model.toJSON() });
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
