//Объявляем все что нужно;

var API_KEY = "AIzaSyAnncvWgiQITGBVFd9W-zY3_GvVZDJ16fc";
var spreadsheetID = "1YCzTTvcecJdOvhLYZ-J6iCzpLBmffIHXSgaijVkPfq8";
var button = document.querySelector('.btn')
var range = "A2:E";
var tbody = document.querySelector(".tbody");
var apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "/values/" + range + "?key=" + API_KEY;
var bstring = localStorage.bstring;
var form = document.querySelector('.searchForm');
var tbody = document.querySelector(".tbody");
var resultTable = document.querySelector('.resultTable');
var orderStatus = document.querySelector('.orderStatus');
var custName = document.querySelector('.custName');
var orderDate = document.querySelector('.orderDate');
var number = document.querySelector('.number');
var orderCity = document.querySelector('.orderCity');

//Слушаем клик по кнопке;

form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var order = document.searchForm.search.value;

    //Функция запроса к гугл докс, чтобы получить детали заказа;

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
                            tbody.innerHTML = ""

                            //Делаем таблицу видимой

                            resultTable.classList.remove("invisible");

                            //Запрос в Hermes для получения статуса этого заказа

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

                            //Размещаем данные из гуглдоков

                            number.innerHTML = row[0];
                            orderDate.innerHTML = row[2];
                            custName.innerHTML = row[3];
                            orderCity.innerHTML = row[4];

                            //Преобразуем дату в норальный формат из формата UTC

                            for (var i = 0; i < statuses.length; i++) {
                                var d = parseInt(statuses[i].StatusTimestamp.slice(6, 19))
                                var date = new Date(d);
                                var month = date.getMonth() + 1;
                                var hours = date.getHours();
                                var minutes = date.getMinutes();
                                if (month < 10) { month = "0" + month };
                                if (hours < 10) { hours = "0" + hours };
                                if (minutes < 10) { minutes = "0" + minutes };
                                var dateString = date.getDate() + '/' + month + '/' + date.getFullYear() + ' ' + hours + ':' + minutes;

                                //Формируем таблицу истории статусов

                                tbody.innerHTML +=
                                    `
                                    <tr>
                                    <td>${statuses[i].StatusName}</td>
                                    <td>${dateString}</td>
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