//ЗАДАНИЕ 1 - ВИСОКОСНЫЙ ГОД!
var isLeapYear = function(y) {
    return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
};

var logAllLeapYears = function(a, b) {
    var i = a;
    while (i <= b) {
        if (isLeapYear(i)) console.log(i);
        i++;
    };
};

logAllLeapYears(1900, 2000);

//ЗАДАНИЕ 2 - TO DO App


var list = document.querySelector('.list');
var listItem = document.createElement('li');

listItem.textContent = 'Адын!!!111';
list.appendChild(listItem);

var citiesArr = ['Moscow', 'London', 'Chicago'];

for (var i = 0; i < citiesArr.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = citiesArr[i];
    list.appendChild(listItem);
};


var btn = document.querySelector('.add');

btn.addEventListener('click', function() {
    var newCity = prompt("Введите новый город");
    var listItem = document.createElement('li');
    listItem.textContent = newCity;
    list.appendChild(listItem);
});

document.querySelector('.highlight').addEventListener('click', function() {
    document.querySelector('.list').style.fontSize = '24px';
});