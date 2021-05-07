import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    // запись выбора в стейт
    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            elem.forEach((box, j) => {
                                i === j ? box.checked = true : box.checked = false;
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form'); // запись формы балкона
    bindActionToElems('input', windowHeight, 'height'); // запись высоты
    bindActionToElems('input', windowWidth, 'width'); // запись ширины
    bindActionToElems('change', windowType, 'type'); // запись типа остекления
    bindActionToElems('change', windowProfile, 'profile'); // запись профиля
};

export default changeModalState;