var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(stockRepository, auth) {
    var app = express();
    var routes = require('./routes')(stockRepository);
    var middleware = require('./middleware');

    app.use(middleware.logIncoming);
    app.use(auth);
    app.use(bodyParser.json());

    app.get('/', (req, res, next) => {res.send("hello ES6")});
    app.post('/stock', routes.stockUp);
    app.get('/stock/:isbn', routes.getCount);
    app.get('/stock', routes.findAll);

    app.use(middleware.clientError);
    app.use(middleware.serverError);

    return app;
};