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
var MAP_TYPES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
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

var minX = 300;
var maxX = 900;
var minY = 130;
var maxY = 630;

var generateAds = function(number) {
  var data = [];
  for (var i = 1; i <= number; i++) {
    data.push(createAd(i));
  }
  return data;
};

var createAd = function(num) {
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
      features: FEATURES.slice(),
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

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getRandomItem(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

var getMapPins = function (data, template) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (mapPin) {
    mapPin.appendChild(fragment); 
  });

  return fragment;
};

var getMapCard = function (data, template) {
  var mapCard = template.cloneNode(true);
  mapCard.querySelector('.popup__title').textContent = createAd.offer.title;
  mapCard.querySelector('.popup__address').textContent = createAd.offer.adress;
  mapCard.querySelector('.popup__price').innerHTML = getPrice(createAd.offer.price);
  mapCard.querySelector('.popup__type').textContent = MAP_TYPES;
  mapCard.querySelector('.popup__rooms-and-guests').textContent = getGuestsRooms(createAd.offer.guests, createAd.offer.rooms);
  mapCard.querySelector('.popup__checkin-time').textContent = getTime(createAd.offer.checkin, createAd.offer.checkout);
  mapCard.querySelector('.popup__features').appendChild = createAd.offer.features;
  mapCard.querySelector('.popup__description').textContent = createAd.offer.description;
  mapCard.querySelector('.popup__photos').appendChild = createAd.offer.photos;
  return mapCard;
};

function getPrice(price) {
  return price + ' ₽/ночь';
}

function getGuestsRooms(guests, rooms) {
  return rooms + ' комнаты для ' + guests + ' гостей';
}

function getTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до ' + checkout;
}

// основной код
var blockMap = document.querySelector('.map');
var template = document.querySelector('template').content;
var templateMapPin = template.querySelector('.map__pin');
var templateMapCard = template.querySelector('.map__card');
var testData = generateAds(8);
var mapCard = getMapCard(getRandomItem(testData), templateMapCard);

blockMap.classList.remove('map--faded');
blockMap.querySelector('.map__pins').appendChild(getMapPins(testData, templateMapPin));
blockMap.insertBefore(mapCard, blockMap.querySelector('.map__filters-container'));
