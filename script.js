//ГЛОБАЛЬНОЕ
document.addEventListener('touchstart', function() {}, {passive: true});


//НАВБАР: ПЕРЕКЛЮЧЕНИЕ МЕЖДУ СТРАНИЦАМИ И КНОПКА ЗАКАЗА
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
    productBox.forEach(item => item.removeAttribute('hidden'));
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


const stringBtns = document.querySelectorAll('.string-btn');
const productImgs = document.querySelectorAll('.product-img');
const bigQBtnsBox = document.getElementById('big-q-btns');
const smallQBtnsBox = document.getElementById('small-q-btns');
const bigQBtns = bigQBtnsBox.querySelectorAll('.q-btn');
const smallQBtns = smallQBtnsBox.querySelectorAll('.q-btn');
const values = document.querySelectorAll('.value');
const deleteBtn = document.getElementById('delete-btn');
let orderArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let b = 0; b < stringBtns.length; b++) {
    stringBtns[b].addEventListener('click', () => {
        productImgs.forEach(item => item.setAttribute('hidden', ''));
        stringBtns.forEach(item => item.dataset.visible = 'false');
        stringBtns.forEach(item => item.classList.add('hide'));
        stringBtns.forEach(item => item.setAttribute('aria-selected', 'false'));
        productImgs[b].removeAttribute('hidden');
        stringBtns[b].dataset.visible = 'true';
        stringBtns[b].classList.remove('hide');
        stringBtns[b].setAttribute('aria-selected', 'true');
        if (stringBtns[b].dataset.group === 'small-q' && smallQBtnsBox.hasAttribute('hidden')) {
            smallQBtnsBox.removeAttribute('hidden');
            bigQBtnsBox.setAttribute('hidden', '');
        } else if (stringBtns[b].dataset.group !== 'small-q' && bigQBtnsBox.hasAttribute('hidden')) {
            smallQBtnsBox.setAttribute('hidden', '');
            bigQBtnsBox.removeAttribute('hidden');
        }
        if (orderArr[b] === 0) {
            deleteBtn.setAttribute('hidden', '');
        }
    })
}
function qFunction(btn) {
    const arrStringBtns = Array.from(stringBtns);
    const activeIndex = arrStringBtns.findIndex(item => item.dataset.visible === 'true');
    deleteBtn.removeAttribute('hidden');
    orderArr[activeIndex] += Number(btn.dataset.quantity);
    values[activeIndex].innerHTML =  orderArr[activeIndex] + '<span class="sub">шт</span>';
}
for (let qBtn of bigQBtns) {
    qBtn.addEventListener('click', () => qFunction(qBtn));
}
for (let qBtn of smallQBtns) {
    qBtn.addEventListener('click', () => qFunction(qBtn));
}
deleteBtn.addEventListener('click', () => {
    const arrStringBtns = Array.from(stringBtns);
    const activeIndex = arrStringBtns.findIndex(item => item.dataset.visible === 'true');
    orderArr[activeIndex] = 0;
    values[activeIndex].innerHTML = '';
    deleteBtn.setAttribute('hidden', '');
    })