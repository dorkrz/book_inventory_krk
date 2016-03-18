var stockRepository = require('./stockRepository');
var auth = require('./auth')(process.env.USERNAME || 'admin', process.env.PASSWORD || 'admin');
var app = require('./app')(stockRepository, auth);

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening!');
});