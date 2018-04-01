var bstring = localStorage.bstring;
var parcelShops;

function updateParcelShops(bstring) {

    var data = "{\r\n\t\"businessUnitCode\":\"2840\",\r\n}";

    var xhr = new XMLHttpRequest();

    var authHeader = "Basic " + bstring;
    xhr.open("POST", "https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetParcelShops");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", authHeader);
    xhr.addEventListener("readystatechange", function() {

        if (this.readyState === 4) {

            parcelShops = JSON.parse(this.responseText).GetParcelShopsResult;
            debugger;

        }
        return parcelShops;
    });

    xhr.send(data);


};

updateParcelShops(bstring);






ymaps.ready(init);
var myMap, myPlacemark;

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.913021, 37.577787],
        zoom: 4
    });

    myPlacemark = new ymaps.Placemark([55.913021, 37.577787], {
        hintContent: 'Декатлон Алтуфьево',
        balloonContent: 'Декатлон Алтуфьево'
    });

    myMap.geoObjects.add(myPlacemark);
}