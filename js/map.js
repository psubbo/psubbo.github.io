    var bstring = localStorage.bstring;
    var parcelShops;


    //Почему fetch не работает а XMLHttpRequest() работает? ЧЯДНТ?

    /* var params = {
        method: 'POST',
        timeout: 60000,
        body: { "businessUnitCode": 2840 },
        headers: {
            "Authorization": "Basic " + bstring,
            "Content-Type": "application/json"
        },
    };

    fetch("https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetParcelShops", params)
        .then(
            function(response) {
                parcelShops = JSON.parse(response.responseText).GetParcelShopsResult;

            }); */


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
    updateParcelShops(bstring);

    ymaps.ready(init);
    var myMap;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [55.4507, 37.3656],
            zoom: 4,
            controls: ['zoomControl', 'searchControl']
        });

        for (var i = 0; i < parcelShops.length; i++) {

            var a, b;
            var myPlacemark = new ymaps.Placemark([parcelShops[i].Latitude, parcelShops[i].Longitude], {
                hintContent: parcelShops[i].ParcelShopName,
                balloonContent: parcelShops[i].ExtraParams[0].Value,
                services: parcelShops[i].Services

            });
            myMap.geoObjects.add(myPlacemark);
        };
    }