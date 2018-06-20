'use strict';

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkinTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var checkoutTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var NUMBER_ROOMS = 8;
var offers = [];

var minLocationX = 300;
var maxLocationX = 900;
var minLocationY = 130;
var maxLocationY = 630;
var minPrice = 1000;
var maxPrice = 1000000;
var minRooms = 1;
var maxRooms = 5;
var minGuests = 1;
var maxGuests = 10;
var pinWidth = 50;
var pinHeight = 70;
var houseType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};


// функция генерации случайного элемента массива
function getRandomElement(array) {
  var randomElement = Math.floor(Math.random() * array.length);

  return array[randomElement];
}

// функция генерации данных из заданного диапазона
function getRandomInteger(min, max) {
  var randomInteger = Math.floor(Math.random() * (max - min + 1) + min);

  return randomInteger;
}

// перетасовка массива
function shuffleArray(array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}

//  ф-ция для feauters  где разная длинна строк
function getRandomLengthArray(array, minSize) {
  return shuffleArray(array).slice(0, getRandomInteger(minSize, array.length));
}

// Координаты меток
function createCoords() {
  var locationX = getRandomInteger(minLocationX, maxLocationX);
  var locationY = getRandomInteger(minLocationY, maxLocationY);

  return {x: locationX, y: locationY};
}

// создаем массив объяв

function createOffer(id) {
  var coords = createCoords();

  return {
    author: {
      avatar: 'img/avatars/user0' + (id) + '.png'
    },
    offer: {
      title: getRandomElement(titles),
      address: coords.x + ', ' + coords.y,
      price: getRandomInteger(minPrice, maxPrice),
      type: getRandomElement(types),
      rooms: getRandomInteger(minRooms, maxRooms),
      guests: getRandomInteger(minGuests, maxGuests),
      checkin: getRandomElement(checkinTimes),
      checkout: getRandomElement(checkoutTimes),
      feauters: getRandomLengthArray(features, 1),
      description: '',
      photos: shuffleArray(photos),
    },
    location: {
      x: coords.x,
      y: coords.y
    }
  };
}

function getHouseType(type) {
  return houseType[type];
}

function createOffers() {
  var newOffers = [];

  for (var id = 1; id <= NUMBER_ROOMS; id++) {
    var offer = createOffer(id);
    newOffers.push(offer);
  }

  return newOffers;
}

// создаем метку на основе шаблона
function createPinNode(pinObject) {
  var pinNode = pinTemplate.cloneNode(true);

  pinNode.style.left = (pinObject.location.x - pinWidth / 2) + 'px';
  pinNode.style.top = pinObject.location.y - pinHeight + 'px';
  pinNode.querySelector('img').src = pinObject.author.avatar;
  pinNode.querySelector('img').alt = pinObject.offer.title;
  pinNode.addEventListener('click', function (evt) { // вешаю обработчик
    evt.preventDefault();
  // // по идее тут должна быть функция создания уникальной карточки (по идентификатору)
  });
  return pinNode;
}

// тут будет функция создания уникальной карточки при клике на пин

// MAIN FLOW

// У блока .map уберите класс .map--faded.
var map = document.querySelector('.map');
// map.classList.remove('map--faded');

// находим блок  с метками
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // нашли шаблон метки

// генерируем офферы
offers = createOffers();

// отрисуйум сгенерированные DOM-элементы в блок .map__pins. Используйте DocumentFragment.
var pinFragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  var pinNode = createPinNode(offers[i]);
  pinFragment.appendChild(pinNode);
}

// mapPins.appendChild(pinFragment);

// создайте DOM-элемент объявления и заполните его данными из объекта. отрисовка 1 объявления
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
function renderMapCard(mapCard) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.classList.add('hidden');
  mapCardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = getHouseType(mapCard.offer.type);
  mapCardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнаты для ' + mapCard.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
  mapCardElement.querySelector('.popup__features').innerHTML = '';
  for (var j = 0; j < mapCard.offer.length; j++) {
    mapCardElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + mapCardElement.offer.feauters[j] + '"></li>';
  }
  mapCardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
  mapCardElement.querySelector('.popup__photos').textContent = '';
  for (var f = 0; f < mapCard.offer.photos.length; f++) {
    mapCardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="' + mapCard.offer.photos[f] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  }
  mapCardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;

  return mapCardElement;
}

// вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container:
var mapFiltersContainer = document.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();

for (var k = 0; k < NUMBER_ROOMS; k++) {
  fragment.appendChild(renderMapCard(offers[0]));
}
map.insertBefore(fragment, mapFiltersContainer);


// -------------------------------------------module4-tastk1-------------------------------------------------------
// находим нужные элементы
// var map = document.querySelector('.map');
// var mapPins = map.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('#address');
// var buttonClose = document.querySelector('.popup__close');
var ENTER_KEYCODE = 13;
var MAIN_PIN_LEFT = 570; // Размеры и положение неактивной метки
var MAIN_PIN_TOP = 375;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65 + 22;

// координаты метки- по заданию - по центру
var mainPinLeftCenter = MAIN_PIN_LEFT - MAIN_PIN_WIDTH / 2;
var mainPinToptCenter = MAIN_PIN_TOP - MAIN_PIN_HEIGHT / 2;

mainPin.style.left = mainPinLeftCenter + 'px';
mainPin.style.top = MAIN_PIN_TOP - MAIN_PIN_HEIGHT + 'px';


// функция разблокирования карты удалением кассов с формы и карты  и отрисовкой пинов
var mainPinClick = function () {
  map.classList.remove('map--faded'); // снять блок с карты
  adForm.classList.remove('ad-form--disabled'); // снять блок с полей формы
  fieldsets.forEach(function (item) {
    item.disabled = false;
  });
  mapPins.appendChild(pinFragment); // добавить массива меток и объяв
  mainPin.style.left = mainPinLeftCenter + 'px'; // координаты главной метки по указателю
  mainPin.style.top = MAIN_PIN_TOP - MAIN_PIN_HEIGHT + 'px';
  inputAddress.value = mainPinLeftCenter + ', ' + mainPinToptCenter; // передача адреса по клику в соответствующее поле
};

mainPin.addEventListener('mouseup', mainPinClick); // обработчик снятия блокировки


// найти блок  с пинами
// написать функцию отрисовки пина по уникальному индексу
// добавить обработчик клика по пину  и передать функцию открытия (пин+  объяление + координаты)
// функция закрытия карточки + обработчки по клику на крестик
// удалить событие после закрытия окна


