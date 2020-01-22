"use strict";

//---------- Открытие и закрытие меню гамбургера-------------
let menu = document.querySelector('.header__menu-img');
let menuList = document.querySelector('.header__link-list');

    menu.addEventListener('click', () => {
        menu.classList.toggle('header__menu_active');
        menuList.classList.toggle('header__link-list_hidden');
    });



//----------- Вызов и закрытие попапа-------------

let popupBtn = document.querySelector('.popupBtn');
let popup = document.querySelector('.popup');

// Вызов попапа---
popupBtn.addEventListener('click', () => {
    popup.classList.toggle('hidden');
});

// Закрытие попапа---
popup.addEventListener('click', () => {
    popup.classList.toggle('hidden');
});


