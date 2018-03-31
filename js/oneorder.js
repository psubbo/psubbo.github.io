var API_KEY = "AIzaSyAnncvWgiQITGBVFd9W-zY3_GvVZDJ16fc";
var spreadsheetID = "1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8";
var button = document.querySelector('.btn')
var range = "A2:E";
var tbody = document.querySelector(".tbody");
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;
var bstring = sessionStorage.bstring;
var form = document.querySelector('.searchForm');
var tbody = document.querySelector(".tbody");
var orderStatus = document.querySelector('.orderStatus');
var custName = document.querySelector('.custName');
var orderDate = document.querySelector('.orderDate');
var resultTable = document.querySelector('.resultTable');



form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var order = document.searchForm.search.value;
    console.log(order);
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
                        var statuses;
                        var data = "{\r\n\t\"parcelBarCodes\":[" + trackCode + "],\r\n}";
                        if (order == orderNumber) {
                            resultTable.classList.remove("invisible");


                            var xhr = new XMLHttpRequest();

                            xhr.addEventListener("readystatechange", function() {
                                if (this.readyState === 4) {
                                    var status = JSON.parse(this.responseText);
                                    statusString = status.GetStatusesByParcelBarcodesResult[0].StatusName;
                                    statuses = status.GetStatusesByParcelBarcodesResult;
                                    orderStatus.innerHTML = statusString;


                                }
                            });
                            var authHeader = "Basic " + bstring;
                            xhr.open("POST", "https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetStatusesByParcelBarcodes", false);
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.setRequestHeader("Authorization", authHeader);
                            xhr.send(data);
                            custName.innerHTML = row[3];
                            orderDate.innerHTML = row[2];
                            for (var i = 0; i < statuses.length; i++) {
                                tbody.innerHTML +=
                                    `
                                    <tr>
                                    <td>${statuses[i].StatusName}</td>
                                    <td>${statuses[i].StatusTimestamp}</td>
                                    </tr>
                                    `;
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