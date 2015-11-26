
/*
|--------------------------------------------------------------------------
| Application Config (Production)
|--------------------------------------------------------------------------
*/

exports = module.exports = {


    /*
    |--------------------------------------------------------------------------
    | Database
    |--------------------------------------------------------------------------
    */
    
    db: {
        host     : '127.0.0.1',
        user     : process.env.USERNAME_PASSWORD,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE
    }

}
