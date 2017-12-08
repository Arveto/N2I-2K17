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

    var queryString = "UPDATE users SET socket_id = ? WHERE pass = ?";   //Updates user socket_id
    connection.query(queryString, [socket.id, req.body.pass], function(error, result, fields){
        if (error) throw error;
    });

    var queryString = "UPDATE users SET connected = 1 WHERE pass = ?";   //Updates user connection status
    connection.query(queryString, [req.body.pass], function(error, result, fields){
        if (error) throw error;
    });

});

app.post('/', urlencodedParser, function(req, res){
    if (error) throw error;

    var familyname;
    var firstname;

    var loginOK = 1;//TODO Verification login OK

    var queryString = 'SELECT familyname FROM arvauto_users WHERE pass = ?';
    connection.query(queryString, [req.body.password], function(error, result, fields){
        if(error){
            throw error;
            loginOK = 0;
        }
        familyname = result[0].familyname;
    });

    var queryString = 'SELECT firstname FROM arvauto_users WHERE pass = ?';
    connection.query(queryString, [req.body.password], function(error, result, fields){
        if(error){
            throw error;
            loginOK = 0;
        }
        firstname = result[0].firstname;
    });

    if(loginOK){
        res.cookie('email', req.body.email);
        res.cookie('familyname', familyname);
        res.cookie('firstname', firstname);
        res.redirect('/')
    }
    else{
        res.redirect('/');
    }
});


    //Socket.io
io.sockets.on('connection', function(socket){

    var queryString = "UPDATE users SET event_id = 0 WHERE pass = ?";   //Updates user event_id
    connection.query(queryString, [req.body.pass], function(error, result, fields){
        if (error) throw error;
    });

    var queryString = "UPDATE users SET connected = 0 WHERE pass = ?";   //Updates user connection status
    connection.query(queryString, [req.body.pass], function(error, result, fields){
        if (error) throw error;
    });

    socket.on('disconnect', function(){

    })
});

server.listen(80);
