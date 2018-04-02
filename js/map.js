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
        var myGeoObjects = [];

        for (var i = 0; i < parcelShops.length; i++) {

            myGeoObjects[i] = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [parcelShops[i].Latitude, parcelShops[i].Longitude]
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
        }

        var myClusterer = new ymaps.Clusterer({ clusterDisableClickZoom: false });
        myClusterer.add(myGeoObjects);
        //Как указать цвет меток для кластера почему вот это не работает???
        /*         myClusterer.options.set("iconColor", "#000"); */
        myMap.geoObjects.add(myClusterer);
    };