"use strict";

let menu = document.querySelector('.header__menu-img');
let menuList = document.querySelector('.header__link-list');

    menu.addEventListener('click', () => {
        menu.classList.toggle('header__menu_active');
        menuList.classList.toggle('header__link-list_hidden');
    });






// document.addEventListener('click', function(event) {
//     const id = event.target.dataset.toggleId;
//     let menu = document.querySelector('.header__menu-img');
//     if (!id) return;

    // menu.addEventListener('click', () => {
    //   menu.classList.toggle('header__menu_active');
    //   menu.classList.toggle('header__menu_passive');
    // });

    // if (title.innerText == 'HIDE') {
    //   title.innerText = 'SHOW'
    // } else {
    //   title.innerText = 'HIDE'
    // }
  //   let elem = document.getElementById(id);
  //   elem.hidden = !elem.hidden;
  // });