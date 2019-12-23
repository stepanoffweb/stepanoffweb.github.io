(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function () {

    "use strict";

    let calc = require('./parts/calc.js'),
        form = require('./parts/form.js'),
        modal = require('./parts/modal.js'),
        tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js'),
        slider = require('./parts/slider.js');

    calc();
    form();
    modal();
    slider();
    tabs();
    timer();
});


},{"./parts/calc.js":2,"./parts/form.js":3,"./parts/modal.js":4,"./parts/slider.js":5,"./parts/tabs.js":6,"./parts/timer.js":7}],2:[function(require,module,exports){
function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daySum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    function checkInput() {
        if (restDays.value == '' || persons.value == '' ||  restDays.value == 0 || persons.value == 0) {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    }

    function totalSum() {
        return (daySum + personsSum) * 4000 * place.options[place.selectedIndex].value;
    }

    persons.addEventListener('change', function () {
        personsSum = +this.value;
        total = totalSum();
        checkInput();
    });

    restDays.addEventListener('change', function () {
        daySum = +this.value;
        total = totalSum();
        checkInput();
    });

    place.addEventListener('change', function () {
        total = totalSum();
        checkInput();
    });

    function onlyNum(elem) {
        elem.addEventListener('keyup', function () {
            elem.value = elem.value.replace(/[^\d]/g, '');
        });
    }
    onlyNum(restDays);
    onlyNum(persons);
}
module.exports = calc;

},{}],3:[function(require,module,exports){
function form() {
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };
    let modalForm = document.querySelector('.main-form'),
        modalInput = modalForm.getElementsByTagName('input'),
        contactForm = document.querySelector('.contact-form form'),
        contactFormInput = contactForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function numbers() {
        let body = document.getElementsByTagName('body');
        body[0].addEventListener('keyup', function (e) {
            let target = e.target;
            if (target && target.classList.contains('phone') && target.tagName == 'INPUT') {
                target.value = target.value.replace(/[^+/\d/]/g, '');
            }
        });
    }
    numbers();

    function sendMessage(form, input) {
        let formName = form,
            formInput = input;
        formName.addEventListener('submit', function (event) {
            event.preventDefault();
            formName.appendChild(statusMessage);
            let formData = new FormData(formName);

            function postData() {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    let sendFormData = {};

                    formData.forEach(function (value, key) {
                        sendFormData[key] = value;
                    });

                    let data = JSON.stringify(sendFormData);
                    request.send(data);
                    request.addEventListener('readystatechange', function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            }

            function clearInput() {
                for (let i = 0; i < formInput.length; i++) {
                    formInput[i].value = '';
                }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });
    }
    sendMessage(modalForm, modalInput);
    sendMessage(contactForm, contactFormInput);
}
module.exports = form;

},{}],4:[function(require,module,exports){
function modal() {
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        clouse = document.querySelector('.popup-close'),
        infoBlocks = document.querySelector('.info'),
        winOpen = () => {
            overlay.style.display = 'block';
            more.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        },
        winClose = () => {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        };

    more.addEventListener('click', winOpen);
    clouse.addEventListener('click', winClose);
    infoBlocks.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('description-btn')) {
            winOpen();
        }
    });
}
module.exports = modal;

},{}],5:[function(require,module,exports){
function slider() {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function () {
        plusSlides(-1);
    });
    next.addEventListener('click', function () {
        plusSlides(1);
    });
    dotsWrap.addEventListener('click', function (e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });
}
module.exports = slider;

},{}],6:[function(require,module,exports){
function tabs() {
    let tabs = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };
    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tabs.length; i++) {
                if (target == tabs[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
}
module.exports = tabs;

},{}],7:[function(require,module,exports){
function timer() {
    let deadline = '2020-12-01',

        getTimeRemain = (endtime) => {
            let now = new Date(),
                d = Date.parse(endtime) - Date.parse(now),
                seconds = Math.floor((d / 1000) % 60),
                minutes = Math.floor((d / 1000 / 60) % 60),
                hours = Math.floor(d / (1000 * 60 * 60)) + now.getTimezoneOffset() / 60;

            return {
                'total': d,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        };

    let print = (unit, field) => {
        if (unit < 10) {
            field.textContent = '';
            field.textContent = '0' + unit;
        } else {
            field.textContent = '';
            field.textContent = unit;
        }
    };

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemain(endtime);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            } else {
                print(t.hours, hours);
                print(t.minutes, minutes);
                print(t.seconds, seconds);
            }
        }
    };

    setClock('timer', deadline);
}
module.exports = timer;


},{}]},{},[1]);
