/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //Calc

  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem(sex);
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem(ratio);
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      } else if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  calcTotal();
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
  // Используем классы для создание карточек меню

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

  // const getResource = async (url) => {
  //     const res = await fetch(url);

  //     if(!res.ok) {
  //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //     }

  //     return await res.json();
  // };

  // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //         });
  //     });
  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms(formSelector, modalTimerId) {
  //Forms

  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  });
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
        showThanksModal(message.success);
        console.log(data);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    prevModalDialog.classList.remove('show');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  //slider

  const slider = document.querySelector(container),
    current = slider.querySelector(currentCounter),
    total = slider.querySelector(totalCounter),
    prev = slider.querySelector(prevArrow),
    next = slider.querySelector(nextArrow),
    sliderWrapper = slider.querySelector(wrapper),
    slidesField = sliderWrapper.querySelector(field),
    slides = slidesField.querySelectorAll(slide),
    width = window.getComputedStyle(sliderWrapper).width;
  let slideIndex = 1,
    offset = 0;
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  sliderWrapper.style.overflow = 'hidden';
  slidesField.style.transition = '0.5s all';
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }
  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    showCurrent();
    setDotOpacity();
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex < 1) {
      slideIndex = slides.length;
    }
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    showCurrent();
    setDotOpacity();
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      showCurrent();
      setDotOpacity();
    });
  });
  function showCurrent() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
  function setDotOpacity() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabMenu = document.querySelector(tabsSelector),
    tabContent = document.querySelectorAll(tabsContentSelector),
    tabMenuItem = tabMenu.querySelectorAll(tabsParentSelector);
  function tabHide() {
    tabContent.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabMenuItem.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function tabShow(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabMenuItem[i].classList.add(activeClass);
  }
  tabHide();
  tabShow();
  tabMenu.addEventListener('click', event => {
    let target = event.target;
    if (target && target.classList.contains(tabsParentSelector.slice(1))) {
      tabMenuItem.forEach((item, i) => {
        if (target == item) {
          tabHide();
          tabShow(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - new Date(),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / 1000 * 60 % 60),
      seconds = Math.floor(t / 1000 % 60);
    return {
      t,
      days,
      hours,
      minutes,
      seconds
    };
  }
  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateClock, 1000);
    updateClock();
    function addZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }
    function updateClock() {
      const t = getTimeRemaining(endTime);
      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);
      if (endTime - t.t <= 0) {
        clearInterval(timerInterval);
      }
    }
  }
  setClock(id, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");








'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 50000);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2024-12-31');
  const msg = 'Заявка №231';
  const div = document.createElement('div');
  div.style.background = 'red';
  div.setAttribute('data-msg', true);
  div.textContent = msg;
  document.body.append(div);
});
/******/ })()
;
//# sourceMappingURL=script.js.map