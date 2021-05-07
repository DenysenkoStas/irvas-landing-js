const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    // валидация номера телефона (ввод только чисел)
    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // запрос отправки
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading; // вывод сообщения при отправке
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    // очистка полей
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            // отмена перезагрузки при отправке
            e.preventDefault();

            // создание блока со статусом
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            // сбор данных в объект
            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success; // вывод сообщения об успешной отправке
                })
                .catch(() => statusMessage.textContent = message.failure) // вывод об ошибке
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;