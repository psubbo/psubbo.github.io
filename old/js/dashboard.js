

var button = document.querySelector('.btn')
var range = "A2:E";
var tbody = document.querySelector(".tbody");
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;

//Забираем данные аутентификации из локалстоража

var bstring = localStorage.bstring;

// Данная функция обращается сначала к таблице гугл - https://docs.google.com/spreadsheets/d/1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8/edit#gid=0 , чтобы выгрузить таблицу с данными (представим что это база данных нашего сайта, где хранится информация по заказам). Потом эта функция обращается в web-api курьерской компании Hermes чтобы вытащить оттуда информацию о каждом заказе.

function drawTable() {
    fetch(apiUrl)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Получаем ответ и парсим его при помощи цикла. 
                response.json().then(function(a) {
                    for (var i = 0; i < a.values.length; i++) {

                        //В каждой итерации цикла забираем очередную строку с данными из гуглдока, рисуем ее в таблице и делаем веб запрос в API Hermes, чтобы получить текущий статус заказа. 

                        //Есть другой метод API Hermes, который я хотел использовать изначально - GetStatusesByBusinessUnit. Он выгружает все статусы до определенной даты. Можно реализовать через запрос к этому методу. Думаю будет быстрее чем делать запрос в АПИ при каждой итерации цикла. Но я уже не успевал разобраться и Просто Сделать Это.


                        var row = a.values[i];
                        var trackCode = [row[1]];
                        var data = "{\r\n\t\"parcelBarCodes\":[" + trackCode + "],\r\n}";
                        var statusString;

                        //Запрос в Hermes
                        var xhr = new XMLHttpRequest();

                        xhr.addEventListener("readystatechange", function() {
                            if (this.readyState === 4) {
                                var status = JSON.parse(this.responseText);

                                //Обрабатываем объект ответа, забираем только статус

                                statusString = status.GetStatusesByParcelBarcodesResult[0].StatusName
                            }
                        });
                        var authHeader = "Basic " + bstring;
                        xhr.open("POST", "https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetStatusesByParcelBarcodes", false);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Authorization", authHeader);

                        xhr.send(data);

                        //Рисуем таблицу с данными из Google Spreadsheet + подставляем статус от курьерки

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
