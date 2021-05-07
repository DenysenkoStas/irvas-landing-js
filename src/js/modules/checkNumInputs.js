const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    // валидация - ввод только чисел
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;