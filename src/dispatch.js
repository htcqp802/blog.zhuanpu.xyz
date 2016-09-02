
module.exports = function(app){
    app.use('/'
    ,require('./routes')
    ,function(req,res,next){
        if(!res.locals.title){
            res.locals.title = 'blog';
        }
        next();
    });

}