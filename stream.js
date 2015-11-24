
var Twitter     = require('twitter'),
    Models      = require('./app/models/'),
    emojiStrip  = require('emoji-strip');

var client = new Twitter({
    consumer_key:           'nPSOZYBYnh4584d3OOAqE0tep',
    consumer_secret:        'dhgNslRkTY5eM2KgcPpK9llr1lEQpMqkClGYxKhfNOOEXuSXsR',
    access_token_key:       '14499302-4Zes2sJjiIbT4LMXKE8k1bvRHNcRDxpRWtw5hUqy1',
    access_token_secret:    '2ecPRiwHmkdKP3lpVQF2ChkqQtiU3wNkjStlPavFtk6Lt'
});

/*
|--------------------------------------------------------------------------
| Get Models
|--------------------------------------------------------------------------
*/

var getCategories   = new Models.Category().fetchAll(),
    getLocations    = new Models.Location().fetchAll();


/*
|--------------------------------------------------------------------------
| Hashtag Setup
|--------------------------------------------------------------------------
*/

var addHash = function(tag) {
    return new Promise((resolve, reject) => {

        var findTag = new Models.Tag({ title: tag.text.toLowerCase() }).fetch();

        findTag.then((model) => {
            if(model === null) {
                var newtag = new Models.Tag({ title: tag.text.toLowerCase() }).save();
                newtag.then((newtagModel) => {
                    resolve(newtagModel.get('id'));
                }).catch((err) => {
                    reject(err);
                });
            } else {
                resolve(model.get('id'));
            }
        }).catch((err) => {
            reject(err);
        });

    });
}

var setupHashtags = function(hashtags) {
    if(hashtags.length <= 0) return [];
    var arr = [];
    hashtags.forEach((tag) => {
        arr.push(addHash(tag))
    });
    console.log(arr);
    return arr;
}



/*
|--------------------------------------------------------------------------
| Resolve Models to Stream
|--------------------------------------------------------------------------
*/

Promise.all([getCategories, getLocations]).then((models) => {

    var categories  = models[0].models,
        locations   = models[1].models;

    client.stream('statuses/filter', { track: 'lol', language: 'en', }, function(stream) {

        console.log('Stream Running...');

        stream.on('data', (tweet) => {

            var original    = tweet,
                tweet       = tweet.text.toLowerCase();

            /*
            |--------------------------------------------------------------------------
            | Filter our Bullshit
            |--------------------------------------------------------------------------
            */

            if(tweet.includes('rt @'))          return;
            if(tweet.includes('@hireteammate')) return;
            if(tweet.includes('recruiting'))    return;
            if(tweet.includes('recruiter'))     return;


            /*
            |--------------------------------------------------------------------------
            | Grab Locations mentioned in Tweet and Map to ID's
            |--------------------------------------------------------------------------
            */

            var locals = locations.filter((c) => {
                if(tweet.includes(c.get('title').toLowerCase())) return c;
            }).map((item) => {
                return item.get('id');
            });


            /*
            |--------------------------------------------------------------------------
            | Grab Categories from Tweet and Map to ID's
            |--------------------------------------------------------------------------
            */

            var cats = categories.filter((j) => {

                var text = j.get('title').toLowerCase();

                if(tweet.includes(` ${text}, `)) return j;
                if(tweet.includes(` ${text}! `)) return j;
                if(tweet.includes(` ${text}? `)) return j;
                if(tweet.includes(` ${text}. `)) return j;
                if(tweet.includes(` ${text} `)) return j;

            }).map((item) => {
                return item.get('id');
            });


            /*
            |--------------------------------------------------------------------------
            | Save Tweet, Locations, Categories and Tags
            |--------------------------------------------------------------------------
            */

            var saveTweet = new Models.Tweet({ text: emojiStrip(original.text) });

            saveTweet.save().then((model) => {
                
                Promise.all([ 
                    model.locations().attach(locals), 
                    model.categories().attach(cats),
                    model.tags().attach(setupHashtags(original.entities.hashtags))
                ]).then((values) => {

                    console.log('Done!');
    
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });

        });

        stream.on('error', (error) => {
            console.log(error);
        });

    });

});
