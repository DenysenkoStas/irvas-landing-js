import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    // валидация номера телефона (ввод только чисел)
    checkNumInputs('input[name="user_phone"]');

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
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

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