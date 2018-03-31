var API_KEY = "AIzaSyAnncvWgiQITGBVFd9W-zY3_GvVZDJ16fc";
var spreadsheetID = "1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8";
var button = document.querySelector('.btn')
var range = "A2:E";
var tbody = document.querySelector(".tbody");
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;
var bstring = sessionStorage.bstring;
var form = document.querySelector('.searchForm');
var tbody = document.querySelector(".tbody");
var status = document.querySelector('.status');
var custName = document.querySelector('.custName');
var orderDate = document.querySelector('.orderDate');







form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var order = document.form.search.value;
    console.log(order);
    debugger;


    fetch(apiUrl)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Unable to fetch Google Spreadsheets. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function(a) {

                    for (var i = 0; i < a.values.length; i++) {
                        var row = a.values[i];
                        var orderNumber = row[0];
                        var trackCode = row[1];
                        var statusString;
                        var data = "{\r\n\t\"parcelBarCodes\":[" + trackCode + "],\r\n}";
                        if (order == orderNumber) {

                            var xhr = new XMLHttpRequest();

                            xhr.addEventListener("readystatechange", function() {
                                if (this.readyState === 4) {
                                    var status = JSON.parse(this.responseText);
                                    statusString = status.GetStatusesByParcelBarcodesResult[0].StatusName
                                    var statuses = status.GetStatusesByParcelBarcodesResult

                                    debugger;
                                }
                            });
                            var authHeader = "Basic " + bstring;
                            xhr.open("POST", "https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetStatusesByParcelBarcodes", false);
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.setRequestHeader("Authorization", authHeader);
                            xhr.send(data);
                            status.innerHTML = statusString
                            custName.innerHTML = row[3];
                            orderDate.innerHTML = row[2];
                            for (var i = 0; i < statuses.values.length; i++) {





                            }


                            break;
                        } else {
                            continue;
                        }

                    }



                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });


});