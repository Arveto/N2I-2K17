    //Modules
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    path = require('path'),
    bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'arvauto'
    });

app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({extended: false});

    //Routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/events', function(req, res){
    res.sendFile(__dirname + '/events.html');
});

app.get('/events/:eventId', function(req, res){
    res.sendFile(__dirname + '/events.html');
});

app.get('/sam', function(req, res){
    res.sendFile(__dirname + '/sam.html');
});

app.get('/sam/:samId', function(req, res){
    res.sendFile(__dirname + '/sam.html');
});

app.get('/about', function(req, res){
    res.sendFile(__dirname + '/about.html');
});

    //Inscription / login form
app.post('/signup', urlencodedParser, function(req, res){
    var queryString = "INSERT INTO arvauto_users (`email`, `pass`, `familyname`, `firstname`) VALUES (?, ?, ?, ?)";
    connection.query(queryString, [email, password, familyname, firstname], function(error, result, fields){
        if (error) throw error;
    };
    res.cookie('email', req.body.email);
    res.cookie('familyname', req.body.familyname);
    res.cookie('firstname', req.body.firstname);
});

    //Socket.io
io.sockets.on('connection', function(socket){
});

server.listen(80);
