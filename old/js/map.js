    var bstring = localStorage.bstring;
    var parcelShops, myMap;



    // Проверка координат Пункта выдачи через запрос в геокодер

    /*     function geoCode(a, callbackFn) {
            a = a.split(' ').join('+');
            var data = null;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    var coords = JSON.parse(this.responseText);
                    coords = coords.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
                    coords = coords.split(' ');
                    callbackFn(coords);

                }

            });
            xhr.open("GET", "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=" + a, false);
            xhr.send(data);

        }; */

    //дежа с JSON.stringify не работает. Поему то возвращает 500 "cors"

    /*  var params = {
        method: 'POST',
        timeout: 60000,
        body: JSON.stringify({ "businessUnitCode": 2840 }),
        headers: {
            "Authorization": "Basic " + bstring,
            "Content-Type": "application/json"
        },
    };

    fetch("https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetParcelShops", params)
        .then(
            function(response) {
                parcelShops = JSON.parse(response.responseText).GetParcelShopsResult;

            });  */


    //Получаем массив с пунктами выдачи заказов и сохраняем их в переменную parcelShops


    function updateParcelShops(bstring) {

        var data = "{\r\n\t\"businessUnitCode\":\"2840\",\r\n}";

        var xhr = new XMLHttpRequest();

        var authHeader = "Basic " + bstring;
        xhr.open("POST", "https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetParcelShops", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", authHeader);
        xhr.addEventListener("readystatechange", function() {

            if (this.readyState === 4) {
                parcelShops = JSON.parse(this.responseText).GetParcelShopsResult;
            };
        });

        xhr.send(data);
    };

    //создаем карту с центром в москве, зумом 4, и элементом управления масштабом и поиском;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [55.4507, 37.3656],
            zoom: 4,
            controls: ['zoomControl', 'searchControl']
        });

        //Создаем массив с точками для карты и начинаем цикл обработчик массива с пунктами выдачи
        var myGeoObjects = [];

        for (var i = 0; i < parcelShops.length; i++) {
            var a = parcelShops[i].Region + "+" + parcelShops[i].City + "+" + parcelShops[i].Address;
            a = a.split(' ').join('+');
            var coords;
            var data = null;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    coords = JSON.parse(this.responseText);
                    coords = coords.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
                    coords = coords.split(' ');
                }
            });
            xhr.open("GET", "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=" + a, false);
            xhr.send(data);

            myGeoObjects[i] = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [coords[1], coords[0]]
                        /* coordinates: [parcelShops[i].Latitude, parcelShops[i].Longitude] */
                },
                properties: {
                    clusterCaption: parcelShops[i].ParcelShopName,
                    hintContent: parcelShops[i].ParcelShopName,
                    balloonContentHeader: parcelShops[i].ParcelShopName,
                    balloonContentBody: "<b>Как нас найти:</b><br>" + parcelShops[i].ExtraParams[0].Value + "<br>",
                    balloonContentFooter: "<a href='" + parcelShops[i].AddressUrl + "'>Подробнее</a>",
                    services: parcelShops[i].Services
                }
            });

            /*             geoCode(a, function(parsedCoords, i) {
                            // new ymaps


                            myGeoObjects[i] = new ymaps.GeoObject({
                                geometry: {
                                    type: "Point",
                                    coordinates: [parsedCoords[1], parsedCoords[0]]
                                        /* coordinates: [parcelShops[i].Latitude, parcelShops[i].Longitude] 
                                },
                                properties: {
                                    clusterCaption: parcelShops[i].ParcelShopName,
                                    hintContent: parcelShops[i].ParcelShopName,
                                    balloonContentHeader: parcelShops[i].ParcelShopName,
                                    balloonContentBody: "<b>Как нас найти:</b><br>" + parcelShops[i].ExtraParams[0].Value + "<br>",
                                    balloonContentFooter: "<a href='" + parcelShops[i].AddressUrl + "'>Подробнее</a>",
                                    services: parcelShops[i].Services
                                }
                            });
                        });
                        debugger; */
        };

        var myClusterer = new ymaps.Clusterer({ clusterDisableClickZoom: false });
        myClusterer.add(myGeoObjects);
        //Как указать цвет меток для кластера почему вот это не работает???
        /*         myClusterer.options.set("iconColor", "#000"); */
        myMap.geoObjects.add(myClusterer);
        //правильно ли я понимаю, что 


    };

    updateParcelShops(bstring);

    ymaps.ready(init);