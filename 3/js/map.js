'use strict';
var users = 8;
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var minPrice = 1000;
var maxPrice = 1000000;
var typeRooms = ['palace', 'flat', 'house', 'bungalo'];
var minRooms = 1;
var maxRooms = 5;
var minGuests = 1;
var maxGuests = 10;
var timeIn = ['12:00', '13:00', '14:00'];
var timeOut = ['12:00', '13:00', '14:00'];
var service = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var minX = 300;
var maxX = 750;
var minY = 130;
var maxY = 630;
var markerWidth = 50;
var markerHeight = 70;
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// вызываем функции
var listAdd = generateAdd();
addList(listAdd[0]);
insertPin();

// Шаблон объявления
function addList() {
  var offer;
  var author;
  var offerWindow = document.querySelector('#card');
  var windowText = offerWindow.querySelector('.map__card popup');
  var windowAvatar = offerWindow.querySelector('.popup__avatar');
  var addLists = windowText.cloneNode(true);
  windowAvatar.src = author.avatar;
  addLists.querySelector('.popup__title').textContent = offer.title;
  addLists.querySelector('.popup__address').textContent = offer.adress;
  addLists.querySelector('.popup__price').innerHTML = getPrice(offer.price);
  addLists.querySelector('.popup__type').textContent = rusType(offer.type);
  addLists.querySelector('.popup__rooms-and-guests').textContent = getGuestsRooms(offer.guests, offer.rooms);
  addLists.querySelector('.popup__checkin-time').textContent = getTime(offer.checkin, offer.checkout);
  addLists.querySelector('.popup__features').appendChild = offer.features;
  addLists.querySelector('.popup__description').textContent = offer.description;
  addLists.querySelector('.popup__photos').appendChild = offer.photos;
  offerWindow.appendChild(addLists);
}

// генерация JS объектов
function generateAdd() {
  var add = [];
  for (var i = 0; i < users; i++) {
    var locationX = getRandomNumber(minX, maxX);
    var locationY = getRandomNumber(minY, maxY);
    add.push({
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: getRandomItem(title),
        adress: (locationX + ', ' + locationY),
        checkin: getRandomItem(timeIn),
        checkout: getRandomItem(timeOut),
        price: getRandomNumber(minPrice, maxPrice),
        guests: getRandomNumber(minGuests, maxGuests),
        features: getArrayLength(service),
        type: getRandomItem(typeRooms),
        rooms: getRandomNumber(minRooms, maxRooms),
        description: '',
        photos: getRandomItem(photos)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return add;
}
// генерирует авки
var avatars = function () {
  var arhiveAvatars = [];
  for (var i = 1; i <= users; i++) {
    i = '0' + i;
    avatars = 'img/avatars/user' + i + '.png';
    arhiveAvatars.push(avatars);
  }
  return arhiveAvatars;
};
// Отрисовка на странице маркера
function insertPin() {
  var mapPin = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listAdd.length; i++) {
    fragment.appendChild(createPin(listAdd[i]));
  }
  mapPin.appendChild(fragment);
}

// Маркер
function createPin(marker) {
  var userLocation = document.createElement('div');
  var userAvatar = document.createElement('img');
  userLocation.className = 'map__pins';
  userLocation.style.left = (location.x - markerHeight) + 'px';
  userLocation.style.top = location.y - (markerWidth / 2) + 'px';
  userAvatar.className = 'popup__avatar';
  userAvatar.width = 70;
  userAvatar.height = 70;
  userAvatar.src = marker.author.avatar;
  userLocation.appendChild(userAvatar);
  return userLocation;
}

function getPrice(price) {
  return price + ' ₽/ночь';
}
function rusType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
  return type;
}

function getGuestsRooms(guests, rooms) {
  return rooms + ' комнаты для ' + guests + ' гостей';
}

function getTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до ' + checkout;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getRandomItem(array) {
  var randomList = Math.floor(Math.random() * array.length);
  var randomItem = array[randomList];
  return randomItem;
}

function getArrayLength(array) {
  var newFeatures = array.slice();
  newFeatures.length = getRandomNumber(0, array.length);
  return newFeatures;
}

