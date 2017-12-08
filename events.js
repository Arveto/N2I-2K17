exports.foo = function(socket, connection){

        //The user enters a event
    socket.on('joinEvent', function(id){
        /*The arvauto_users's event is gonna be updated, he's gonna receive a list of connected arvauto_users and the last 20 arvauto_messages.
        The event n_user will be incremented. The previoulsy connected arvauto_users will receive a notice informing them about the new user.*/

        var queryString = "UPDATE arvauto_users SET event_id = ? WHERE socket_id = ?";
        connection.query(queryString, [id, socket.id], function(error, result, fields){  //Update user's 'event_id'
            if (error) throw error;
        });

        queryString = "UPDATE arvauto_events SET n_users = n_users+1 WHERE id = ?";
        connection.query(queryString, [id], function(error, result, fields){  //Update event's 'n_users';
            if (error) throw error;
        });

        var lastMessages;
        var familynames = [];
        queryString = "SELECT content, sender_id, date FROM arvauto_messages WHERE event_id = ? ORDER BY id ASC LIMIT 20";
        connection.query(queryString, [id], function(error, result, fields){  //Select last 20 arvauto_messages
            if (error) throw error;
            var lastMessages = result;


            queryString = "SELECT familyname FROM arvauto_users WHERE id = ?";
            for(let i=0; i<result.length; i++){ //Select familynames associated with arvauto_messages
                connection.query(queryString, [result[i].sender_id], function(error, result, fields){
                    if (error) throw error;
                    socket.emit('message', {'content': lastMessages[i].content, 'familyname': result[0].familyname, 'date': lastMessages[i].date});
                });
            }
        });

        queryString = "SELECT familyname FROM arvauto_users WHERE event_id = ?";
        connection.query(queryString, [id], function(error, result, fields){  //Select arvauto_users list
            if (error) throw error;
            socket.emit('usersList', result); //The new user is receiving arvauto_users list.
        });

        queryString = "SELECT familyname, event_id FROM arvauto_users WHERE socket_id = ?";   //Selecting user's infos
        connection.query(queryString, [socket.id], function(error, result, fields){
            if (error) throw error;
            var familyname = result.familyname;
            var event_id = result.event_id;

            queryString = "SELECT socket_id FROM arvauto_users WHERE (event_id = ?) AND (socket_id != ?)";    //Selecting other event members
            connection.query(queryString, [event_id, socket.id], function(error, result, fields){
                if (error) throw error;
                for(var i=0; i<result.length; i++){
                    socket.to(result[i].socket_id).emit('newUser', {'familyname': familyname}); //Sending notice about newcomer
                }
            });
        });
    });


        //A new message is sent by the user
    socket.on('message',function(content){
        /*The message must be added to the 'arvauto_messages' table,
        and all connected users (except the sender) will get a 'message' event.*/
        var currentTimestamp = Date.now();

        var sender_id;
        var event_id;

        var queryString = "SELECT id FROM arvauto_users WHERE socket_id = ?";   //Get sender id
        connection.query(queryString, [socket.id], function(error, result, fields){
            if (error) throw error;
            sender_id = result[0].id;

            var queryString = "SELECT event_id FROM arvauto_users WHERE socket_id = ?";  //Get sender event_id
            connection.query(queryString, [socket.id], function(error, result, fields){
                if (error) throw error;
                event_id = result[0].event_id;

                queryString = "INSERT INTO arvauto_messages (content, sender_id, event_id, date) VALUES (?, ?, ?, ?)";  //Add the message to the database
                connection.query(queryString, [content, sender_id, event_id, currentTimestamp], function(error, result, fields){
                    if (error) throw error;
                });
            });
        });


            //Send 'message' event to other arvauto_users
        queryString = "SELECT familyname FROM arvauto_users WHERE socket_id = ?";
        connection.query(queryString, [socket.id], function(error, result, fields){   //Get user's familyname
            if (error) throw error;
            var familyname = result[0].familyname;

            queryString = "SELECT socket_id FROM arvauto_users WHERE event_id = (SELECT event_id FROM arvauto_users WHERE socket_id = ?) AND socket_id != ?";
            connection.query(queryString, [socket.id, socket.id], function(error, result, fields){    //Selects other user's socket_id in the event
                if (error) throw error;
                for(var i=0; i<result.length; i++){
                    socket.to(result[i].socket_id).emit('message', {'content': content, 'familyname': familyname, 'date':currentTimestamp});  //Sends parameters as JSONs to be treated the same way clientside
                }
            });
        });
    });

        //The user wreates an event
    socket.on('newEvent', function(type, description,  latitude, longitude){
        var queryString = 'SELECT name FROM arvauto_events_types WHERE id = ?';
        var eventId;
        connection.query(queryString, [type], function(error, result, fields){
            if (error) throw error;
            eventId = result.id;
        });

        var queryString = 'INSERT INTO arvauto_events (type_id, description, latitude, longitude) VALUES( ?, ?, ?, ?)';
        connection.queryString(queryString, [eventId, description, latitude, longitude], function(errer, result, fields){
            if (error) throw error;
        });
    });

        //The user leaves the event
    socket.on('leaveEvent', function(){
        // Other arvauto_users are going to receive a notice, the event's n_user and the user's event_id will be updated

        var queryString = "SELECT familyname FROM arvauto_users WHERE socket_id = ?";   //Send 'userLeft' event to other arvauto_users
        connection.query(queryString, [socket.id], function(error, result, fields){   //Get user's familyname
            if (error) throw error;
            var familyname = result.familyname;

            queryString = "SELECT socket_id FROM arvauto_users WHERE event_id = (SELECT event_id FROM arvauto_users WHERE socket_id = ?) AND socket_id != ?";
            connection.query(queryString, [socket.id, socket.id], function(error, result, fields){    //Selects other user's socket_id in the event
                if (error) throw error;
                for(var i=0; i<result.length; i++){
                    socket.to(result[i].socket_id).emit('userLeft', {'familyname': familyname});
                }
            });
        });

        queryString = "SELECT event_id FROM arvauto_users WHERE socket_id = ?";  //Selecting event to update it
        connection.query(queryString, [socket.id], function(error, result, fields){
            if (error) throw error;
            var event_id = result.event_id;

            queryString = "UPDATE events SET n_arvauto_users = n_arvauto_users-1 WHERE id = ?";
            connection.query(queryString, [event_id], function(error, result, fields){
                if (error) throw error;
            });
        })

        queryString = "UPDATE arvauto_users SET event_id = NULL WHERE socket_id = ?"; //Setting user's event to NULL
        connection.query(queryString, [socket.id], function(error, result, fields){
            if (error) throw error;
        });
    });
}
