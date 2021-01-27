// Array of Access_tokens (strings) of your MercadoPago Accounts
let access_token = ["APP-XXXXXXXXX-XXXXXXXXX-XXXXXXXXXX"];

//CHART & API parameters
//WARNING: If your rollUp is small and your chartWindows is really big. You will have problems in watching all data into chart.
//Best combinations: 15min --> (30000, 30) OR 30min --> (60000, 30) OR 60min --> (120000, 30) OR 120min -->(300000, 24)

let rollUp = 30000; // Time Windows between metrics or APIcalls in milisecs
let chartWindows = 30; //Length of dataArray that shows in Chart - (chartWindows * rollUp) = Amount of data in chart
//Example --> 30000ms * 30 = 900secs or 15 min that chart will show from begining to end

module.exports.access_token = access_token;
module.exports.rollUp = rollUp;
module.exports.chartWindows = chartWindows;