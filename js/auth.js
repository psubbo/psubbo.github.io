var form = document.querySelector('.form-horizontal');
var loginInput = document.querySelector('.loginInput');
var passwordInput = document.querySelector('.passwordInput');
var formMessage = document.querySelector('.formMessage');


//Ждем сабмита формы и останавливаем стандартное событие

form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var login = document.auth.login.value;
    var password = document.auth.password.value;


    //Проверяем заполнены ли поля формы при сабмите, если нет выводим текст ошибки и красим поля ввода в стандартные ошибки Бутстрапа

    if (login.length === 0) {
        formMessage.innerHTML = 'Логин не указан';
        loginInput.classList.add('has-error');

        formMessage.classList.remove('form-message-success');
        formMessage.classList.add('form-message-error');
    } else if (password.length === 0) {
        formMessage.innerHTML = 'Пароль не указан';
        loginInput.classList.remove('has-error');
        passwordInput.classList.add('has-error');
        formMessage.classList.remove('form-message-success');
        formMessage.classList.add('form-message-error');
    } else {
        loginInput.classList.remove('has-error');
        passwordInput.classList.remove('has-error');

        // Если все поля заполнены то кодируем их содержание в base64 и сохраняем на время сессии в sessionStorage

        var bstring = btoa(login + ":" + password);
        sessionStorage.bstring = bstring;

        // Готовим параметры запроса в апи Hermes - для авторизации используем пустой запрос на метод GetStatusesByParcelBarcodes если вернет код 200 - значит корректно введены данные логина и пароля, если что то другое - значит не срослось. 

        var params = {
            method: 'POST',
            timeout: 60000,
            body: {
                "parcelBarCodes": [], // пустой запрос 
            },
            headers: {
                "Authorization": "Basic " + bstring,
                "Content-Type": "application/json"
            },
        };

        // Делаем запрос в API Hermes

        fetch('https://api.hermes-dpd.ru/ws/restservice.svc/rest/GetStatusesByParcelBarcodes', params)
            .then(
                function(response) {
                    if (response.status !== 200) {

                        // Если статус не 200 - паникуем, красим все в красный и говорим, что все пропало в консоль и в сообщении в форме.

                        console.log('Huston we have a problem. Status Code: ' +
                            response.status);

                        formMessage.innerHTML = 'Авторизация неуспешна';
                        formMessage.classList.remove('form-message-success');
                        formMessage.classList.add('form-message-error');
                        loginInput.classList.toggle('has-error');
                        passwordInput.classList.toggle('has-error');
                        return;
                    } else {

                        // Если все хорошо - переходим в админку
                        loginInput.classList.remove('has-error');
                        passwordInput.classList.remove('has-error');
                        formMessage.innerHTML = 'Авторизация успешна';
                        formMessage.classList.remove('form-message-error');
                        formMessage.classList.add('form-message-success');
                        window.location.assign("https://psubbo.github.io/dashboard.html");
                    }

                }
            )
    };

});