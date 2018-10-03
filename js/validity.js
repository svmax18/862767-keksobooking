'use strict';

var ROOMS_CAPACITY = {
  '1': [1],
  '2': [2, 1],
  '3': [3, 2, 1],
  '100': [0]
};

var MIN_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var form = document.querySelector('.notice');
var roomNumberInput = form.querySelector('#room_number');
var capacityInput = form.querySelector('#capacity');
var submitForm = form.querySelector('.form__submit');
var titleForm = form.querySelector('#title');
var typeForm = form.querySelector('#type');
var priceInput = form.querySelector('#price');
var timeInInput = form.querySelector('#timein');
var timeOutInput = form.querySelector('#timeout');

  // ??? тут трабл
var type = function (){
  var value = MIN_PRICES[evt.target.value];
  priceInput.setAttribute('min', value);
  priceInput.setAttribute('placeholder', value);
};

// выбор комнаты -> кол-во гостей
var roomNumberChange = function (evt) {
  var value = evt.target.value;
  var capacity = ROOMS_CAPACITY[value];
  var options = capacityInput.querySelectorAll('option');

  for (var i = 0; i < options.length; i++) {
    capacityInput.querySelector('.capacity' + i).disabled = true;
    capacityInput.querySelector('.capacity' + i).selected = false;
  }

  capacityInput.querySelector('.capacity' + capacity[0]).selected = true;

  for (i = 0; i < capacity.length; i++) {
    capacityInput.querySelector('.capacity' + capacity[i]).disabled = false;
  }
};


// валид на заголовок
function validationTitle(evt) {
  var element = evt.target;
  if (element.validity.tooShort) {
    element.setCustomValidity('Заголовок меньше 30-ти символов');
  } else if (element.validity.tooLong) {
    element.setCustomValidity('Заголовок превысил 100 символов');
  } else if (element.validity.valueMissing) {
    element.setCustomValidity('Заполните это поле.');
  } else {
    element.setCustomValidity('');
  }
}

// валид на цену
function validationPrice(evt) {
  var element = evt.target;
  if (element.value.length === 0) {
    element.setCustomValidity('Введите, пожалуйста, цену.');
  } else if (element.value < 1000) {
    element.setCustomValidity('Цена должна быть не менее 1 000 руб.');
  } else if (element.value > 1000000) {
    element.setCustomValidity('Цена должна быть не более 1 000 000 руб.');
  } else {
    element.setCustomValidity('');
  }
}

// заезд
timeInInput.addEventListener('change', function (evt) {
  var value = evt.target.value;
  timeOutInput.value = value;
});

// выезд
timeOutInput.addEventListener('change', function (evt) {
  var value = evt.target.value;
  timeInInput.value = value;
});

roomNumberInput.addEventListener('change', roomNumberChange);
titleForm.addEventListener('invalid', validationTitle);
typeForm.addEventListener('invalid', type);

