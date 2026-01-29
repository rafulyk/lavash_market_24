//ГЛОБАЛЬНОЕ
document.addEventListener('touchstart', function() {}, {passive: true});
const productBoxes = document.querySelectorAll('.product-box');
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const navBar = document.getElementById('nav-bar');
const ordersBox = document.getElementById('orders-box');
const navMarker = document.querySelector('.nav-marker');
const orderBtnHide = document.getElementById('order-btn-hide');
const orderBtnBox = document.getElementById('order-btn-box');
const order = document.getElementById('order');
const orderBtn = document.getElementById('order-btn');
const closeOrderBtn = document.getElementById('close-order-btn');
const allResultsValues = document.querySelectorAll('.result-value');
const orderResultBoxes = order.querySelectorAll('.results-box');
const totalSum = orderBtn.querySelector('span');
function openOrderBtnFunction() {
    if (pages[1].hasAttribute('hidden') === false) {
        orderBtnBox.removeAttribute('hidden');
        navBar.setAttribute('hidden', '')
    }
}
function orderBtnHideFunction() {
    orderBtnBox.setAttribute('hidden', '');
    navBar.removeAttribute('hidden');
}
function closeOrderFunction() {
    productBoxes.forEach(item => item.removeAttribute('hidden'));
    order.setAttribute('hidden', '');
}
function calcAllQuantity() {
    const allNums = order.querySelectorAll('.result-value');
    let totalSum = 0;
    for (let num of allNums) {
        totalSum += Number(num.textContent);
    }
    return totalSum;
}


//НАВБАР: ПЕРЕКЛЮЧЕНИЕ МЕЖДУ СТРАНИЦАМИ И КНОПКА ЗАКАЗА
for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].addEventListener('click', () => {
        navMarker.style.left = i * 32 + '%';
        pages.forEach(item => item.setAttribute('hidden', ''));
        navBtns.forEach(item => item.setAttribute('aria-selected', 'false'));
        pages[i].removeAttribute('hidden');
        navBtns[i].setAttribute('aria-selected', 'true');
    })
}
orderBtnHide.addEventListener('click', () => {
    orderBtnHideFunction();
    closeOrderFunction();
})
navMarker.addEventListener('click', () => {
    if (calcAllQuantity() !== 0) {
        openOrderBtnFunction();
    }
})


//БЛОКИ С КАРТОЧКАМИ ТОВАРОВ
for (let b = 0; b < productBoxes.length; b++) {
    const selectorBtns = productBoxes[b].querySelectorAll('.selector-btn');
    const btnsImgBoxes = productBoxes[b].querySelectorAll('.btns-img-box');
    const incrementBtnsBoxes = productBoxes[b].querySelectorAll('.increment-btns');
    const deleteBtns = productBoxes[b].querySelectorAll('.delete-btn');
    const resultValues = productBoxes[b].querySelectorAll('.result-value');
    const resultStrings = productBoxes[b].querySelectorAll('.result-string');
    const orderResultValues = orderResultBoxes[b].querySelectorAll('.result-value');
    const orderResultStrings = orderResultBoxes[b].querySelectorAll('.result-string');

    for (let p = 0; p < btnsImgBoxes.length; p++) {
        const incrementBtns = incrementBtnsBoxes[p].querySelectorAll('.q-btn');
        function switchTab() {
            selectorBtns.forEach(btn => btn.classList.remove('active-selector'));
            selectorBtns[p].classList.add('active-selector');
            btnsImgBoxes.forEach(item => item.setAttribute('hidden', ''));
            btnsImgBoxes[p].removeAttribute('hidden');
            resultStrings.forEach(item => item.classList.add('hide'));
            resultStrings[p].classList.remove('hide');
            selectorBtns.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            selectorBtns[p].setAttribute('aria-selected', 'true');
        }
        selectorBtns[p].addEventListener('click', switchTab);
        resultStrings[p].addEventListener('click', switchTab);
        for (let btn of incrementBtns) {
            btn.addEventListener('click', () => {
                deleteBtns[p].removeAttribute('hidden');
                resultValues[p].textContent = Number(resultValues[p].textContent) + Number(btn.dataset.quantity);
                orderResultStrings[p].removeAttribute('hidden');
                orderResultValues[p].textContent = resultValues[p].textContent;
                totalSum.textContent = calcAllQuantity() + 'шт';
                openOrderBtnFunction();
            })
        }
        deleteBtns[p].addEventListener('click', () => {
            resultValues[p].textContent = 0;
            orderResultValues[p].textContent = 0;
            orderResultStrings[p].setAttribute('hidden', '');
            deleteBtns[p].setAttribute('hidden', '');
            if (calcAllQuantity() === 0) {
                orderBtnHideFunction();
            }
        })
    }
}


//ОТПРАВЛЯЕМ ЗАКАЗ
orderBtn.addEventListener('click', () => {
    if (order.hasAttribute('hidden') === false) {
        orderResultBoxes.forEach(item => ordersBox.appendChild(item));
        closeOrderFunction();
        orderBtnHideFunction();
        alert('Ваш заказ отправлен! Отслеживайте Ваши заказы в личном кабинете!');
        for (let a = 0; a < 10; a++) {
            allResultsValues[a].textContent = 0
        }
    } else {
        productBoxes.forEach(item => item.setAttribute('hidden', ''));
        order.removeAttribute('hidden');
    }
})
closeOrderBtn.addEventListener('click', closeOrderFunction);