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
var ENTER_KEYCODE = 13;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // нашли шаблон метки
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var popupParent = document.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var resetButton = adForm.querySelector('.ad-form__reset');
var mainPin = map.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('#address');

var mapCenterX = map.offsetWidth / 2; // определила центр
var mapCenterY = map.offsetHeight / 2;

mainPin.style.left = mapCenterX - (mainPin.offsetWidth / 2) + 'px'; // сместила главный пин
mainPin.style.top = mapCenterY - (mainPin.offsetHeight / 2) + 'px';


mainPin.addEventListener('mouseup', mainPinClick); // активация страницы
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    mainPinClick();
  }
});

// определение координат главного пина
function getCoordinates() {
  inputAddress.value = parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10);
}

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
      features: getRandomLengthArray(features, 1),
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

// функция создания DOM-элемента объявления и заполнения его данными.  отрисовка 1 объявления

function renderMapCard(mapCard) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = getHouseType(mapCard.offer.type);
  mapCardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнаты для ' + mapCard.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
  mapCardElement.querySelector('.popup__features').innerHTML = '';
  for (var j = 0; j < mapCard.offer.features.length; j++) {
    mapCardElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + mapCard.offer.features[j] + '"></li>';
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
  });
  return mapCardElement;
}

// активация странички
function mainPinClick() {
// console.log('offers.length');
  offers = createOffers();

  var pinFragment = document.createDocumentFragment(); // отрисуйум сгенерированные DOM-элементы в блок .map__pins. Используйте DocumentFragment.
  for (var i = 0; i < offers.length; i++) {
  // console.log(i);
    var pinNode = createPinNode(offers[i]);
    pinFragment.appendChild(pinNode);
  }
  map.classList.remove('map--faded'); // снять блок с карты
  adForm.classList.remove('ad-form--disabled'); // снять блок с полей формы
  getCoordinates();
  mapPins.appendChild(pinFragment);
  fieldsets.forEach(function (item) {
    item.disabled = false;
  });
  mainPin.removeEventListener('mouseup', mainPinClick);
  mainPin.removeEventListener('keydown', mainPinClick);
}


// Функции для возврата страницы в исходное стостояние
function closeCards() {
  var cardsList = map.querySelectorAll('.map__card');
  if (cardsList) {
    for (var l = 0; l < cardsList.length; l++) {
      cardsList[l].classList.add('hidden');
    }
  }
}


function removePins() {
  var pinsArr = map.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var i = 0; i < pinsArr.length; i++) {
    pinsArr[i].remove();
  }
}


function resetPage() {
  closeCards();
  removePins();
  adForm.reset();
  getCoordinates();
  map.classList.add('map--faded');
  fieldsets.forEach(function (item) {
    item.disabled = true;
  });
  adForm.classList.add('ad-form--disabled');
  // resetButton.removeEventListener('click', resetPage);
  mainPin.addEventListener('mouseup', mainPinClick); // активация страницы
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mainPinClick();
    }
  });
}


resetButton.addEventListener('click', resetPage);


// ---------------------module4-task2-------------------------
var timeInField = adForm.querySelector('#timein');
var timeOutField = adForm.querySelector('#timeout');
var accommodationType = adForm.querySelector('#type');
var priceField = adForm.querySelector('#price');
var roomNumberField = adForm.querySelector('#room_number');
var capacityField = adForm.querySelector('#capacity');
// var descriptionField = adForm.querySelector('#description');

function checkRoomGuests() {
  if ((roomNumberField.value === '1') && (capacityField.value !== '1')) {
    capacityField.setCustomValidity('Одноместный номер рассчитан только на одного гостя');
  } else if ((roomNumberField.value === '2') && (capacityField.value !== '2' && capacityField.value !== '1')) {
    capacityField.setCustomValidity('В двух комнатах может проживать не более 2 гостей.');
  } else if ((roomNumberField.value === '3') && (capacityField.value !== '2') && (capacityField.value !== '1') && (capacityField.value !== '3')) {
    capacityField.setCustomValidity('В трех  комнатах может проживать не более 3 гостей');
  } else if ((roomNumberField.value === '100') && (capacityField.value !== '0')) {
    capacityField.setCustomValidity('не для гостей');
  } else {
    capacityField.setCustomValidity('');
  }
}

// время заезда  неравно времени выезда

function syncTimeOut() {
  timeInField.value = timeOutField.value;
}

function syncTimeIn() {
  timeOutField.value = timeInField.value;
}


function changeAccommodationPrice() {
  switch (accommodationType.value) {
    case 'bungalo':
      priceField.placeholder = 0;
      priceField.min = 0;
      break;
    case 'flat':
      priceField.placeholder = 1000;
      priceField.min = 1000;
      break;
    case 'house':
      priceField.placeholder = 5000;
      priceField.min = 5000;
      break;
    case 'palace':
      priceField.placeholder = 10000;
      priceField.min = 10000;
      break;
  }
}


// Функции для подсвечиваня невалидвой формы
var isInvalid = function (input) {
  if (input.checkValidity() === false) {
    input.style.boxShadow = '0 0 2px 2px #ff6547';
  }
};
var isValid = function (input) {
  if (input.checkValidity() === true) {
    input.style.boxShadow = 'none';
  }
};

adForm.querySelector('.ad-form__submit').addEventListener('click', function () {
  isInvalid(adForm.querySelector('#title'));
  isInvalid(adForm.querySelector('#price'));
  isValid(adForm.querySelector('#title'));
  isValid(adForm.querySelector('#price'));
});


accommodationType.addEventListener('change', changeAccommodationPrice);
capacityField.addEventListener('change', checkRoomGuests);
roomNumberField.addEventListener('change', checkRoomGuests);
timeInField.addEventListener('change', syncTimeIn);
timeOutField.addEventListener('change', syncTimeOut);

// --------------------------module5-task1------------------------------

var mapPinsList = document.querySelector('.map__pins');
var pinMainSize = 62;
var pinMainArrow = 22;
var pinMainHalfSize = pinMainSize / 2;
var pointOfPinX = Math.round(mainPin.offsetLeft);
var pointOfPinY = Math.round(mainPin.offsetTop);

// до активации страницы
inputAddress.value = pointOfPinX + ', ' + pointOfPinY;

// тут должен стаять обработчик активации страницы


var mainPinHandler = map.querySelector('.map__pin--main');

mainPinHandler.addEventListener('mousedown', function (evt) {
  var MAX_POSITION_Y = 630;
  var MIN_POSITION_Y = 130;

  evt.preventDefault();
  // запомним координаты начальные
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  // var dragged = false;

  // функция перемещения
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    // dragged = true;
    // смещение
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    var pinLeft = evt.clientX - shift.x;
    var pinTop = evt.clientY - shift.y;

    // переопределиляю
    if (pinTop > MIN_POSITION_Y && pinTop < MAX_POSITION_Y && pinLeft > (map.offsetLeft + pinMainHalfSize) && pinLeft < (map.offsetLeft + map.clientWidth - pinMainHalfSize)) {
      mainPin.style.left = (pinLeft - map.offsetLeft - pinMainHalfSize) + 'px';
      mainPin.style.top = (pinTop - pinMainHalfSize) + 'px';
      inputAddress.value = (pinLeft - map.offsetLeft) + ', ' + (pinTop + pinMainHalfSize + pinMainArrow);
    }

  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    mapPinsList.removeEventListener('mousemove', onMouseMove);
    mapPinsList.removeEventListener('mouseup', onMouseUp);
  };

  mapPinsList.addEventListener('mousemove', onMouseMove);
  mapPinsList.addEventListener('mouseup', onMouseUp);
});

