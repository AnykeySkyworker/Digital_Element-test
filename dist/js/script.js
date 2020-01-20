"use strict";

let menu = document.querySelector('.header__menu-img');
let menuList = document.querySelector('.header__link-list');

    menu.addEventListener('click', () => {
        menu.classList.toggle('header__menu_active');
        menuList.classList.toggle('header__link-list_hidden');
    });

