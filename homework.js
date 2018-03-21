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
var btn = document.querySelector('.add');
var tasksArr = new Array();
var oldTasks = localStorage.getItem('tasksArr');
if (oldTasks !== null) {
    tasksArr = oldTasks.split(',');
    for (var i = 0; i < tasksArr.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = tasksArr[i];
        list.appendChild(listItem);
    };
} else {
    tasksArr = [];
};

var btn = document.querySelector('.add');
var done = document.querySelector('.done');
btn.addEventListener('click', function() {
    var newTask = prompt("Введите новую задачу");
    if (newTask != "" && newTask !== null) {
        var listItem = document.createElement('li');
        listItem.textContent = newTask;
        tasksArr.push(newTask);
        localStorage.setItem('tasksArr', tasksArr);
        list.appendChild(listItem);
    }

});

list.addEventListener('click', function(event) {
    if (event.target.tagName == 'LI') {
        event.target.classList.toggle("done");
    }
});