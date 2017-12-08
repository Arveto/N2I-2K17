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

var chatEvents = require('./events.js');

app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({extended: false});

try{
  // Handle 404
  app.use(function(req, res) {
     res.sendFile(__dirname + '/error.html', 404);
  });

  // Handle 500
  app.use(function(error, req, res, next) {
     res.sendFile(__dirname + '/error.html', 500);
  });
}catch(e){};


var password;

    //Routes
var cookies;    //Checks if they
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/map', function(req, res){
    res.sendFile(__dirname + '/map.html');
});

//TODO ajouter apreeeees
app.get('/sam', function(req, res){
    res.sendFile(__dirname + '/sam.html');
});
/*
app.get('/sam/:samId', function(req, res){
    res.sendFile(__dirname + '/sam.html');
});
*/
app.get('/about', function(req, res){
    res.sendFile(__dirname + '/about.html');
});

app.get('/signup', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.get('/error', function(req, res){
    res.sendFile(__dirname + '/error.html');
});

app.get('/bombe', function(req, res){
    res.sendFile(__dirname + '/bombe.html');
});

app.get('/bouteille', function(req, res){
    res.sendFile(__dirname + '/bouteille.html');
});

    //Inscription / login form
app.post('/signup', urlencodedParser, function(req, res){
    console.log('receiving form, pass= '+req.body.pass);
    var queryString = "INSERT INTO arvauto_users (`email`, `pass`, `familyname`, `firstname`) VALUES (?, ?, ?, ?)";
    connection.query(queryString, [req.body.email, req.body.password, req.body.familyname, req.body.firstname], function(error, result, fields){
        if (error) throw error;
    });
    res.cookie('email', req.body.email);
    res.cookie('familyname', req.body.familyname);
    res.cookie('firstname', req.body.firstname);

    password = req.body.password;

    var queryString = "UPDATE arvauto_users SET connected = 1 WHERE pass = ?";   //Updates user connection status
    connection.query(queryString, [req.body.pass], function(error, result, fields){
        if (error) throw error;
    });

    res.redirect('/');

});

app.post('/', urlencodedParser, function(req, res){

    console.log(req.body.password);
    var familyname;
    var firstname;

    var loginOK = 1;

    var queryString = 'SELECT familyname FROM arvauto_users WHERE pass = ?';
    connection.query(queryString, [req.body.password], function(error, result, fields){
        if(error){
            throw error;

        }
        console.log(result[0]);
        try{
            familyname = result[0].familyname;
        }
        catch(e){
            loginOK=0;
        }
    });

    var queryString = 'SELECT firstname FROM arvauto_users WHERE pass = ?';
    connection.query(queryString, [req.body.password], function(error, result, fields){
        if(error){
            throw error;

        }
        try{
            firstname = result[0].firstname;
        }
        catch(e){
            loginOK = 0;
        }
    });

    if(loginOK){
        res.cookie('email', req.body.email);
        res.cookie('familyname', familyname);
        res.cookie('firstname', firstname);
        console.log("adding cookies");
    }
        console.log(loginOK);
        res.redirect('/');

});


    //Socket.io
io.sockets.on('connection', function(socket){
    var queryString = "UPDATE arvauto_users SET event_id = 0 WHERE pass = ?";   //Updates user event_id
    connection.query(queryString, [password], function(error, result, fields){
        if (error) throw error;
    });

    var queryString = "UPDATE arvauto_users SET connected = 0 WHERE pass = ?";   //Updates user connection status
    connection.query(queryString, [password], function(error, result, fields){
        if (error) throw error;
    });

    var queryString = "UPDATE arvauto_users SET socket_id = ? WHERE pass = ?";   //Updates user connection status
    connection.query(queryString, [socket.id, password], function(error, result, fields){
        if (error) throw error;
    });

    chatEvents.foo(socket, connection);   //Events
});

server.listen(80);
