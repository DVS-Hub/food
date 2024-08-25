'use strict'
window.addEventListener('DOMContentLoaded', () => {
    const tabMenu = document.querySelector('.tabheader__items'),
          tabContent = document.querySelectorAll(".tabcontent"),
          tabMenuItem = tabMenu.querySelectorAll(".tabheader__item");

    function tabHide() {
        tabContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabMenuItem.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function tabShow(i = 0) {
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabMenuItem[i].classList.add("tabheader__item_active");
    }

    tabHide();
    tabShow();

    tabMenu.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabMenuItem.forEach((item, i) => {
                if(target == item){
                    tabHide();
                    tabShow(i);
                }
            });
        }
    });

    //Timer
    const deadLine = '2024-07-25'; 

    function getTimeRemaining (endTime) {
        const t = Date.parse(endTime) - new Date(),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
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
            if (num >= 0 && num < 10){
                return `0${num}`;
            }else {
                return num;
            }
        }

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
    
            if(endTime - t.t <= 0){
                clearInterval(timerInterval);
            }
        }
    }
    setClock('.timer', deadLine);

     // Modal

     const modalTrigger = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');

 modalTrigger.forEach(btn => {
     btn.addEventListener('click', openModal);
 });

 function closeModal() {
     modal.classList.add('hide');
     modal.classList.remove('show');
     document.body.style.overflow = '';
 }

 function openModal() {
     modal.classList.add('show');
     modal.classList.remove('hide');
     document.body.style.overflow = 'hidden';
     clearInterval(modalTimerId);
 }
 
 modal.addEventListener('click', (e) => {
     if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal();
     }
 });

 document.addEventListener('keydown', (e) => {
     if (e.code === "Escape" && modal.classList.contains('show')) { 
         closeModal();
     }
 });

 const modalTimerId = setTimeout(openModal, 50000);


 function showModalByScroll() {
     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
     }
 }
 window.addEventListener('scroll', showModalByScroll);


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
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
        
    //Forms
    
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(data => {
                showThanksModal(message.success);
                console.log(data);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();
        
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
            closeModal();            

        }, 4000);
    }


    //slider

    const slider = document.querySelector(".offer__slider"),
          current = slider.querySelector("#current"),
          total = slider.querySelector("#total"),
          prev = slider.querySelector(".offer__slider-prev"),
          next = slider.querySelector(".offer__slider-next"),
          sliderWrapper = slider.querySelector(".offer__slider-wrapper"),
          slidesField = sliderWrapper.querySelector(".offer__slider-inner"),
          slides = slidesField.querySelectorAll(".offer__slide"),
          width = window.getComputedStyle(sliderWrapper).width;
    let slideIndex = 1,
        offset = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else {
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

    for(let i = 0; i < slides.length; i++){
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
        if(i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)){
            offset = 0;
        }else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        }else {
            slideIndex++;
        }

        showCurrent();
        setDotOpacity();        
    });

    prev.addEventListener('click', () => {
        if(offset == 0){
           offset = deleteNotDigits(width) * (slides.length - 1);
        }else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex < 1){
            slideIndex = slides.length;
        }

        if(slideIndex == 1){
            slideIndex = slides.length;
        }else {
            slideIndex--;
        }

        showCurrent();
        setDotOpacity();   
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            showCurrent();
            setDotOpacity();   
        });
    });

    function showCurrent(){
        if(slideIndex < 10){
            current.textContent = `0${slideIndex}`;
        }else {
            current.textContent = slideIndex;
        }
    }

    function setDotOpacity(){
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }
});


