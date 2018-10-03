'use strict';

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = [
  'flat',
  'house',
  'bungalo'
];

var CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_GUEST = 1;
var MAX_GUEST = 10;

var ESC_KEYCODE = 27;

var minX = 300;
var maxX = 900;
var minY = 130;
var maxY = 630;

var MAIN_PIN_Y = 50;

var generateAds = function (number) {
  var data = [];
  for (var i = 1; i <= number; i++) {
    data.push(createAd(i));
  }
  return data;
};

var createAd = function (num) {
  var locationX = getRandomNumber(minX, maxX);
  var locationY = getRandomNumber(minY, maxY);
  return {
    author: {
      avatar: 'img/avatars/user' + '0' + num + '.png',
    },
    offer: {
      title: TITLE[num - 1],
      adress: (locationX + ', ' + locationY),
      checkin: getRandomItem(CHECKIN_TIMES),
      checkout: getRandomItem(CHECKIN_TIMES),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
      features: FEATURES.slice(getRandomNumber(0, FEATURES.length - 1)),
      type: getRandomItem(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      description: '',
      photos: PHOTOS.slice()
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomItem = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var getMapPins = function (data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    fragment.appendChild(getMapPin(item));
  });

  return fragment;
};

var getMapPin = function(data) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style.left = data.location.x - WIDTH_PIN / 2 + 'px';
  mapPin.style.top = data.location.y - HEIGHT_PIN + 'px';
  mapPin.querySelector('img').src = data.author.avatar;

  mapPin.addEventListener('click', function() {
    openPopUp(data);
  });
  return mapPin;
};

var getFeatures = function (data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    var li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + item);
    fragment.appendChild(li);
  });
  return fragment;
};

var getPhotos = function (data, template) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    var img = template.cloneNode(true);
    img.src = item;
    fragment.appendChild(img);
  });
  return fragment;
};

var getRusType = function (type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    default: return type;
  }
};

var getMapCard = function (data, template) {
  var mapCard = template.cloneNode(true);
  mapCard.querySelector('.popup__title').textContent = data.offer.title;
  mapCard.querySelector('.popup__avatar').src = data.author.avatar;
  mapCard.querySelector('.popup__text--address').textContent = data.offer.adress;
  mapCard.querySelector('.popup__text--price').textContent = getPrice(data.offer.price);
  mapCard.querySelector('.popup__type').textContent = getRusType(data.offer.type);
  mapCard.querySelector('.popup__text--capacity').textContent = getGuestsRooms(data.offer.guests, data.offer.rooms);
  mapCard.querySelector('.popup__text--time').textContent = getTime(data.offer.checkin, data.offer.checkout);
  mapCard.querySelector('.popup__description').textContent = data.offer.description;

  var features = mapCard.querySelector('.popup__features');
  features.innerHTML = '';
  features.appendChild(getFeatures(data.offer.features));

  var photos = mapCard.querySelector('.popup__photos');
  photos.innerHTML = '';
  photos.appendChild(getPhotos(data.offer.photos, popupPhotoTemplate));

  mapCard.querySelector('.popup__close').addEventListener('click', function() {
    mapCard.hidden = true;
  });

  var keyboard = function(){
    addEventListener('keydown', function() {
      if (ESC_KEYCODE === 27){
        mapCard.hidden = true;
      }
    })
  };
  keyboard();

  return mapCard;
};

function getPrice(price) {
  return price + ' \u20BD/ночь';
}

function getGuestsRooms(guests, rooms) {
  return rooms + ' комнаты для ' + guests + ' гостей';
}

function getTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до ' + checkout;
}

var blockMap = document.querySelector('.map');
var blockAdForm = document.querySelector('.ad-form');
var adFormAddress = blockAdForm.querySelector('#address');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupPhotoTemplate = mapCardTemplate.querySelector('.popup__photo');
var testData = generateAds(8);
var mapCard = getMapCard(testData[0], mapCardTemplate);
var form = document.querySelector('.notice');

// blockMap.classList.remove('map--faded');
blockMap.querySelector('.map__pins').appendChild(getMapPins(testData, mapPinTemplate));

// Скрываем геометки
var hidePins = function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  pins.forEach(function (pin) {
    pin.style.display = 'none';
  });
};

// Показываем геометки 
var showPins = function (array) {
  var pins = document.querySelectorAll('.map__pin');

  pins.forEach(function (pin) {
    pin.style.display = 'block';
  });
};

var setDisabledForm = function(disabled) {
  var classList = blockAdForm.classList;

  disabled ? classList.add('ad-form--disabled') : classList.remove('ad-form--disabled');
  blockAdForm.querySelectorAll('fieldset').forEach(function(item) {
    item.disabled = disabled;
  });
}

// активный вид
var activate = function() {
  blockMap.classList.remove('map--faded');
  setDisabledForm(false);
  showPins();
}

// неактивный вид
var deactivate = function() {
  setDisabledForm(true);
  hidePins();
}

// активация по "движению"
var mainMapPinElem = document.querySelector('.map__pin--main');
mainMapPinElem.addEventListener('mouseup', function() {
  activate();
});

deactivate();

var openPopUp = function(data) {
  var mapFilters = blockMap.querySelector('.map__filters-container');
  var card = getMapCard(data, mapCardTemplate);
  var oldCard = blockMap.querySelector('.map__card');

  oldCard ? blockMap.replaceChild(card, oldCard) : blockMap.insertBefore(card, mapFilters); 
};

// Получаем координаты главной геометки
var getMainPinCoords = function () {
  var coords = {
    x: mainMapPinElem.offsetLeft,
    y: mainMapPinElem.offsetTop + MAIN_PIN_Y
  };
  return coords;
};

// Вносим позицию главной геометки в поле Адрес
var setAddress = function (coords) {
  form.querySelector('#address').value = coords.x + ', ' + coords.y;
};

setAddress( getMainPinCoords() );