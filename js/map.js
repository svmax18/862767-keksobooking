var all = {
users: 8, // количество маркеров
title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
min_price: 1000,    // price - цены в диапазоне
max_price: 1000000,
type_rooms: ['palace', 'flat', 'house', 'bungalo'], // type
min_rooms: 1,   // rooms - количество комнат
max_rooms: 5,
min_guests: 1,   // guests - можно разместить гостей в комнате, рандомное число
max_guests: 10,
time_in: ['12:00', '13:00', '14:00'],  // checkin, checkout
time_out: ['12:00', '13:00', '14:00'],
service: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],   // features
min_x: 300, // координаты маркера на карте
max_x: 750,
min_y: 130,
max_y: 630,
marker_width: 50, // размеры маркера
marker_height: 70,
photos: ['http:o0.github.io/assets/images/tokyo/hotel1.jpg', 'http:o0.github.io/assets/images/tokyo/hotel2.jpg', 'http:o0.github.io/assets/images/tokyo/hotel3.jpg']
}
	
// Шаблон объявления
function addList (add){
var offerWindow = document.querySelector ('.card');                   // окно для вставки объекта аутор и оффер
var windowText = offerWindow.querySelector('.map__card popup');       // куда ставим текст объявления, модальное окно
var windowAvatar= offerWindow.querySelector('.popup__avatar');        // куда ставим аватарку объявления, модальное окно
windowAvatar.src = add_all.author.avatar
}

/* "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png,
	где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д.
	Адреса изображений не повторяются
	*/
	var avatars = function (generateAvatars){
	var arhiveAvatars = [];
	for (var i = 1; i < all.users; i++){
	i = '0' + i;
	avatars  = 'img/avatars/user' + i + '.png';
	}
	return avatars;
	};
	
	// Маркер
	function createPin(marker){
	var userLocation = document.createElement('div');
	var userAvatar = document.createElement('img');
	/* style="left: {{location.x}}px; top: {{location.y}}px;"
	Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки,
	а координаты, на которые указывает метка своим острым концом. Чтобы найти эту координату нужно учесть
	размеры элемента с меткой.*/
	userLocation.className = 'map__pins';
	userLocation.style.left = (locationX - all.marker_height) + 'px';
	userLocation.style.top = locationY - (all.marker_width / 2) + 'px';
	userAvatar.className = 'popup__avatar';
	userAvatar.style.left = 70;
	userAvatar.style.top = 70;
	userAvatar.src = add_all.author.avatar;
	userLocation.appendChild(userAvatar);
	return userLocation;
	}

// Отрисовка на странице маркера
var mapPin= document.querySelector('.map__pins');
var mapPin2 = document.createDocumentMapPin2();
mapPin.appendChild(createPin(MapPin2));

	// уберите класс .map—faded
	map.classList.toggle('.map-faded');
	
	// «x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
	// «y»: случайное число, координата y метки на карте от 130 до 630.
	for (var i = 0; i < all.users; i++) {
	var locationX = getRandomNumber(all.min_x, all.max_x);
	var locationY = getRandomNumber(all.min_y, all.max_y);
	}
	
	// 1) На основе первого по порядку элемента из сгенерированного массива и шаблона .map__card создайте DOM-элемент объявления
var add_all = {
	author: {
	avatar: avatars[i]
	},
	offer: {
	title: getRandomItem(all.title),                                    // "title": строка, заголовок предложения, одно из фиксированных значений
	adress: (locationX + ', ' + locationY),
    checkin: getRandomItem(all.time_in),   
	checkout: getRandomItem(all.time_out),                             // "checkout": строка с одним из трёх фиксированных значений timе. Выезд.checkin: getRandomItem(all.time_in),                               // "checkin": строка с одним из трёх фиксированных значений time;p’[;. Заезд.
	price: getRandomNumber(all.min_price, all.max_price),              // "price": число, случайная цена от 1000 до 1000000
	guests: getRandomNumber(all.min_guests, all.max_guests),           // guests - можно разместить гостей в комнате, рандомное число
	features: getArrayLength(all.service),                             // features - массив строк случайной длины из ниже предложенных
	type: getRandomItem(all.type_rooms),                               // "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
	rooms: getRandomNumber(all.min_rooms, all.max_rooms),              // "rooms": число, случайное количество комнат от 1 до 5
	description: '',
	photos: getRandomItem(all.photos)
	}
	}
	
	// 2) заполните его данными из объекта и вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container
var adsList
    adsList.querySelector('.popup__title').textContent = add_all.offer.title;
	adsList.querySelector('.popup__address').textContent = add_all.offer.adress;
	adsList.querySelector('.popup__price').innerHTML = getPrice(add_all.offer.price);
	adsList.querySelector('.popup__type').textContent = rusType(add_all.offer.type);
	adsList.querySelector('.popup__rooms-and-guests').textContent = getGuestsRooms(add_all.offer.guests, add_all.offer.rooms);
	adsList.querySelector('.popup__checkin-time').textContent = getTime(add_all.offer.checkin, add_all.offer.checkout);
	adsList.querySelector('.popup__features').appendChild = add_all.offer.features;
	adsList.querySelector('.popup__description').textContent = add_all.offer.description;
	adsList.querySelector('.popup__photos').appendChild = add_all.offer.photos;

	// Выведите цену строкой вида {{offer.price}}₽/ночь
	function getPrice(price) {
	return price + ' ₽/ночь';
	}
	
	// выведите тип жилья на русском
	function rusType(type) {
	switch (type) {
	case 'flat': return 'Квартира';
	case 'bungalo': return 'Бунгало';
	case 'house': return 'Дом';
	case 'palace': return 'Дворец';
	}
	}
	
	// Выведите количество гостей и комнат строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей
	function getGuestsRooms(guests, rooms) {
	return rooms + ' комнаты для ' + guests + ' гостей';
	}
	
	// Время заезда и выезда cтрокой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
	function getTime(checkin, checkout) {
	return 'Заезд после ' + checkin + ', выезд до ' + checkout;
	}
	
	// Случайное целое число в диапазоне, включая минимальное и максимальное
	function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
	}
	
	// Выбираем рандомный элемент массива
	function getRandomItem(array) {
	for (var i = 0; i < array.length; i++) {
	var randomList = Math.floor(Math.random() * array.length);
	}
	var randomItem = array[randomList];
	return randomItem;
	}
	
	// Новый массив с возвратом части существующего массива (на выборе сервиса)
	function getArrayLength(service) {
	var newFeatures = all.service.slice();
	newFeatures.length = getRandomNumber(all.service.length);
	return newFeatures;
	}


