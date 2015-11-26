
var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {

    // var tweets = new models.Tweet().query('limit', 10).fetchAll({ withRelated: ['user', 'tags', 'categories', 'locations'] });
    var getTags        = new models.Tag().query('orderBy', 'title', 'asc').fetchAll({ withRelated: ['tweets'] });
    var getCategories  = new models.Category().query('orderBy', 'title', 'asc').fetchAll({ withRelated: ['tweets'] });
    var getLocations   = new models.Location().query('orderBy', 'title', 'asc').fetchAll({ withRelated: ['tweets'] });

    Promise.all([getTags, getCategories, getLocations]).then((models) => {
        // return res.json(models)
        res.render('index', { tags: models[0].toJSON(), categories: models[1].toJSON(), locations: models[2].toJSON() });
    })

});

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
