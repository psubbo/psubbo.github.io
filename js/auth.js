var form = document.querySelector('.form-horizontal');
var loginInput = document.querySelector('.loginInput');
var passwordInput = document.querySelector('.passwordInput');
var formMessage = document.querySelector('.formMessage');

form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var login = document.auth.login.value;
    var password = document.auth.password.value;

    if (login.length === 0) { // проверка, заполнено ли имя
        formMessage.innerHTML = 'Логин не указан';
        loginInput.classList.add('has-error');

        formMessage.classList.remove('form-message-success');
        formMessage.classList.add('form-message-error');
    } else if (password.length === 0) { // проверка, заполнена ли эл. почта
        formMessage.innerHTML = 'Пароль не указан';
        loginInput.classList.remove('has-error');
        passwordInput.classList.add('has-error');
        formMessage.classList.remove('form-message-success');
        formMessage.classList.add('form-message-error');
    } else {
        loginInput.classList.remove('has-error');
        passwordInput.classList.remove('has-error');
        var authData = login + ":" + password;
        bstring = btoa(authData);

        sessionStorage.bstring = bstring;

        var params = {
            method: 'POST',
            timeout: 60000,
            body: {
                "parcelBarCodes": [],
            },
            headers: {
                "Authorization": "Basic " + bstring,
                "Content-Type": "application/json"
            },
        };

        fetch('https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetStatusesByParcelBarcodes', params)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Huston we have a problem. Status Code: ' +
                            response.status);

                        formMessage.innerHTML = 'Авторизация неуспешна';
                        formMessage.classList.remove('form-message-success');
                        formMessage.classList.add('form-message-error');
                        loginInput.classList.toggle('has-error');
                        passwordInput.classList.toggle('has-error');
                        return;
                    } else {
                        window.location.assign("https://psubbo.github.io/dashboard.html");
                    }

                }
            )
    };

});