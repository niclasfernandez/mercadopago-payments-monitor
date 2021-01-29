// Array of Access_tokens (strings) of your MercadoPago Accounts
let access_token = ["APP-XXXXXXXXXXX-XXXXXXXXXX-XXXXXXXXX-XXXXXXX"];

//CHART & API parameters
//WARNING: If your rollUp is small and your chartWindows is really big. You will have problems in watching all data into chart.
//Best combinations: 30min --> (30000, 60) OR 60min --> (30000, 120) OR 120min --> (60000, 120)

let rollUp = 30000; // Time Windows between metrics or APIcalls in milisecs
let chartWindows = 120; //Length of dataArray that is shown in Chart - (chartWindows * rollUp) = Amount of data in chart
//Example --> 30000ms * 120 = 3600secs or last 60min that chart will show from begining to end

module.exports.access_token = access_token;
module.exports.rollUp = rollUp;
module.exports.chartWindows = chartWindows;