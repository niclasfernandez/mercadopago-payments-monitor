
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
    var date2 = new Date().getTime() - 10830000; // GMT-3
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

module.exports.timing = timing;
module.exports.getTimestamps = getTimestamps;