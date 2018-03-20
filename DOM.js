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