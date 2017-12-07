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
        database : 'DBNAME' //TODO changer nom DB
    });

app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(cookieParser());

    //Routes


    //chatEvents

io.sockets.on('connection', function(socket){

});

server.listen(80);
