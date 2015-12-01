
var Str = require('./string');

exports.pagination = function(req, res, next) {
    res.locals.createPagination = function (pages, page) {
        var url     = require('url'),
            qs      = require('querystring'),
            params  = qs.parse(url.parse(req.url).query),
            str     = '<div class="pagination"><ul>';

        params.page = 0;

        // var clas = page == 0 ? "active" : "no"
        // str += '<li class="first '+clas+'"><a href="?'+qs.stringify(params)+'">1</a></li>'
        // for (var p = 2; p < pages; p++) {
        //     params.page = p
        //     clas = page == p ? "active" : "no"
        //     str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">'+ p +'</a></li>'
        // }
        // params.page = --p
        // clas = page == params.page ? "active" : "no"
        // str += '<li class="last '+clas+'"><a href="?'+qs.stringify(params)+'">Last</a></li>'
        // str += '</ul></div>'

        var page = (req.query.page) ? req.query.page : 0;
        var page = parseInt(page);

        if( page > 0 ) {
            str += '<li class="prev"><a href="?page=' + (page - 1) + '">&larr; Previous Page</a></li>';
        }
        if( page <= pages ) {
            str += '<li class="next"><a href="?page=' + (page + 1) + '">Next Page &rarr;</a></li>';
        }

        return str
    }
    next();
};


exports.color = function(req, res, next) {
    res.locals.color = Str.getColor();
    next();
}
