var services    = require('../services'),
    checkit     = require('checkit'),
    User        = require('./user'),
    Location    = require('./location'),
    Category    = require('./category'),
    Tag         = require('./tag'),
    User        = require('./user');


var rules = {
    text: ['required']
}

var Tweet = services.Bookshelf.Model.extend({
    tableName:  'tweets',
    hasTimestamps: ["created_at", "updated_at"],
    initialize: function() {
    },
    locations: function() {
        return this.belongsToMany(Location);
    },
    categories: function() {
        return this.belongsToMany(Category);
    },
    tags: function() {
        return this.belongsToMany(Tag);
    },
    user: function() {
        return this.belongsTo(User);
    }
});

module.exports = Tweet;
