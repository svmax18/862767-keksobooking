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

var minX = 300;
var maxX = 900;
var minY = 130;
var maxY = 630;

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

var getMapPins = function (data, template) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    var clone = template.cloneNode(true);
    clone.style.left = item.location.x - WIDTH_PIN / 2 + 'px';
    clone.style.top = item.location.y - HEIGHT_PIN + 'px';
    clone.querySelector('img').src = item.author.avatar;
    fragment.appendChild(clone);
  });

  return fragment;
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
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupPhotoTemplate = mapCardTemplate.querySelector('.popup__photo');
var testData = generateAds(8);
var mapCard = getMapCard(testData[0], mapCardTemplate);

blockMap.classList.remove('map--faded');
blockMap.querySelector('.map__pins').appendChild(getMapPins(testData, mapPinTemplate));
blockMap.insertBefore(mapCard, blockMap.querySelector('.map__filters-container'));
