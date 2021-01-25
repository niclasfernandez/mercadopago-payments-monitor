//initializations
const express = require("express");
const app = express();
const path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var constants = require("./config");
var utils = require("./utils");

// users connected var
var users = [];

//Endpoints
app.use(express.static(path.join(__dirname, "public")));

app.get('/allpayments', function(req, res) {
    //Array to send through socket
    var chartArray = [];
    users.push()

    io.on('connection', (socket) => {
        //Connections
        let connectionsId = Object.keys(socket.conn.server.clients);
        console.log("Amount of connections: " + socket.conn.server.clientsCount);
        connectionsId.forEach(element => {
            console.log("Connection ID: " + element)
        });

        //Push all users connected
        users.push(socket.id);
        
        //This will execute every rollUp interval
        setInterval(async function() {
            // Process payments just for first user and broadcast to all of them
            if (socket.id == users[0]) {
                //GET to Payments API for each access_token
                var payments = await utils.apiLoop();

                //Config empty variables
                var allPayments = 0;
                var rejectedPayments = 0;

                //Math operations
                for (let i=0; i<payments.allPayments.length; i++) {
                    allPayments += payments.allPayments[i];
                    rejectedPayments += payments.rejectedPayments[i];
                }

                // Config data to send
                let newElement = {newDate: utils.timing(), allPayments: allPayments, rejectedPayments: rejectedPayments}
                chartArray.push(newElement);
                console.log(chartArray);

                // Show last X minutes shifting first array element
                if (chartArray.length > constants.chartWindows) {
                    chartArray.shift()
                }
                
                //Send updated data to all clients connected
                io.emit('update', chartArray);
            }
        }, constants.rollUp);
    });
    res.sendFile(path.join(__dirname, "public", "allPayments.html"));  
});

server.listen(8080);
console.log("Listening port 8080");