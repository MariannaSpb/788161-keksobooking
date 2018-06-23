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
var houseType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};

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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
// var MAIN_PIN_LEFT = 570; // Размеры и положение неактивной метки
// var MAIN_PIN_TOP = 375;
// var MAIN_PIN_WIDTH = 65;
// var MAIN_PIN_HEIGHT = 80;
// var MAIN_PIN_POINTER = 22;
var ESC_KEYCODE = 27;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // нашли шаблон метки
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('#address');

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

offers = createOffers();

function onEsc(evt, popup) {
  if (evt.keyCode === ESC_KEYCODE) {
    popup.remove();
  }
}

// var mapFiltersContainer = document.querySelector('.map__filters-container');
var popupParent = document.querySelector('.map__filters-container');

// создаем метку на основе шаблона

function createPinNode(pinObject) {
  var pinNode = pinTemplate.cloneNode(true);
  pinNode.style.left = pinObject.location.x - PIN_WIDTH / 2 + 'px';
  pinNode.style.top = pinObject.location.y - PIN_HEIGHT + 'px';
  pinNode.querySelector('img').src = pinObject.author.avatar;
  pinNode.querySelector('img').alt = pinObject.offer.title;
  pinNode.addEventListener('click', function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    popupParent.appendChild(renderMapCard(pinObject));
  });
  return pinNode;
}

// MAIN FLOW
// генерируем офферы
offers = createOffers();

// отрисуйум сгенерированные DOM-элементы в блок .map__pins. Используйте DocumentFragment.
var pinFragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  var pinNode = createPinNode(offers[i]);
  pinFragment.appendChild(pinNode);
}


// функция создания DOM-элемента объявления и заполнения его данными.  отрисовка 1 объявления

function renderMapCard(mapCard) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  // if (mapCardElement) {
  //   mapCardElement.remove(); // попытка скрыть отрисовывающееся объявление на старте
  // }
  // mapCardElement.classList.add('hidden');
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

  var closeCard = mapCardElement.querySelector('.popup__close');
  closeCard.addEventListener('click', function () {
    mapCardElement.remove();
    document.removeEventListener('click', onEsc);
  });
  return mapCardElement;
}

// -------module4---------------------------------

var getCoordinates = function () {
  inputAddress.value = (mainPin.offsetTop + PIN_HEIGHT) + ', ' + (mainPin.offsetLeft + PIN_WIDTH / 2);
};

var mainPinClick = function () {
  map.classList.remove('map--faded'); // снять блок с карты
  adForm.classList.remove('ad-form--disabled'); // снять блок с полей формы
  getCoordinates();
  mapPins.appendChild(pinFragment);
  fieldsets.forEach(function (item) {
    item.disabled = false;
  });
};

mainPin.addEventListener('mouseup', mainPinClick);
