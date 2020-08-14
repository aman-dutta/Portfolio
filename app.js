var express = require('express');
var path    = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('connect-flash');
var multer = require('multer');
var upload = multer({dest:'./public/images/portfolio'}); 

//Routes files
var routes = require('./routes/index');
var admin = require('./routes/admin');

//Init App
var app = express();


//Body Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Handle Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
            root      = namespace.shift(),
            formParam = root;
        
        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg  :  msg,
            value:  value
        };
    }
}));

//Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({degaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Connect flash
app.use(flash());

app.use('/',routes);
app.use('/admin',admin);

app.listen(3000,function(){
    console.log("Server started at port 3000");
})