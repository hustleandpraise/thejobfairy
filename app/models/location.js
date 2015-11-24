var services    = require('../services'),
    checkit     = require('checkit'),
    Tweet       = require('./tweet');


var rules = {
    title: ['required']
}

var Location = services.Bookshelf.Model.extend({
    tableName:  'locations',
    hasTimestamps: ["created_at", "updated_at"],
    initialize: function() {
    },
    tweets: function() {
        return this.belongsToMany(Tweet);
    }
});

module.exports = Location;
