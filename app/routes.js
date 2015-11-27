

var HomeController      = require('./controllers/index');
var SignupController    = require('./controllers/signup');
var LoginController     = require('./controllers/login');
var UserController     = require('./controllers/user');
var TagController     = require('./controllers/tag');
var CategoryController     = require('./controllers/category');
var LocationController     = require('./controllers/location');

function ensureAuthenticated(req,res,next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user.toJSON()
        next()
    } else {
        req.flash('error', 'You must be logged in to do that.')
        res.redirect('/login')
    }
}

module.exports = (app) => {

    app.use('/', HomeController);
    app.use('/signup', SignupController);
    app.use('/login', LoginController);

    app.use('/', UserController);
    app.use('/tag', TagController);
    app.use('/category', CategoryController);
    app.use('/location', LocationController);
    app.use('/user', UserController);

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

}
