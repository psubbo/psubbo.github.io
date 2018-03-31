var API_KEY = "AIzaSyAnncvWgiQITGBVFd9W-zY3_GvVZDJ16fc";
var spreadsheetID = "1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8";
var button = document.querySelector('.btn')
var range = "A2:E";
var tbody = document.querySelector(".tbody");
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;

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
                        // row = ['Страна', 'Столица']

                        tbody.innerHTML += `
                     <tr>
                       <td>${i + 1}</td>
                       <td>${row[0]}</td>
                       <td>${row[1]}</td>
                       <td>${row[2]}</td>
                       <td>${row[3]}</td>
                       <td>${row[4]}</td>
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