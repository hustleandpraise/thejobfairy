var services    = require('../services'),
    checkit     = require('checkit'),
    Tweet       = require('./tweet');


var rules = {
    title: ['required']
}

var Tag = services.Bookshelf.Model.extend({
    tableName:  'tags',
    hasTimestamps: ["created_at", "updated_at"],
    initialize: function() {
    },
    tweets: function() {
        return this.belongsToMany('Tweet');
    }
});

module.exports = services.Bookshelf.model('Tag', Tag);
