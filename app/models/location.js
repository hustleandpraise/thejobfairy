var services    = require('../services'),
    checkit     = require('checkit'),
    Tweet       = require('./tweet'),
    Slug        = require('slug');


var rules = {
    title: ['required']
}

var Location = services.Bookshelf.Model.extend({
    tableName:  'locations',
    hasTimestamps: ["created_at", "updated_at"],
    initialize: function() {
        this.on('saving', this.setSlug, this);
    },
    setSlug: function(model) {
        return model.set('slug', Slug(model.get('title'), { lower: true }));
    },
    tweets: function() {
        return this.belongsToMany('Tweet');
    }
});

module.exports = services.Bookshelf.model('Location', Location);
