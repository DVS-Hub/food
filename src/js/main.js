import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';


'use strict'
window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: ".offer__slider",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        slide: ".offer__slide",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
    tabs('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timer('.timer', '2024-12-31');

    const msg = 'Заявка №231'; const div = document.createElement('div'); div.style.background = 'red'; div.setAttribute('data-msg', true); div.textContent = msg; document.body.append(div);
});





