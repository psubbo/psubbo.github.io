var API_KEY = "AIzaSyAnncvWgiQITGBVFd9W-zY3_GvVZDJ16fc";
var spreadsheetID = "1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8";
var button = document.querySelector('.btn')
var range = "A2:E";
var tbody = document.querySelector(".tbody");
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;
var statuses = [];
var bstring = sessionStorage.bstring;


// Делаем запрос в API Hermes





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
                response.json().then(function(data) {
                    //console.log(data.values); // выводим содержимое таблицы в консоль
                    for (var i = 0; i < data.values.length; i++) {
                        var row = data.values[i];
                        var status;
                        var trackCode = [row[2]];
                        var params = {
                            method: 'POST',
                            timeout: 60000,
                            body: {
                                "parcelBarCodes": trackCode,
                            },
                            headers: {
                                "Authorization": "Basic " + bstring,
                                "Content-Type": "application/json"
                            },
                        };
                        console.log(params);
                        debugger;




                        fetch('https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetStatusesByParcelBarcodes', params)
                            .then(
                                function(response) {
                                    if (response.status !== 200) {
                                        console.log('Huston we have a problem. Status Code: ' +
                                            response.status);
                                        return;
                                    } else {

                                    }

                                }
                            )





                        tbody.innerHTML += `
                     <tr>
                       <td>${i + 1}</td>
                       <td>${row[0]}</td>
                       <td>${row[1]}</td>
                       <td>${row[2]}</td>
                       <td>${row[3]}</td>
                       <td>${row[4]}</td>
                       <td>${status}</td>
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