//initializations
const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var constants = require("./config");
var utils = require("./utils");

//Defino instancia de Axios
var httpClient = axios.create({
    headers: { 
    "Content-Type": "application/json"
}
});

//Endpoints
app.use(express.static(path.join(__dirname, "public")));

app.get('/allpayments', function(req, res) {
    //Array to send through socket
    var chartArray = [];

    io.on('connection', (socket) => {
        //This will execute every X time
        setInterval(async function() {
            //Algoritmo de getPayments
            try {
                // Config Timestamps of GET (Every x time)
                let timestamps = utils.getTimestamps()

                //Define URL for GET
                let url_payments = "https://api.mercadopago.com/v1/payments/search?range=date_created&begin_date=" + timestamps.begin_date + "&end_date=" + timestamps.end_date + "&access_token=" + constants.access_token;

                var response = await httpClient({
                    method: "get",
                    url: url_payments,
                  });

                } catch (error) {
                console.log(error);
            }

            let newElement = {newDate: utils.timing(), payments: response.data.paging.total}
            chartArray.push(newElement);
            console.log(chartArray);

            // Show last 30 minutes
            if (chartArray.length > 60) {
                chartArray.shift()
            }

            //Send updated data to client each 30 secs
            socket.emit('update', chartArray);
        }, 30000);
    });
    res.sendFile(path.join(__dirname, "public", "allPayments.html"));  
});

app.get('/rejectedpayments', function(req, res) {
    //Array to send through socket
    var chartArray = [];

    io.on('connection', (socket) => {
        //This will execute every X time
        setInterval(async function() {
            //Algoritmo de getPayments
            try {
                // Config Timestamps of GET (Every x time)
                let timestamps = utils.getTimestamps()

                //Define URL for GET
                let url_payments = "https://api.mercadopago.com/v1/payments/search?status=rejected&range=date_created&begin_date=" + timestamps.begin_date + "&end_date=" + timestamps.end_date + "&access_token=" + constants.access_token;

                var response = await httpClient({
                    method: "get",
                    url: url_payments,
                  });

                } catch (error) {
                console.log(error);
            }

            let newElement = {newDate: utils.timing(), payments: response.data.paging.total}
            chartArray.push(newElement);
            console.log(chartArray);

            // Show last 30 minutes
            if (chartArray.length > 60) {
                chartArray.shift()
            }

            //Send updated data to client each 30 secs
            socket.emit('update', chartArray);
        }, 30000);
    });
    res.sendFile(path.join(__dirname, "public", "rejectedPayments.html"));  
});

server.listen(8080);
console.log("Listening port 8080");