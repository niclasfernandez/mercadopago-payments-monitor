//initializations
const axios = require("axios");
var constants = require("./config");

//Defino instancia de Axios
var httpClient = axios.create({
    headers: { 
    "Content-Type": "application/json"
    }
});

//Chart timing
function timing() {
    var date = new Date();
    var localeSpecificTime = date.toLocaleTimeString();
    console.log(localeSpecificTime);
    return localeSpecificTime.replace(/:\d+ /, ' ');
}

//API timestamp
function getTimestamps() {
    // Be Carefull with your local server date, maybe you will need to add milisecs for getting real-time payments from your country
    var date1 = new Date().getTime() - 10800000; // GMT-3
    var date2 = new Date().getTime() - (10800000 + constants.rollUp); // GMT-3 + Roll-up
    //Convert them to string for API call
    var new_date1 = new Date(date1).toISOString().slice(0, -1);
    var new_date2 = new Date(date2).toISOString().slice(0, -1);
    var begin_date = new_date2 + "-03:00";
    var end_date = new_date1 + "-03:00";
    return {
        begin_date: begin_date,
        end_date: end_date 
    }
}

//API GETs
async function apiLoop() {
    try {
        // Config Timestamps of GET (Every x time)
        let timestamps = getTimestamps()
        let allPayments = [];
        let rejectedPayments = [];
        for (let i=0; i<constants.access_token.length; i++) {
            //Define URLs for GET
            //allPayments
            let url_payments = "https://api.mercadopago.com/v1/payments/search?limit=1000&range=date_created&begin_date=" + timestamps.begin_date + "&end_date=" + timestamps.end_date + "&access_token=" + constants.access_token[i];
            //rejectedPayments
            let url_payments_rejected = "https://api.mercadopago.com/v1/payments/search?limit=1000&status=rejected&range=date_created&begin_date=" + timestamps.begin_date + "&end_date=" + timestamps.end_date + "&access_token=" + constants.access_token[i];

            // cURL with axios instance
            let response = await httpClient({
                method: "get",
                url: url_payments,
            });    
            let responseRejected = await httpClient({
            method: "get",
            url: url_payments_rejected,
            }); 
            
            allPayments.push(response.data.paging.total);
            rejectedPayments.push(responseRejected.data.paging.total);
        };

        console.log("All Payments: " + allPayments);
        console.log("Rejected Payments: " + rejectedPayments);
        return {allPayments: allPayments, rejectedPayments: rejectedPayments};

    } catch (error) {
        console.log(error.response.data);
    }
}

module.exports.timing = timing;
module.exports.getTimestamps = getTimestamps;
module.exports.apiLoop = apiLoop;