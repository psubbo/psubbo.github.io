var API_KEY = "AIzaSyAnncvWgiQITGBVFd9W-zY3_GvVZDJ16fc";
var spreadsheetID = "1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8";
var button = document.querySelector('.btn')
var range = "A2:E";
var tbody = document.querySelector(".tbody");
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;
var bstring = sessionStorage.bstring;




function drawTable() {
    fetch(apiUrl)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response  
                response.json().then(function(a) {
                    //console.log(data.values); // выводим содержимое таблицы в консоль


                    for (var i = 0; i < a.values.length; i++) {
                        var row = a.values[i];
                        var trackCode = [row[1]];
                        var data = "{\r\n\t\"parcelBarCodes\":[" + trackCode + "],\r\n}";
                        var statusString;
                        var xhr = new XMLHttpRequest();

                        xhr.addEventListener("readystatechange", function() {
                            if (this.readyState === 4) {
                                var status = JSON.parse(this.responseText);
                                statusString = status.GetStatusesByParcelBarcodesResult[0].StatusName
                            }
                        });
                        var authHeader = "Basic " + bstring;
                        xhr.open("POST", "https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetStatusesByParcelBarcodes", false);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", authHeader);



                        xhr.send(data);

                        tbody.innerHTML += `
                     <tr>
                       <td>${i + 1}</td>
                       <td>${row[0]}</td>
                       <td>${row[1]}</td>
                       <td>${row[2]}</td>
                       <td>${row[3]}</td>
                       <td>${row[4]}</td>
                       <td>${statusString}</td>
                     </tr>
                   `;
                    }

                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

};